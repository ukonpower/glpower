export class Texture {

	private gl: WebGL2RenderingContext;
	private image: HTMLImageElement | null;
	private texture: WebGLTexture | null;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;
		this.image = null;

		this.texture = this.gl.createTexture();

	}

	public load( src: string ) {

		const img = new Image();

		img.onload = () => {

			this.image = img;

			this.gl.bindTexture( this.gl.TEXTURE_2D, this.texture );
			this.gl.texImage2D( this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.image );
			this.gl.generateMipmap( this.gl.TEXTURE_2D );

		};

		img.src = src;

	}

	public active( unitId: number ) {

		this.gl.activeTexture( ( this.gl as any )[ "TEXTURE" + unitId ] );
		this.gl.bindTexture( this.gl.TEXTURE_2D, this.texture );

	}

	public getTexture() {

		return this.texture;

	}

}
