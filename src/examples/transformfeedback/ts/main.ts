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

		const num = 1000;

		const buffer1Data = [];
		const buffer2Data = [];

		for ( let i = 0; i < num; i ++ ) {

			buffer1Data.push( i );
			buffer2Data.push( 0 );

		}

		const buffer1 = this.power.createBuffer();
		buffer1.setData( new Float32Array( buffer1Data ), 'vbo' );

		const buffer2 = this.power.createBuffer();
		buffer2.setData( new Float32Array( buffer2Data ), 'vbo' );

		// program

		const program = this.power.createProgram();
		program.setShader( transformFeedbackVert, transformFeedbackFrag, [ 'o_value' ] );

		// vao

		const vao = program.getVAO();

		if ( vao ) {

			vao.setAttribute( 'value', buffer1, 1 );

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
