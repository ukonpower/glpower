import * as GLP from '../../../../src';

import vert from './shaders/cube.vs';
import frag from './shaders/cube.fs';
import { Empty } from '../../../../src';

export class APP{

	private renderer: GLP.Renderer;
	private scene: GLP.Scene;
	private camera: GLP.Camera;

	private uni: GLP.Uniforms;

	private objs: Empty[] = [];

	private time: number = 0;

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
			uniforms: this.uni,
			doubleSide: true
		});

		let tri = new GLP.Mesh( geo, mat );
		this.scene.add( tri );
		this.objs.push( tri );

		let cube = new GLP.Mesh( new GLP.CubeGeometry( 0.6, 0.6, 0.6 ), mat );
		this.scene.add( cube );
		this.objs.push( cube );

		let cylinder = new GLP.Mesh( new GLP.CylinderGeometry( 0.0, 0.5, 0.5, 10, 3 ), mat );
		this.scene.add( cylinder );
		this.objs.push( cylinder );

		let sphere = new GLP.Mesh( new GLP.SphereGeometry( 0.5 ), mat );
		this.scene.add( sphere );
		this.objs.push( sphere );

		let scale = 1.5;

		for( let i = 0; i < this.objs.length; i++ ){

			let x = -( this.objs.length - 1 ) * scale / 2 + i * scale;

			this.objs[i].position.x = x;

		}

	}

	private animate(){

		this.time += 1;

		this.uni.time.value = this.time;

		for( let i = 0; i < this.objs.length; i++ ){

			this.objs[i].rotation.x = this.time * 0.02;
			this.objs[i].rotation.y = this.time * 0.02;

		}

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