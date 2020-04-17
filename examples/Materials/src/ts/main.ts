import * as GLP from '../../../../src';

import vert from './shaders/cube.vs';
import frag from './shaders/cube.fs';
import transparentFrag from './shaders/transparent.fs';

export class APP {

	private renderer: GLP.Renderer;

	private gl: WebGLRenderingContext;

	private scene: GLP.Scene;
	private camera: GLP.Camera;

	private cube: GLP.PowerObj;

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

		let mat = new GLP.Material( {
			frag: frag,
			vert: vert,
			culling: this.gl.CCW
		} );

		this.cube = new GLP.PowerObj( {
			geo: new GLP.CubeGeometry(),
			mat: mat
		} );

		this.scene.add( this.cube );

		let alphaMat = new GLP.Material( {
			frag: transparentFrag,
			vert: vert,
		} );

		let plane = new GLP.PowerObj( {
			geo: new GLP.PlaneGeometry( 1.5, 1.5 ),
			mat: alphaMat,
		} );

		plane.position.z = 2;
		this.scene.add( plane );

	}

	private animate() {

		this.time += 1.0;

		this.cube.rotation.x = this.time * 0.02;
		this.cube.rotation.y = this.time * 0.02;

		this.camera.position.x = Math.sin( this.time * 0.01 ) * 5;
		this.camera.position.z = Math.cos( this.time * 0.01 ) * 5;

		this.camera.rotation.y = this.time * 0.01;

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
