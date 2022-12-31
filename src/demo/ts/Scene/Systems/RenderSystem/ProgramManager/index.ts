import * as GLP from 'glpower';
import { Lights } from '..';

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

	public get( material:GLP.ComponentMaterial, lights: Lights ) {

		const defines = {
			...material.defines,
			...{
				LIGHT_DIR: lights.directionalLight.length,
				LIGHT_POINT: lights.pointLight.length
			}
		};

		const vertexShader = this.insertDefines( material.vertexShader, defines );
		const fragmentShader = this.insertDefines( material.fragmentShader, defines );

		const id = vertexShader + fragmentShader;

		const programCache = this.pool.get( id );

		if ( programCache !== undefined ) {

			return programCache;

		}

		const program = this.core.createProgram();
		program.setShader( vertexShader, fragmentShader );

		this.pool.set( id, program );

		return program;

	}

}
