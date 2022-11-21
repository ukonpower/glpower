import { Program } from "./Program";
import { Buffer } from "./Buffer";
import { VAO } from "./VAO";
import { Texture } from "./Texture";

export class Core {

	public gl: WebGL2RenderingContext;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;

		this.gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );

	}

	public createProgram() {

		const program = new Program( this.gl );

		return program;

	}

	public createBuffer() {

		const vertexBuffer = new Buffer( this.gl );

		return vertexBuffer;

	}

	public createTexture() {

		const texture = new Texture( this.gl );

		return texture;

	}

}

