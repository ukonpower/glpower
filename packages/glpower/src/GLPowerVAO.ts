import { count } from "console";
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

	public vao: WebGLVertexArrayObject | null;

	public program: WebGLProgram;

	protected indexBuffer: GLPowerBuffer | null;

	protected attributes: {[key: string]: AttributeBufferWithLocation};

	public vertCount: number;
	public indexCount: number;

	constructor( gl: WebGL2RenderingContext, program: WebGLProgram ) {

		this.gl = gl;

		this.program = program;

		this.vao = this.gl.createVertexArray();
		this.attributes = {};
		this.indexBuffer = null;

		this.vertCount = 0;
		this.indexCount = 0;

	}

	/*-------------------------------
		Attribute
	-------------------------------*/

	public setAttribute( name: string, buffer: GLPowerBuffer, size: number ) {

		let attr = this.attributes[ name ];

		const count = buffer.array ? buffer.array.length / size : 0;

		if ( ! attr ) {

			attr = {
				buffer,
				location: null,
				size,
				count
			};

			this.attributes[ name ] = attr;

		} else {

			attr.buffer = buffer;
			attr.size = size;
			attr.count = count;
			attr.location = null;

		}

		this.updateAttributes();

		return this;

	}

	public setInstancedAttribute( name: string, buffer: GLPowerBuffer, size: number ) {

		this.setAttribute( name, buffer, size );

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

		if ( this.indexBuffer && this.indexBuffer.array ) {

			this.indexCount = this.indexBuffer.array.length;

		}


	}

	public getVAO() {

		return this.vao;

	}

}
