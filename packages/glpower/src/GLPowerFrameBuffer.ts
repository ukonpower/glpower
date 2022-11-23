import { GLPowerTexture } from "./GLPowerTexture";
import { Vector2 } from "./Math/Vector2";

export class GLPowerFrameBuffer {

	public size: Vector2;
	public texture: GLPowerTexture;

	private gl: WebGL2RenderingContext;
	private frameBuffer: WebGLFramebuffer | null;
	private depthRenderBuffer: WebGLRenderbuffer | null;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;

		this.size = new Vector2( 1, 1 );

		this.frameBuffer = this.gl.createFramebuffer();

		this.depthRenderBuffer = this.gl.createRenderbuffer();

		this.texture = new GLPowerTexture( this.gl );
		this.texture.attach( { width: this.size.x, height: this.size.y } );
		this.gl.bindTexture( this.gl.TEXTURE_2D, this.texture.getTexture() );
		this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR );
		this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR );
		this.gl.bindTexture( this.gl.TEXTURE_2D, null );

		// setting

		this.gl.bindRenderbuffer( this.gl.RENDERBUFFER, this.depthRenderBuffer );
		this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, this.frameBuffer );

		this.gl.framebufferRenderbuffer( this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.depthRenderBuffer );
		this.gl.framebufferTexture2D( this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.texture.getTexture(), 0 );

		this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );
		this.gl.bindRenderbuffer( this.gl.RENDERBUFFER, null );

	}

	public setSize( size: Vector2 ): void

	public setSize( width: number, height: number ) : void

	public setSize( width_size: number | Vector2, height?: number ) {

		if ( typeof width_size == 'number' ) {

			this.size.x = width_size;

			if ( height !== undefined ) {

				this.size.y = height;

			}

		} else {

			this.size.copy( width_size );

		}

		this.texture.attach( { width: this.size.x, height: this.size.y } );

		if ( this.depthRenderBuffer ) {

			this.gl.bindRenderbuffer( this.gl.RENDERBUFFER, this.depthRenderBuffer );
			this.gl.renderbufferStorage( this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, this.size.x, this.size.y );
			this.gl.bindRenderbuffer( this.gl.RENDERBUFFER, null );

		}

	}

	public getFrameBuffer() {

		return this.frameBuffer;

	}

}
