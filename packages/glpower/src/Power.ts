export class Power {

	public gl: WebGL2RenderingContext;

	public extDisJointTimerQuery: any;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;

		// ext

		this.gl.getExtension( "EXT_color_buffer_float" );
		this.gl.getExtension( "EXT_color_buffer_half_float" );
		this.gl.getExtension( "OES_texture_float_linear" );
		this.extDisJointTimerQuery = this.gl.getExtension( "EXT_disjoint_timer_query_webgl2" );

	}

}

