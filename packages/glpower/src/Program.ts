import { Buffer } from "./Buffer";
import { Matrix4 } from "./Math/Matrix4";
import { Vector2 } from "./Math/Vector2";
import { Vector3 } from "./Math/Vector3";

export type Uniformable = boolean | number | number[] | Vector2 | Vector2[] | Vector3 | Vector3[] | Matrix4;

type Uniform = {
	name: string,
	type: string,
	value: Uniformable
}

type Attribute = {
	name: string;
	location: number;
	buffer: Buffer;
	size: number,
}

export class Program {

	protected gl: WebGL2RenderingContext;
	protected program: WebGLProgram | null;

	protected indexBuffer: Buffer | null = null;
	protected attributeList: Attribute[] = [];
	protected uniformList: Uniform[] = [];

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;

		this.program = this.gl.createProgram();

	}

	/*-------------------------------
		Shader
	-------------------------------*/

	public setShader( vertexShaderSrc: string, fragmentShaderSrc: string ) {

		if ( this.program === null ) {

			console.warn( 'program is null.' );

			return;

		}

		const vs = this.createShader( vertexShaderSrc, this.gl.VERTEX_SHADER );
		const fs = this.createShader( fragmentShaderSrc, this.gl.FRAGMENT_SHADER );

		if ( ! vs || ! fs ) return;

		this.gl.attachShader( this.program, vs );
		this.gl.attachShader( this.program, fs );

		this.gl.linkProgram( this.program );

		if ( ! this.gl.getProgramParameter( this.program, this.gl.LINK_STATUS ) ) {

			console.warn( 'program link error.' );

		}

		return this;

	}

	protected createShader( shaderSrc: string, type: number ) {

		const shader = this.gl.createShader( type );

		if ( ! shader ) {

			return null;

		}

		this.gl.shaderSource( shader, shaderSrc );
		this.gl.compileShader( shader );

		if ( this.gl.getShaderParameter( shader, this.gl.COMPILE_STATUS ) ) {

			return shader;

		} else {

			console.error( this.gl.getShaderInfoLog( shader ) );

		}

		return null;

	}

	/*-------------------------------
		Attribute
	-------------------------------*/

	public setAttribute( name: string, buffer: Buffer, size: number ) {

		const attribute: Attribute = {
			name,
			buffer,
			location: - 1,
			size: size
		};

		const existIndex = this.attributeList.findIndex( attrib => attrib.name == name );

		if ( existIndex > - 1 ) {

			this.attributeList[ existIndex ] = attribute;

		} else {

			this.attributeList.push( attribute );

		}

		this.updateAttributes( );

		return this;

	}

	public removeAttribute( name: string ) {

		const index = this.attributeList.findIndex( attrib => attrib.name == name );

		if ( index > - 1 ) {

			this.attributeList.splice( index, 1 );

			this.updateAttributes();

		}

		return this;

	}

	public updateAttributes() {

		if ( ! this.program ) {

			console.warn( 'program is null.' );

			return;

		}

		for ( let i = 0; i < this.attributeList.length; i ++ ) {

			const attr = this.attributeList[ i ];

			attr.location = this.gl.getAttribLocation( this.program, attr.name );

		}

	}

	/*-------------------------------
		Index
	-------------------------------*/

	public setIndex( indexBuffer: Buffer | null ) {

		this.indexBuffer = indexBuffer;

	}

	/*-------------------------------
		Uniforms
	-------------------------------*/

	public setUniform( name: string, value: Uniformable ) {

		const index = this.uniformList.findIndex( uniform =>uniform.name == name );

		const uni: Uniform = {
			name,
			value,
			type: ''
		};

		if ( index > - 1 ) {

			this.uniformList[ index ] = uni;

		} else {

			this.uniformList.push( uni );

		}

	}

	/*-------------------------------
		Draw??
	-------------------------------*/

	public prepare() {

		if ( ! this.program ) return;

		this.gl.useProgram( this.program );

		// attributes

		for ( let i = 0; i < this.attributeList.length; i ++ ) {

			const attr = this.attributeList[ i ];

			this.gl.bindBuffer( this.gl.ARRAY_BUFFER, attr.buffer.buffer );
			this.gl.enableVertexAttribArray( attr.location );
			this.gl.vertexAttribPointer( attr.location, attr.size, this.gl.FLOAT, false, 0, 0 );

		}

		// index

		if ( this.indexBuffer ) {

			this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer.buffer );

		}

		// uniforms

		for ( let i = 0; i < this.uniformList.length; i ++ ) {

			const uni = this.uniformList[ i ];

			const location = this.gl.getUniformLocation( this.program, uni.name );

			this.gl.uniformMatrix4fv( location, false, ( uni.value as any ).elm );

		}

	}

	public clean() {

	}

}
