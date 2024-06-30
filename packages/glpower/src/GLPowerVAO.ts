import { GLPowerBuffer, TArrayBuffer } from "./GLPowerBuffer";

export type Attribute = {
	array: TArrayBuffer;
	size: number;
}

export type AttributeOptions = {
	instanceDivisor?: number;
	usage?: number;
}

export type AttributeBuffer = {
	buffer: GLPowerBuffer;
	size: number;
	count: number;
	location?: number;
} & AttributeOptions

export class GLPowerVAO {

	private gl: WebGL2RenderingContext;

	public vao: WebGLVertexArrayObject | null;

	public program: WebGLProgram;

	public indexBuffer: GLPowerBuffer | null;

	protected attributes: Map<string, AttributeBuffer>;

	public vertCount: number;
	public indexCount: number;

	public instanceCount: number;

	constructor( gl: WebGL2RenderingContext, program: WebGLProgram ) {

		this.gl = gl;

		this.program = program;

		this.vao = this.gl.createVertexArray();
		this.attributes = new Map();
		this.indexBuffer = null;

		this.vertCount = 0;
		this.indexCount = 0;
		this.instanceCount = 0;

	}

	private calcVertCount() {

		this.vertCount = 0;
		this.instanceCount = 0;

		this.attributes.forEach( ( attribute, name ) => {

			if ( attribute.instanceDivisor == undefined && name != 'index' ) {

				this.vertCount = Math.max( this.vertCount, attribute.count );

			}

			if ( attribute.instanceDivisor !== undefined && attribute.instanceDivisor > 0 ) {

				if ( this.instanceCount == 0 ) {

					this.instanceCount = attribute.count;

				} else {

					this.instanceCount = Math.min( this.instanceCount, attribute.count );

				}

			}

		} );

	}

	public setAttribute( name: string, buffer: GLPowerBuffer, size: number, opt?: AttributeOptions ) {

		const attribute: AttributeBuffer = {
			buffer,
			size,
			count: buffer.array ? buffer.array.length / size : 0,
			location: undefined,
			...opt
		};

		this.attributes.set( name, attribute );

		this.gl.bindVertexArray( this.vao );

		attribute.location = this.gl.getAttribLocation( this.program, name );

		if ( attribute.location > - 1 ) {

			this.gl.bindBuffer( this.gl.ARRAY_BUFFER, attribute.buffer.buffer );

			if ( attribute.size == 16 ) {

				for ( let i = 0; i < 4; i ++ ) {

					this.gl.enableVertexAttribArray( attribute.location + i );

				}

				for ( let i = 0; i < 4; i ++ ) {

					this.gl.vertexAttribPointer( attribute.location + i, 4, this.gl.FLOAT, false, 64, 16 * i );

				}

				if ( attribute.instanceDivisor !== undefined ) {

					for ( let i = 0; i < 4; i ++ ) {

						this.gl.vertexAttribDivisor( attribute.location + i, attribute.instanceDivisor );

					}

				}

			} else {

				this.gl.enableVertexAttribArray( attribute.location );

				this.gl.vertexAttribPointer( attribute.location, attribute.size, this.gl.FLOAT, false, 0, 0 );

				if ( attribute.instanceDivisor !== undefined ) {

					this.gl.vertexAttribDivisor( attribute.location, attribute.instanceDivisor );

				}

			}

		}

		this.gl.bindVertexArray( null );

		this.calcVertCount();

		return this;

	}

	public removeAttribute( name: string ) {

		this.attributes.delete( name );

		this.calcVertCount();

		return this;

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

	/*-------------------------------
		USE
	-------------------------------*/

	public use( cb?: ( vao: GLPowerVAO ) => void ) {

		this.gl.bindVertexArray( this.vao );

		if ( cb ) cb( this );

		this.gl.bindVertexArray( null );

	}

	public getVAO() {

		return this.vao;

	}

	public dispose() {

		this.attributes.forEach( item => {

			item.buffer.dispose();

		} );

	}

}
