import { Matrix4 } from "./Math/Matrix4";
import { Vector2 } from "./Math/Vector2";
import { Vector3 } from "./Math/Vector3";
import { VAO } from "./VAO";

export type Uniformable = boolean | number | Vector2 | Vector3 | Matrix4;
export type UniformType =
	'1f' | '1fv' | '2f' | '2fv' | '3f' | '3fv' | '4f' | '4fv' |
	'1i' | '1iv' | '2i' | '2iv' | '3i' | '3iv' | '4i' | '4iv' |
	'Matrix2fv' | 'Matrix3fv' | 'Matrix4fv';

export type Uniform = {
	location: WebGLUniformLocation | null;
	value: ( number|boolean )[];
	type: string;
}
export class Program {

	public gl: WebGL2RenderingContext;
	public program: WebGLProgram | null;

	private vao: Map<string, VAO>;
	protected uniforms: Map<string, Uniform>;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;

		this.program = this.gl.createProgram();

		this.vao = new Map();
		this.uniforms = new Map();

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

	public setUniform( name: string, type: UniformType, value: ( number | boolean )[] ) {

		const uniform = this.uniforms.get( name );

		if ( uniform ) {

			uniform.type = type;
			uniform.value = value;

		} else {

			this.uniforms.set( name, {
				value,
				type: type,
				location: null,
			} );

			this.updateUniformLocations();

		}

	}

	private updateUniformLocations( force?: boolean ) {

		if ( ! this.program ) return;

		this.uniforms.forEach( ( uniform, key ) => {

			if ( uniform.location === null || force ) {

				uniform.location = this.gl.getUniformLocation( this.program!, key );

			}

		} );

	}

	public uploadUniforms() {

		this.uniforms.forEach( uniform => {

			if ( /Matrix[2|3|4]fv/.test( uniform.type ) ) {

				( this.gl as any )[ 'uniform' + uniform.type ]( uniform.location, false, uniform.value );

			} else if ( /[1|2|3|4]f/.test( uniform.type ) ) {

				( this.gl as any )[ 'uniform' + uniform.type ]( uniform.location, ...uniform.value );

			} else {

				( this.gl as any )[ 'uniform' + uniform.type ]( uniform.location, uniform.value );

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

	public use() {

		if ( ! this.program ) return;

		this.gl.useProgram( this.program );

	}

	public clean() {

		this.gl.useProgram( null );

	}

	public getProgram() {

		return this.program;

	}

}
