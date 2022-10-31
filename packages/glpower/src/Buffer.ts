type BufferType = 'vbo' | 'ibo';

export class Buffer {

	private gl: WebGL2RenderingContext;
	public buffer: WebGLBuffer | null;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;

		this.buffer = this.gl.createBuffer();

	}

	public setData( data: Int8Array | Int16Array | Int32Array | Float32Array | Float64Array, type: BufferType = 'vbo', usage?: number ) {

		const target = type == 'vbo' ? this.gl.ARRAY_BUFFER : this.gl.ELEMENT_ARRAY_BUFFER;

		this.gl.bindBuffer( target, this.buffer );

		this.gl.bufferData( target, data, usage || this.gl.STATIC_DRAW );

		this.gl.bindBuffer( target, null );

		return this;

	}

}
