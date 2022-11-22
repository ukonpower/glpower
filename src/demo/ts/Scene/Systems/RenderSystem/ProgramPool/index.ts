import * as GLP from 'glpower';

export class ProgramPool {

	private core: GLP.Power;
	private gl: WebGL2RenderingContext;

	private pool: Map<string, GLP.GLPowerProgram>;

	constructor( core: GLP.Power ) {

		this.core = core;
		this.gl = this.core.gl;

		this.pool = new Map();

	}

	public create( vertexShader: string, fragmentShader: string ) {

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
