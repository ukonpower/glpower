import { GLPowerProgram } from "./GLPowerProgram";
import { GLPowerBuffer } from "./GLPowerBuffer";
import { GLPowerTexture } from "./GLPowerTexture";
import { GLPowerFrameBuffer } from "./GLPowerFrameBuffer";

export class Power {

	public gl: WebGL2RenderingContext;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;

		this.gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );

		this.gl.getExtension( "EXT_color_buffer_float" );
		this.gl.getExtension( "EXT_color_buffer_half_float" );

	}

	public createProgram() {

		const program = new GLPowerProgram( this.gl );

		return program;

	}

	public createBuffer() {

		const vertexBuffer = new GLPowerBuffer( this.gl );

		return vertexBuffer;

	}

	public createTexture() {

		const texture = new GLPowerTexture( this.gl );

		return texture;

	}

	public createFrameBuffer() {

		const frameBuffer = new GLPowerFrameBuffer( this.gl );

		return frameBuffer;

	}

}

