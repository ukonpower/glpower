import * as GLP from '@glpower';

import basicVert from './shaders/basic.vs';
import basicFrag from './shaders/basic.fs';

export class Hello {

	// contexts

	private canvas: HTMLCanvasElement;
	private gl: WebGL2RenderingContext;
	private core: GLP.Core;
	private projectionMatrix: GLP.Matrix4;

	private objList: {
		program: GLP.Program;
		modelMatrix: GLP.Matrix4;
		geometry: GLP.Geometry;
	}[] = [];

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

		const viewMatrix = cameraMatrix.clone().inverse();

		// program

		const geometries = [
			new GLP.PlaneGeometry(),
			new GLP.CubeGeometry(),
			new GLP.SphereGeometry(),
			new GLP.CylinderGeometry(),
		];

		geometries.forEach( ( geometry, i ) => {

			const program = this.core.createProgram();
			program.setShader( basicVert, basicFrag );

			const position = geometry.getAttribute( 'position' );
			program.setAttribute( 'position', this.core.createBuffer().setData( new Float32Array( position.array ) ), position.size );

			const uv = geometry.getAttribute( 'uv' );
			program.setAttribute( 'uv', this.core.createBuffer().setData( new Float32Array( uv.array ) ), uv.size );

			const index = geometry.getAttribute( 'index' );
			program.setIndex( this.core.createBuffer().setData( new Int16Array( index.array ), 'ibo' ) );

			const modelMatrix = new GLP.Matrix4().applyPosition( new GLP.Vector3( ( i / ( geometries.length - 1.0 ) - 0.5 ) * 5.0, 0, 0 ) );

			this.objList.push( {
				program,
				modelMatrix,
				geometry
			} );

		} );

		// animate

		const animate = () => {

			this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
			this.gl.clearDepth( 1.0 );
			this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );

			gl.enable( gl.DEPTH_TEST );

			this.objList.forEach( obj => {

				const program = obj.program;
				const modelMatrix = obj.modelMatrix;

				modelMatrix.multiply( new GLP.Matrix4().applyRot( new GLP.Vector3( 0.0, 0.01, 0.0 ) ) );
				const modelViewMatrix = viewMatrix.clone().multiply( modelMatrix );

				program.setUniform( 'modelViewMatrix', modelViewMatrix );
				program.setUniform( 'projectionMatrix', this.projectionMatrix );

				program.prepare();

				// this.gl.drawArrays( this.gl.TRIANGLES, 0, 10 );
				this.gl.drawElements( this.gl.TRIANGLES, obj.geometry.getAttribute( 'index' ).array.length, gl.UNSIGNED_SHORT, 0 );

				program.clean();

			} );

			this.gl.flush();

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
