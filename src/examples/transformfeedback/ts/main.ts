import * as GLP from 'glpower';

import transformFeedbackVert from './shaders/transformFeedback.vs';
import transformFeedbackFrag from './shaders/transformFeedback.fs';

class ExTransformFeedback {

	// contexts

	private canvas: HTMLCanvasElement;
	private gl: WebGL2RenderingContext;
	private power: GLP.Power;

	constructor( canvas: HTMLCanvasElement, gl: WebGL2RenderingContext ) {

		this.canvas = canvas;
		this.gl = gl;
		this.power = new GLP.Power( this.gl );

		const num = 10;

		const buffer1Data = [];
		const buffer2Data = [];

		for ( let i = 0; i < num; i ++ ) {

			buffer1Data.push( i );
			buffer2Data.push( 0 );

		}

		const buffer1 = this.power.createBuffer();
		buffer1.setData( new Float32Array( buffer1Data ), 'vbo', this.gl.DYNAMIC_COPY );

		const buffer2 = this.power.createBuffer();
		buffer2.setData( new Float32Array( buffer2Data ), 'vbo', this.gl.DYNAMIC_COPY );

		// program

		const program = this.power.createProgram();
		program.setShader( transformFeedbackVert, transformFeedbackFrag, { transformFeedbackVaryings: [ 'o_value' ] } );

		// vao

		const vao = program.getVAO();

		if ( vao ) {

			vao.setAttribute( 'value', buffer1, 1 );
			vao.setAttribute( 'value_out', buffer2, 1, { transformFeedbackVaryingIndex: 0 } );

			program.use( () => {

				vao.use( () => {

					this.gl.enable( gl.RASTERIZER_DISCARD );

					this.gl.beginTransformFeedback( this.gl.POINTS );

					this.gl.drawArrays( this.gl.POINTS, 0, vao.vertCount );

					this.gl.endTransformFeedback();

					this.gl.disable( gl.RASTERIZER_DISCARD );

				} );

			} );

		}

	}

}

window.addEventListener( 'DOMContentLoaded', () => {

	const canvas = document.querySelector<HTMLCanvasElement>( '#canvas' )!;

	const gl = canvas.getContext( 'webgl2' );

	if ( ! gl ) {

		alert( 'unsupported webgl...' );

		return;

	}

	new ExTransformFeedback( canvas, gl );

} );
