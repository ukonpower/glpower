import { GLPowerProgram } from "./GLPowerProgram";
import { GLPowerBuffer } from "./GLPowerBuffer";
import { GLPowerTexture } from "./GLPowerTexture";

export class Power {

	public gl: WebGL2RenderingContext;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;

		this.gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );

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

}

