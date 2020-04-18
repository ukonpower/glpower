import * as GLP from '../../../../src';

import vert from './shaders/cube.vs';
import frag from './shaders/cube.fs';

export class APP {

	private renderer: GLP.Renderer;
	private gl: WebGLRenderingContext;

	private fbuffer: GLP.FrameBuffer;

	private scene: GLP.Scene;
	private renderScene: GLP.Scene;

	private camera: GLP.Camera;

	private cube: GLP.PowerObj;
	private renderCube: GLP.PowerObj;

	private time: number = 0;

	private uniform: GLP.Uniforms;

	constructor() {

		this.renderer = new GLP.Renderer( {
			canvas: document.querySelector( '#canvas' ),
			retina: true
		} );

		this.gl = this.renderer.gl;

		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.fbuffer = new GLP.FrameBuffer( {
			width: 1024,
			height: 512,
		} );

		this.initScene();

		this.animate();

		window.addEventListener( 'resize', this.resize.bind( this ) );

	}

	private initScene() {

		this.scene = new GLP.Scene();
		this.renderScene = new GLP.Scene();

		this.camera = new GLP.Camera( 50, 0.1, 1000, window.innerWidth / window.innerHeight );
		this.camera.position.set( 0, 0, 5 );

		//cube1

		let uni1 = {
			texture: {
				value: null
			}
		};

		let mat = new GLP.Material( {
			frag: frag,
			vert: vert,
			uniforms: uni1,
			culling: this.gl.CCW
		} );

		this.cube = new GLP.PowerObj( new GLP.CubeGeometry( 1.5, 1.5, 1.5 ), mat );

		this.scene.add( this.cube );

		uni1.texture.value = new GLP.Texture().loadImg( './assets/Lenna.jpg' );

		//cube2

		this.uniform = {
			texture: {
				value: this.fbuffer
			}
		};

		let mat2 = new GLP.Material( {
			frag: frag,
			vert: vert,
			uniforms: this.uniform,
		} );

		this.renderCube = new GLP.PowerObj(  new GLP.PlaneGeometry( 1.5, 1.5 ), mat2 );

		this.renderScene.add( this.renderCube );

	}

	private animate() {

		this.time += 1.0;

		let rot = this.time * 0.02;

		this.cube.rotation.set( rot, rot, 0 );

		this.renderCube.rotation.set( 0, rot, 0 );

		this.camera.aspect = 1;

		this.renderer.setFrameBuffer( this.fbuffer );

		this.renderer.render( this.scene, this.camera );

		this.camera.aspect = window.innerWidth / window.innerHeight;

		this.renderer.setFrameBuffer( null );

		this.renderer.render( this.renderScene, this.camera );

		requestAnimationFrame( this.animate.bind( this ) );

	}

	private resize() {

		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.renderer.setSize( window.innerWidth, window.innerHeight );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

} );
