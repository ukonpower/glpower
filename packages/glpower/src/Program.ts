import { Buffer } from "./Buffer";
import { Matrix4 } from "./Math/Matrix4";
import { Vector2 } from "./Math/Vector2";
import { Vector3 } from "./Math/Vector3";
import { VAO } from "./VAO";

export type Uniformable = boolean | number | number[] | Vector2 | Vector2[] | Vector3 | Vector3[] | Matrix4;

export type Uniform = {
	name: string;
	location: WebGLUniformLocation | null;
	value: Uniformable;
	type: string;
}
export class Program {

	public gl: WebGL2RenderingContext;
	public program: WebGLProgram | null;

	private vao: Map<string, VAO>;

	protected indexBuffer: Buffer | null = null;
	protected uniformList: Uniform[] = [];

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;

		this.program = this.gl.createProgram();

		this.vao = new Map();

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
		Uniforms
	-------------------------------*/

	public setUniform( name: string, value: Uniformable ) {

		const index = this.uniformList.findIndex( uniform =>uniform.name == name );

		if ( index > - 1 ) {

			this.uniformList[ index ].value = value;

		} else {

			this.uniformList.push( {
				name,
				value,
				type: '',
				location: null
			} );

			this.updateUniformLocations();

		}

	}

	private updateUniformLocations( force?: boolean ) {

		if ( ! this.program ) return;

		this.uniformList.forEach( uniform => {

			if ( uniform.location === null || force ) {

				uniform.location = this.gl.getUniformLocation( this.program!, uniform.name );

			}

		} );

	}

	/*-------------------------------
		VAO
	-------------------------------*/

	public getVAO( id: string = '_' ) {

		if ( ! this.program ) return null;

		let vao = this.vao.get( id );

		if ( vao ) return vao;

		vao = new VAO( this.gl, this.program );

		this.vao.set( id, vao );

		return vao;

	}

	/*-------------------------------
		Draw??
	-------------------------------*/

	public prepare() {

		if ( ! this.program ) return;

		this.gl.useProgram( this.program );

		// uniforms

		for ( let i = 0; i < this.uniformList.length; i ++ ) {

			const uniform = this.uniformList[ i ];

			this.gl.uniformMatrix4fv( uniform.location, false, ( uniform.value as any ).elm );

		}

	}

	public clean() {

	}

	public getProgram() {

		return this.program;

	}

}
