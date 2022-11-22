import * as GLP from 'glpower';

import basicVert from '../../shaders/basic.vs';
import textureFrag from '../../shaders/texture.fs';

class ExFrameBuffer {

	// contexts

	private canvas: HTMLCanvasElement;
	private gl: WebGL2RenderingContext;
	private power: GLP.Power;
	private projectionMatrix: GLP.Matrix4;

	private objList: {
		modelMatrix: GLP.Matrix4;
		geometry: GLP.Geometry;
		vao: GLP.GLPowerVAO;
	}[] = [];

	constructor( canvas: HTMLCanvasElement, gl: WebGL2RenderingContext ) {

		this.canvas = canvas;
		this.gl = gl;
		this.power = new GLP.Power( this.gl );

		// scene

		this.projectionMatrix = new GLP.Matrix4();

		const cameraMatrix = new GLP.Matrix4().setFromTransform(
			new GLP.Vector3( 0.0, 0.0, 5.0 ),
			new GLP.Vector3( 0.0, 0.0, 0.0 ),
			new GLP.Vector3( 1.0, 1.0, 1.0 ),
		);

		const viewMatrix = cameraMatrix.clone().inverse();

		// frameBuffer

		const frameBuffer = this.power.createFrameBuffer();
		frameBuffer.setSize( 1024, 1024 );

		// program

		const program = this.power.createProgram();
		program.setShader( basicVert, textureFrag );

		// create vao

		const planeGeometry = new GLP.PlaneGeometry( 1.4, 1.4 );

		const vao = program.getVAO()!;

		const position = planeGeometry.getAttribute( 'position' );
		vao.setAttribute( 'position', this.power.createBuffer().setData( new Float32Array( position.array ) ), position.size, position.array.length / position.size );

		const uv = planeGeometry.getAttribute( 'uv' );
		vao.setAttribute( 'uv', this.power.createBuffer().setData( new Float32Array( uv.array ) ), uv.size, uv.array.length / uv.size );

		const index = planeGeometry.getAttribute( 'index' );
		vao.setIndex( this.power.createBuffer().setData( new Uint16Array( index.array ), 'ibo' ) );

		const modelMatrix = new GLP.Matrix4().applyPosition( new GLP.Vector3( 0, 0, 0 ) );

		this.objList.push( {
			modelMatrix,
			geometry: planeGeometry,
			vao: vao,
		} );

		// animate

		const animate = () => {

			this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
			this.gl.clearDepth( 1.0 );
			this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );

			gl.enable( gl.DEPTH_TEST );

			this.objList.forEach( ( obj ) => {

				const modelMatrix = obj.modelMatrix;

				modelMatrix.multiply( new GLP.Matrix4().applyRot( new GLP.Vector3( 0.0, 0.01, 0.0 ) ) );
				const modelViewMatrix = viewMatrix.clone().multiply( modelMatrix );

				program.setUniform( 'modelViewMatrix', 'Matrix4fv', modelViewMatrix.elm );
				program.setUniform( 'projectionMatrix', 'Matrix4fv', this.projectionMatrix.elm );

				program.use();

				program.uploadUniforms();

				this.gl.bindVertexArray( obj.vao.getVAO() );

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

	new ExFrameBuffer( canvas, gl );

} );
