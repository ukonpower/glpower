export declare interface AttrParam{
	size: number;
	array: [];
}

export declare interface GLTF{
	[key: string]: {
		[key: string]: AttrParam;
	}
}

export class GLTFLoader{

	constructor(){

	}

	public load( path: string, callBack?: ( gltf: GLTF ) => void ){

		let request = new XMLHttpRequest();
		
		request.open( 'GET', path, true );
		request.send( null );

		request.addEventListener( 'load', ( e ) => {

			let data = JSON.parse( request.response );

			let uri = data.buffers[0].uri;

			let buffer = this.decodeURI( uri );

			let result: GLTF = {}

			let nkey = Object.keys( data.nodes );

			for( let i = 0; i < nkey.length; i++ ){

				let m = data.nodes[nkey[i]];

				let pri = data.meshes[m.mesh].primitives[0];

				let attrs: { [key: string]: AttrParam } = {};
				
				let attKey = Object.keys( pri.attributes );

				attKey.push( 'indices' );
				
				for( let k = 0; k < attKey.length; k++ ){

					let bNum = pri.attributes[attKey[k]];

					if( attKey[k] == 'indices' ){

						bNum = pri.indices;
						
					}
					
					let acs = data.accessors[bNum]
					
					let bv = data.bufferViews[acs.bufferView];

					let size = 0;
					
					switch( acs.type ){
						case 'SCALAR':
							size = 1;
							break;
						case 'VEC2':
							size = 2;
							break;
						case 'VEC3':
							size = 3;
							break;
					}

					let ArrayConstructor: any;
					
					switch( acs.componentType){
						case 5126:
							ArrayConstructor = Float32Array;
							break;
							
						case 5123:
							ArrayConstructor = Int16Array;
							break;
					}

					attrs[attKey[k].toLocaleLowerCase()] = {
						size: size,
						array: new ArrayConstructor( buffer, bv.byteOffset, acs.count * size  )
					}

				}

				result[m.name] = attrs;

			}

			if( callBack ){

				callBack( result );
				
			}
			
		})
		
	}

	private decodeURI( uri: string ){

		var orgn = /^data:(.*?)(;base64)?,(.*)$/;
		var data = uri.match( orgn );

		let bdata = atob( data[3] );

		var view = new Uint8Array( bdata.length );

		for ( var i = 0; i < bdata.length; i ++ ) {

			view[ i ] = bdata.charCodeAt( i );

		}

		return view.buffer;

	}
	
}