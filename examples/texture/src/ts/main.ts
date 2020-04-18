import * as GLP from '../../../../src';

import vert from './shaders/cube.vs';
import frag from './shaders/cube.fs';
import { Texture } from '../../../../src/textures/Texture';

export class APP {

	private renderer: GLP.Renderer;
	private gl: WebGLRenderingContext;

	private scene: GLP.Scene;
	private camera: GLP.Camera;

	private cube: GLP.PowerObj;
	private cube2: GLP.PowerObj;

	private time: number = 0;

	constructor() {

		this.renderer = new GLP.Renderer( {
			canvas: document.querySelector( '#canvas' ),
			retina: true
		} );

		this.gl = this.renderer.gl;

		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.initScene();

		this.animate();

		window.addEventListener( 'resize', this.resize.bind( this ) );

	}

	private initScene() {

		this.scene = new GLP.Scene();

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

		this.cube = new GLP.PowerObj( new GLP.CubeGeometry(), mat );

		this.cube.position.x = - 1;
		this.scene.add( this.cube );

		uni1.texture.value = new Texture().loadImg( './assets/Lenna.jpg' );

		//cube2

		let uni2 = {
			texture: {
				value: null
			}
		};

		let mat2 = new GLP.Material( {
			frag: frag,
			vert: vert,
			uniforms: uni2,
		} );

		this.cube2 = new GLP.PowerObj( new GLP.CubeGeometry(), mat2 );

		this.cube2.position.x = 1;
		this.scene.add( this.cube2 );

		let tex2 = new Texture();
		tex2.loadImg( './assets/Mandrill.jpg', ( tex ) => {

			uni2.texture.value = tex;

		} );


	}

	private animate() {

		this.time += 1.0;

		let rot = this.time * 0.02;

		this.cube.rotation.set( rot, rot, 0 );

		this.cube2.rotation.set( rot, rot, 0 );

		this.renderer.render( this.scene, this.camera );

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
