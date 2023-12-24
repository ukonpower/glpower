import { Matrix } from "./Math/Matrix";
import { Vector } from "./Math/Vector";
import { GLPowerVAO } from "./GLPowerVAO";
import { GLPowerTexture } from ".";

export type Uniformable = boolean | number | Vector | Matrix | GLPowerTexture;

export type UniformType =
	'1f' | '1fv' | '2f' | '2fv' | '3f' | '3fv' | '4f' | '4fv' |
	'1i' | '1iv' | '2i' | '2iv' | '3i' | '3iv' | '4i' | '4iv' |
	'Matrix2fv' | 'Matrix3fv' | 'Matrix4fv';

export type Uniform = {
	location: WebGLUniformLocation | null;
	value: ( number | boolean )[];
	type: string;
	cache?: ( number | boolean )[];
	needsUpdate?: boolean
}

export type Uniforms = {[key:string]: {value: any, type: UniformType}}

export type ShaderOptions = {
	transformFeedbackVaryings?: string[]
}

export class GLPowerProgram {

	public gl: WebGL2RenderingContext;
	public program: WebGLProgram | null;

	private vao: Map<string, GLPowerVAO>;
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

	public setShader( vertexShaderSrc: string, fragmentShaderSrc: string, opt?: ShaderOptions ) {

		if ( this.program === null ) {

			console.warn( 'program is null.' );

			return;

		}

		const vs = this.createShader( vertexShaderSrc, this.gl.VERTEX_SHADER );
		const fs = this.createShader( fragmentShaderSrc, this.gl.FRAGMENT_SHADER );

		if ( ! vs || ! fs ) return;

		this.gl.attachShader( this.program, vs );
		this.gl.attachShader( this.program, fs );

		if ( opt && opt.transformFeedbackVaryings ) {

			this.gl.transformFeedbackVaryings( this.program, opt.transformFeedbackVaryings, this.gl.SEPARATE_ATTRIBS );

		}

		this.gl.linkProgram( this.program );

		if ( ! this.gl.getProgramParameter( this.program, this.gl.LINK_STATUS ) ) {

			console.error( 'program link error:', this.gl.getProgramInfoLog( this.program ) );

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

			if ( process.env.NODE_ENV == "development" ) {

				const errorLog = this.gl.getShaderInfoLog( shader );

				if ( errorLog ) {

					const splitShaderSrc = shaderSrc.split( '\n' );

					const lines = errorLog.matchAll( /ERROR: 0:(\d+)/g );

					Array.from( lines ).forEach( ( line, index ) => {

						const lineNum = Number( line[ 1 ] );

						const start = Math.max( 0, lineNum - 5 );
						const end = Math.min( splitShaderSrc.length, lineNum + 2 );

						let error = errorLog.split( '\n' )[ index ] + '\n';

						splitShaderSrc.forEach( ( t, i ) => {

							if ( start <= i && i <= end ) {

								error += `${i + 1}: ${t}\n`;

							}

						} );

						console.error( error );

					} );

				}

			}

		}

	}

	/*-------------------------------
		Uniforms
	-------------------------------*/

	public setUniform( name: string, type: UniformType, value: ( number | boolean )[] ) {

		const uniform = this.uniforms.get( name );

		if ( uniform ) {

			uniform.type = type;
			uniform.value = value;

			if ( uniform.cache ) {

				for ( let i = 0; i < value.length; i ++ ) {

					if ( uniform.cache[ i ] !== value[ i ] ) {

						uniform.needsUpdate = true;
						break;

					}

				}

			} else {

				uniform.needsUpdate = true;

			}

		} else {

			this.uniforms.set( name, {
				value,
				type: type,
				location: null,
				needsUpdate: true
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

			if ( uniform.needsUpdate ) {

				if ( /Matrix[2|3|4]fv/.test( uniform.type ) ) {

					( this.gl as any )[ 'uniform' + uniform.type ]( uniform.location, false, uniform.value );

				} else if ( /[1|2|3|4][f|i]$/.test( uniform.type ) ) {

					( this.gl as any )[ 'uniform' + uniform.type ]( uniform.location, ...uniform.value );

				} else {

					( this.gl as any )[ 'uniform' + uniform.type ]( uniform.location, uniform.value );

				}

				uniform.cache = uniform.value.concat();
				uniform.needsUpdate = false;

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

		vao = new GLPowerVAO( this.gl, this.program );

		this.vao.set( id, vao );

		return vao;

	}

	/*-------------------------------
		Draw??
	-------------------------------*/

	public use( cb?: ( program: GLPowerProgram ) => void ) {

		if ( ! this.program ) return;

		this.gl.useProgram( this.program );

		if ( cb ) {

			cb( this );

		}

		this.gl.useProgram( null );

	}

	public getProgram() {

		return this.program;

	}

	public dispose() {

		this.vao.forEach( vao => {

			vao.dispose();

		} );

		this.vao.clear();

		this.gl.deleteProgram( this.program );

	}

}
