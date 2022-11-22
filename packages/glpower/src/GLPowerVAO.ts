import { GLPowerBuffer } from "./GLPowerBuffer";

export type Attribute = {
	array: number[];
	size: number;
}

export type AttributeBuffer = {
	buffer: GLPowerBuffer;
	size: number;
	count: number;
}

export type AttributeBufferWithLocation = {
	location: number | null;
} & AttributeBuffer

export class GLPowerVAO {

	private gl: WebGL2RenderingContext;

	public vao: WebGLVertexArrayObject | null = null;

	public program: WebGLProgram;

	protected indexBuffer: GLPowerBuffer | null = null;

	protected attributes: {[key: string]: AttributeBufferWithLocation} = {};

	public vertCount: number = 0;

	constructor( gl: WebGL2RenderingContext, program: WebGLProgram ) {

		this.gl = gl;

		this.program = program;

		this.vao = this.gl.createVertexArray();

	}

	/*-------------------------------
		Attribute
	-------------------------------*/

	public setAttribute( name: string, buffer: GLPowerBuffer, size: number, count: number ) {

		let attr = this.attributes[ name ];

		if ( ! attr ) {

			attr = {
				buffer,
				location: null,
				size,
				count
			};

			this.attributes[ name ] = attr;

		}

		this.updateAttributes();

		return this;

	}

	public removeAttribute( name: string ) {

		delete this.attributes[ name ];

		return this;

	}

	public updateAttributes( force?: boolean ) {

		if ( ! this.vao ) return;

		this.vertCount = 0;

		const attrNameList = Object.keys( this.attributes );

		this.gl.bindVertexArray( this.vao );

		for ( let i = 0; i < attrNameList.length; i ++ ) {

			const name = attrNameList[ i ];
			const attribute = this.attributes[ name ];

			if ( ( attribute.location === null || force ) ) {

				attribute.location = this.gl.getAttribLocation( this.program, name );

				if ( attribute.location > - 1 ) {

					this.gl.bindBuffer( this.gl.ARRAY_BUFFER, attribute.buffer.buffer );
					this.gl.enableVertexAttribArray( attribute.location );
					this.gl.vertexAttribPointer( attribute.location, attribute.size, this.gl.FLOAT, false, 0, 0 );

				}

			}

			this.vertCount = Math.max( this.vertCount, attribute.count );

		}

		this.gl.bindVertexArray( null );

	}

	/*-------------------------------
		Index
	-------------------------------*/

	public setIndex( indexBuffer: GLPowerBuffer | null ) {

		this.indexBuffer = indexBuffer;

		if ( ! this.vao ) return;

		this.gl.bindVertexArray( this.vao );

		this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer ? this.indexBuffer.buffer : null );

		this.gl.bindVertexArray( null );


	}

	public getVAO() {

		return this.vao;

	}

}
