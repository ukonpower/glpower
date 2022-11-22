export class GLPowerTexture {

	public unit: number;
	public image: HTMLImageElement | null;

	private gl: WebGL2RenderingContext;
	private texture: WebGLTexture | null;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;
		this.image = null;
		this.unit = 0;

		this.texture = this.gl.createTexture();

	}

	public attach( img: HTMLImageElement ) {

		this.image = img;

		this.gl.bindTexture( this.gl.TEXTURE_2D, this.texture );
		this.gl.texImage2D( this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.image );
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
