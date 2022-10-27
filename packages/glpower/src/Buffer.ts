export class Buffer {

	private gl: WebGL2RenderingContext;
	private buffer: WebGLBuffer | null;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;

		this.buffer = this.gl.createBuffer();

	}

	public setData( data: Int8Array | Int16Array | Int32Array | Float32Array | Float64Array, usage?: number ) {

		this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.buffer );

		this.gl.bufferData( this.gl.ARRAY_BUFFER, data, usage || this.gl.STATIC_DRAW );

		this.gl.bindBuffer( this.gl.ARRAY_BUFFER, null );

		return this;

	}

}
