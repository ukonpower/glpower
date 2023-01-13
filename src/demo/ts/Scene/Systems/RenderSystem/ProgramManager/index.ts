import * as GLP from 'glpower';

export class ProgramManager {

	private core: GLP.Power;
	private gl: WebGL2RenderingContext;

	private pool: Map<string, GLP.GLPowerProgram>;

	constructor( core: GLP.Power ) {

		this.core = core;
		this.gl = this.core.gl;
		this.pool = new Map();

	}

	private insertDefines( shader: string, defines: {[key: string]: number | string} ) {

		if ( ! defines ) return shader;

		const splited = shader.split( '\n' );

		let insertIndex = splited.findIndex( item => item.indexOf( 'precision' ) > - 1 );

		if ( insertIndex == - 1 ) {

			insertIndex = splited.findIndex( item => item.indexOf( '#version' ) > - 1 );

		}

		const keys = Object.keys( defines );

		for ( let i = 0; i < keys.length; i ++ ) {

			splited.splice( insertIndex + 1, 0, "#define " + keys[ i ] + ' ' + defines[ keys[ i ] ] );

		}

		let res = '';

		splited.forEach( item => {

			res += item + '\n';

		} );

		return res;

	}

	public get( vertexShader: string, fragmentShader: string, defines: {[key:string]: number | string} ) {

		const vs = this.insertDefines( vertexShader, defines );
		const fs = this.insertDefines( fragmentShader, defines );

		const id = vs + fs;

		const programCache = this.pool.get( id );

		if ( programCache !== undefined ) {

			return programCache;

		}

		const program = this.core.createProgram();
		program.setShader( vs, fs );

		this.pool.set( id, program );

		return program;

	}

}
