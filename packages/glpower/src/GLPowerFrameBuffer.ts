import { GLPowerTexture } from "./GLPowerTexture";
import { Vector } from "./Math/Vector";

export class GLPowerFrameBuffer {

	public size: Vector;

	private gl: WebGL2RenderingContext;
	private frameBuffer: WebGLFramebuffer | null;
	private depthRenderBuffer: WebGLRenderbuffer | null;

	public textures: GLPowerTexture[];
	public textureAttachmentList: number[];

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;

		this.size = new Vector( 1, 1 );

		this.frameBuffer = this.gl.createFramebuffer();
		this.depthRenderBuffer = this.gl.createRenderbuffer();

		this.textures = [];
		this.textureAttachmentList = [];

		// depth buffer

		this.gl.bindRenderbuffer( this.gl.RENDERBUFFER, this.depthRenderBuffer );
		this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, this.frameBuffer );
		this.gl.framebufferRenderbuffer( this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.depthRenderBuffer );
		this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );
		this.gl.bindRenderbuffer( this.gl.RENDERBUFFER, null );

	}

	public setTexture( textures: GLPowerTexture[] ) {

		this.textures = textures;
		this.textureAttachmentList.length = 0;

		this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, this.frameBuffer );

		this.textures.forEach( ( t, i ) => {

			t.attach( { width: this.size.x, height: this.size.y } );

			this.gl.bindTexture( this.gl.TEXTURE_2D, t.getTexture() );
			this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR );
			this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR );
			this.gl.bindTexture( this.gl.TEXTURE_2D, null );

			const attachment = this.gl.COLOR_ATTACHMENT0 + i;
			this.gl.framebufferTexture2D( this.gl.FRAMEBUFFER, attachment, this.gl.TEXTURE_2D, t.getTexture(), 0 );

			this.textureAttachmentList.push( attachment );

		} );

		this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );

		return this;

	}

	public setSize( size: Vector ): void

	public setSize( width: number, height: number ) : void

	public setSize( width_size: number | Vector, height?: number ) {

		if ( typeof width_size == 'number' ) {

			this.size.x = width_size;

			if ( height !== undefined ) {

				this.size.y = height;

			}

		} else {

			this.size.copy( width_size );

		}

		this.setTexture( this.textures );

		this.textures.forEach( t => {

			t.attach( { width: this.size.x, height: this.size.y } );

		} );

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
