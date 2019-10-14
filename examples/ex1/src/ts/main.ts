import * as GLP from '../../../../src';

import vert from './shaders/cube.vs';
import frag from './shaders/cube.fs';

export class APP{

	private renderer: GLP.Renderer;
	private scene: GLP.Scene;
	private camera: GLP.Camera;

	private uni: GLP.Uniforms;
	
	constructor(){

		this.renderer = new GLP.Renderer({
			canvas: document.querySelector( '#canvas' ),
			retina: true
		});
		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.initScene();

		this.animate();

	}

	private initScene(){
		
		this.scene = new GLP.Scene();

		this.camera = new GLP.Camera();
		this.camera.position.z = 5;
		
		let posArray = [
			0, 1.0, 0,
			-1.0, -1.0, 0,
			1.0, -1.0, 0
		]

		let indexArray = [
			0, 1, 2
		]

		let geo = new GLP.Geometry();
		geo.addAttributes( 'position', posArray, 3 );
		geo.addAttributes( 'index', indexArray, 1 );

		this.uni = {
			time: {
				value: 0
			}
		}
		
		let mat = new GLP.Material({
			frag: frag,
			vert: vert,
			uniforms: this.uni
		});

		let mesh = new GLP.Mesh( geo, mat );

		this.scene.add( mesh );

	}

	private animate(){

		this.uni.time.value += 1.0;

		this.renderer.render( this.scene, this.camera );

		requestAnimationFrame( this.animate.bind( this ) );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

});