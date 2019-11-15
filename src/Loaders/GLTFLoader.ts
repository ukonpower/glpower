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
			var dataUriRegex = /^data:(.*?)(;base64)?,(.*)$/;
			var dataUriRegexResult = uri.match( dataUriRegex );

			let d = atob( dataUriRegexResult[3] );

			var view = new Uint8Array( d.length );

			for ( var i = 0; i < d.length; i ++ ) {

				view[ i ] = d.charCodeAt( i );

			}
			
			let result: GLTF = {}

			let nkey = Object.keys( data.nodes );

			for( let i = 0; i < nkey.length; i++ ){

				let m = data.nodes[i];

				let pri = data.meshes[nkey[i]].primitives[0];

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

					let ArrayConstructor;
					
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
						array: new ArrayConstructor( view.buffer, bv.byteOffset, acs.count * size  )
					}

				}

				result[m.name] = attrs;

			}

			if( callBack ){

				callBack( result );
				
			}
			
		})
		
	}
	
	
}