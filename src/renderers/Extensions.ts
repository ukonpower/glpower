export class Extensions {

	protected gl: WebGLRenderingContext;
	public exts: any = {};

	constructor( gl: WebGLRenderingContext ) {

		this.gl = gl;

	}

	public enableExtension( name: string ) {

		let e = this.gl.getExtension( name );

		if ( e ) {

			this.exts[ name ] = e;

		} else {

			console.warn( name + ' not supported.' );

		}

	}

	public getExt( name: string ) {

		let e = this.exts[ name ];

		if ( e ) {

			return e;

		} else {

			console.warn( name + ' not enabled' );

		}

	}

}
