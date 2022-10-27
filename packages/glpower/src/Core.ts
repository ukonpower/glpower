import { Program } from "./Program";
import { Buffer } from "./Buffer";

export class Core {

	public gl: WebGL2RenderingContext;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;

	}

	public createProgram() {

		const program = new Program( this.gl );

		return program;

	}

	public createBuffer() {

		const vertexBuffer = new Buffer( this.gl );

		return vertexBuffer;

	}

}

