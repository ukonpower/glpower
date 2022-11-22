import { GLPowerTexture } from "./GLPowerTexture";
import { Vector2 } from "./Math/Vector2";

export class GLPowerFrameBuffer {

	private gl: WebGL2RenderingContext;
	private size: Vector2;

	private frameBuffer: WebGLFramebuffer | null;
	private texture: GLPowerTexture | null;

	constructor( gl: WebGL2RenderingContext, ) {

		this.gl = gl;

		this.frameBuffer = this.gl.createFramebuffer();
		this.texture = null;

		this.size = new Vector2();

	}

	public attachTexture( texture: GLPowerTexture ) {

		this.texture = texture;

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

	}

}
