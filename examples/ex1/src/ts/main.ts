import * as GLP from '../../../../src';

import vert from './shaders/cube.vs';
import frag from './shaders/cube.fs';

export class APP{

	private renderer: GLP.Renderer;
	private scene: GLP.Scene;
	private camera: GLP.Camera;

	private uni: GLP.Uniforms;

	private meshes: GLP.Mesh[] = [];
	
	constructor(){

		this.renderer = new GLP.Renderer({
			canvas: document.querySelector( '#canvas' ),
			retina: true
		});

		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.initScene();

		this.animate();

		window.addEventListener( 'resize', this.resize.bind( this ) );

	}

	private initScene(){
		
		this.scene = new GLP.Scene();

		this.camera = new GLP.Camera( 50, 0.1, 1000 );
		this.camera.position.set( 0, 0, 5 );
		// this.camera.rotation.set( 1.0, 0, 0 );
		
		let posArray = [
			0.0, 0.5, 0.0,
			0.5, -0.5, 0.0,
			-0.5, -0.5, 0.0
		]

		let indexArray = [
			0, 1, 2
		]

		let colorArray = [
			1.0, 0.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 0.0, 1.0,
		]

		let geo = new GLP.Geometry();
		geo.addAttributes( 'position', posArray, 3 );
		geo.addAttributes( 'index', indexArray, 1 );
		geo.addAttributes( 'color', colorArray, 3 );

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

		this.meshes.push( new GLP.Mesh( geo, mat ) );
		this.meshes[0].rotation.set( 0, 0, 0 );
		this.meshes[0].scale.set( 1, 1, 1 );
		this.scene.add( this.meshes[0] );

		this.meshes.push( new GLP.Mesh( geo, mat ) );
		this.meshes[1].position.set( 0, 0, 0 );
		this.scene.add( this.meshes[1] );


	}

	private animate(){

		this.uni.time.value += 1.0;

		this.meshes[0].rotation.y = this.uni.time.value * 0.02;
		this.meshes[1].rotation.y = this.uni.time.value * 0.02 + Math.PI / 2;

		this.renderer.render( this.scene, this.camera );

		requestAnimationFrame( this.animate.bind( this ) );

	}

	private resize(){

		this.renderer.setSize( window.innerWidth, window.innerHeight );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

});