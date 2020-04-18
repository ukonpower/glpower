import * as GLP from '../../../../src';

import vert from './shaders/model.vs';
import frag from './shaders/model.fs';

export class APP {

	private renderer: GLP.Renderer;
	private gl: WebGLRenderingContext;

	private scene: GLP.Scene;
	private camera: GLP.Camera;

	private model: GLP.PowerObj;

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
			uniforms: {},
			// culling: this.gl.CCW,
		} );

		let loader = new GLP.GLTFLoader();

		loader.load( './assets/suzanne.gltf', ( data ) => {

			console.log( data );

			let geo = new GLP.Geometry();
			geo.add( 'position', data.Suzanne.position.array, data.Suzanne.position.size );
			geo.add( 'normal', data.Suzanne.normal.array, data.Suzanne.normal.size );
			geo.add( 'uv', data.Suzanne.texcoord_0.array, data.Suzanne.texcoord_0.size );
			geo.add( 'index', data.Suzanne.indices.array, data.Suzanne.indices.size );

			this.model = new GLP.PowerObj( geo, mat );

			this.scene.add( this.model );

		} );



	}

	private animate() {

		this.time += 1.0;

		if ( this.model ) {

			// this.model.rotation.x = this.time * 0.02;
			this.model.rotation.y = this.time * 0.02;

		}

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
