import { Vector2 } from "./Math/Vector2";

type ImagePretense = {
	width: number,
	height: number
}

export class GLPowerTexture {

	public unit: number;
	public image: HTMLImageElement | ImagePretense | null;
	public size: Vector2;

	private gl: WebGL2RenderingContext;
	private texture: WebGLTexture | null;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;
		this.image = null;
		this.unit = 0;
		this.size = new Vector2();

		this.texture = this.gl.createTexture();

	}

	public attach( img: HTMLImageElement | ImagePretense | null ) {

		this.image = img;

		this.gl.bindTexture( this.gl.TEXTURE_2D, this.texture );

		if ( this.image ) {

			this.size.set( this.image.width, this.image.height );

			if ( this.image instanceof HTMLImageElement ) {

				this.gl.texImage2D( this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.image );


			} else {

				this.gl.texImage2D( this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.image.width, this.image.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null );

			}

		} else {

			this.size.set( 1, 1 );

			this.gl.texImage2D( this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.size.x, this.size.y, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null );

		}

		this.gl.generateMipmap( this.gl.TEXTURE_2D );
		this.gl.bindTexture( this.gl.TEXTURE_2D, null );

	}

	public active( unitNumber: number ) {

		this.gl.activeTexture( this.gl.TEXTURE0 + unitNumber );
		this.gl.bindTexture( this.gl.TEXTURE_2D, this.texture );

	}

	public load( src: string, callBack?: () => void ) {

		const img = new Image();

		img.onload = () => {

			this.attach( img );

			if ( callBack ) callBack();

		};

		img.src = src;

	}

	public getTexture() {

		return this.texture;

	}

	public loadAsync( src: string ) {

		return new Promise( ( resolve, reject ) => {

			const img = new Image();

			img.onload = () => {

				this.attach( img );

				resolve( this );

			};

			img.onerror = () => {

				reject( 'img error, ' + src );

			};

			img.src = src;

		} );

	}

}
