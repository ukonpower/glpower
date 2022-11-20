import * as GLP from 'glpower';

import basicVert from './shaders/basic.vs';
import basicFrag from './shaders/basic.fs';

export class Hello {

	// contexts

	private canvas: HTMLCanvasElement;
	private gl: WebGL2RenderingContext;
	private core: GLP.Core;
	private projectionMatrix: GLP.Matrix4;

	constructor( canvas: HTMLCanvasElement, gl: WebGL2RenderingContext ) {

		this.canvas = canvas;
		this.gl = gl;
		this.core = new GLP.Core( this.gl );

		// scene

		this.projectionMatrix = new GLP.Matrix4();

		const cameraMatrix = new GLP.Matrix4().setFromTransform(
			new GLP.Vector3( 0.0, 0.0, 5.0 ),
			new GLP.Vector3( 0.0, 0.0, 0.0 ),
			new GLP.Vector3( 1.0, 1.0, 1.0 ),
		);

		const modelMatrix = new GLP.Matrix4().applyPosition( new GLP.Vector3( 0.0, - 0.3, 0.0 ) );
		const viewMatrix = cameraMatrix.clone().inverse();
		const modelViewMatrix = new GLP.Matrix4();

		// program

		const program = this.core.createProgram();
		program.setShader( basicVert, basicFrag );

		program.setUniform( 'modelViewMatrix', 'Matrix4fv', modelViewMatrix.elm );
		program.setUniform( 'projectionMatrix', 'Matrix4fv', this.projectionMatrix.elm );

		const vao = program.getVAO();

		if ( ! vao ) return;

		vao.setAttribute( 'position', this.core.createBuffer().setData( new Float32Array( [
			0.0, 1.0, 0.0,
			1.0, 0.0, 0.0,
			- 1.0, 0.0, 0.0,
		] ) ), 3, 3 );

		vao.setAttribute( 'color', this.core.createBuffer().setData( new Float32Array( [
			1.0, 0.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 0.0, 1.0
		] ) ), 3, 3 );

		// animate

		const animate = () => {

			this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
			this.gl.clearDepth( 1.0 );
			this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );

			modelMatrix.multiply( new GLP.Matrix4().applyRot( new GLP.Vector3( 0.0, 0.01, 0.0 ) ) );
			modelViewMatrix.identity().multiply( viewMatrix ).multiply( modelMatrix );

			program.use();

			program.uploadUniforms();

			this.gl.bindVertexArray( vao.getVAO() );
			this.gl.drawArrays( this.gl.TRIANGLES, 0, 3 );
			this.gl.flush();

			program.clean();

			window.requestAnimationFrame( animate );

		};

		animate();

		// events

		window.addEventListener( 'resize', this.resize.bind( this ) );
		this.resize();


	}

	private resize() {

		this.projectionMatrix.perspective( 50, window.innerWidth / window.innerHeight, 0.01, 1000 );

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

	new Hello( canvas, gl );

} );
