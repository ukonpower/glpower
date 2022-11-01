import { Buffer } from "./Buffer";

type Attribute = {
	location: number | null;
	buffer: Buffer;
	size: number;
}

export class VAO {

	private gl: WebGL2RenderingContext;

	public vao: WebGLVertexArrayObject | null = null;

	public program: WebGLProgram | null = null;

	protected indexBuffer: Buffer | null = null;

	protected attributes: {[key: string]: Attribute} = {};

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;

		this.vao = this.gl.createVertexArray();

	}

	/*-------------------------------
		Attribute
	-------------------------------*/

	public setAttribute( name: string, buffer: Buffer, size: number ) {

		const attribute: Attribute = {
			buffer,
			location: null,
			size: size
		};

		this.attributes[ name ] = attribute;

		this.updateAttributes();

		return this;

	}

	public removeAttribute( name: string ) {

		delete this.attributes[ name ];

		return this;

	}

	public updateAttributes( force?: boolean ) {

		if ( ! this.vao ) return;

		const attrNameList = Object.keys( this.attributes );

		this.gl.bindVertexArray( this.vao );

		for ( let i = 0; i < attrNameList.length; i ++ ) {

			const name = attrNameList[ i ];
			const attribute = this.attributes[ name ];

			if ( this.program ) {

				if ( ( attribute.location === null || force ) ) {

					attribute.location = this.gl.getAttribLocation( this.program, name );

					this.gl.bindBuffer( this.gl.ARRAY_BUFFER, attribute.buffer.buffer );
					this.gl.enableVertexAttribArray( attribute.location );
					this.gl.vertexAttribPointer( attribute.location, attribute.size, this.gl.FLOAT, false, 0, 0 );

				}

			} else {

				attribute.location = null;

			}

		}

		this.gl.bindVertexArray( null );

	}

	/*-------------------------------
		Index
	-------------------------------*/

	public setIndex( indexBuffer: Buffer | null ) {

		this.indexBuffer = indexBuffer;

		if ( ! this.vao ) return;

		this.gl.bindVertexArray( this.vao );

		this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer ? this.indexBuffer.buffer : null );

		this.gl.bindVertexArray( null );


	}

	/*-------------------------------
		Program
	-------------------------------*/

	public setProgram( program: WebGLProgram ) {

		this.program = program;

		this.updateAttributes( true );

	}

	public getVAO() {

		return this.vao;

	}

}
