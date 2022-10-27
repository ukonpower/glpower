import * as GLP from '@glpower';

import basicVert from './shaders/basic.vs';
import basicFrag from './shaders/basic.fs';

export class Demo {

	// contexts

	private canvas: HTMLCanvasElement;
	private gl: WebGL2RenderingContext;
	private core: GLP.Core;

	constructor( canvas: HTMLCanvasElement, gl: WebGL2RenderingContext ) {

		this.canvas = document.querySelector( '#canvas' )!;
		this.gl = this.canvas.getContext( 'webgl2' )!;

		// scene

		this.core = new GLP.Core( this.gl );

		const projectionMatrix = new GLP.Matrix4().perspective( 40, window.innerWidth / window.innerHeight, 0.01, 1000 );

		const cameraMatrix = new GLP.Matrix4().setFromTransform(
			new GLP.Vector3( 0.0, 0.0, 5.0 ),
			new GLP.Vector3( 0.0, 0.0, 0.0 ),
			new GLP.Vector3( 1.0, 1.0, 1.0 ),
		);

		const modelMatrix = new GLP.Matrix4().identity();
		const viewMatrix = cameraMatrix.clone().inverse();
		const modelViewMatrix = new GLP.Matrix4();

		const program = this.core.createProgram();
		program.setShader( basicVert, basicFrag );

		program.setAttribute( 'position', this.core.createBuffer().setData( new Float32Array( [
			0.0, 1.0, 0.0,
			1.0, 0.0, 0.0,
			- 1.0, 0.0, 0.0
		] ) ) );

		program.setAttribute( 'color', this.core.createBuffer().setData( new Float32Array( [
			1.0, 0.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 0.0, 1.0
		] ) ) );

		// animate

		const animate = () => {

			this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
			this.gl.clearDepth( 1.0 );
			this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );

			modelMatrix.multiply( new GLP.Matrix4().applyRot( new GLP.Vector3( 0.0, 0.01, 0.0 ) ) );
			modelViewMatrix.identity().multiply( viewMatrix ).multiply( modelMatrix );

			// if ( positionBuffer ) {

			// 	const positionAttribLocation = this.gl.getAttribLocation( prg, 'position' );

			// 	this.gl.bindBuffer( this.gl.ARRAY_BUFFER, positionBuffer );
			// 	this.gl.enableVertexAttribArray( positionAttribLocation );
			// 	this.gl.vertexAttribPointer( positionAttribLocation, 3, this.gl.FLOAT, false, 0, 0 );

			// 	const colorAttribLocation = this.gl.getAttribLocation( prg, 'color' );
			// 	this.gl.bindBuffer( this.gl.ARRAY_BUFFER, colorBuffer );
			// 	this.gl.enableVertexAttribArray( colorAttribLocation );
			// 	this.gl.vertexAttribPointer( colorAttribLocation, 3, this.gl.FLOAT, false, 0, 0 );

			// }

			// const modelViewMatrixLocation = this.gl.getUniformLocation( prg, 'modelViewMatrix' );
			// const projectionMatrixLocation = this.gl.getUniformLocation( prg, 'projectionMatrix' );

			// this.gl.uniformMatrix4fv( modelViewMatrixLocation, false, modelViewMatrix.elm );
			// this.gl.uniformMatrix4fv( projectionMatrixLocation, false, projectionMatrix.elm );

			this.gl.drawArrays( this.gl.TRIANGLES, 0, 3 );

			this.gl.flush();

			window.requestAnimationFrame( animate );

		};

		animate();

		// events

		window.addEventListener( 'resize', this.resize.bind( this ) );
		this.resize();


	}

	private resize() {

		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		this.gl.viewport( 0, 0, this.canvas.width, this.canvas.height );

	}

}

window.addEventListener( 'DOMContentLoaded', () => {

	const canvas = document.querySelector<HTMLCanvasElement>( '#canvas' )!;

	const gl = canvas.getContext( 'webgl2' );

	if ( ! gl ) {

		alert( 'unsupported webgl...' );

		return;

	}

	new Demo( canvas, gl );

} );
