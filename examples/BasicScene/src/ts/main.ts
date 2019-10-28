import * as GLP from '../../../../src';

import vert from './shaders/cube.vs';
import frag from './shaders/cube.fs';

export class APP{

	private renderer: GLP.Renderer;
	private scene: GLP.Scene;
	private camera: GLP.Camera;

	private cube: GLP.Mesh;

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
	
		let mat = new GLP.Material({
			frag: frag,
			vert: vert,
			uniforms: {},
			side: GLP.SideFront
		});

		this.cube = new GLP.Mesh( new GLP.CubeGeometry(), mat );
		this.scene.add( this.cube );

	}

	private animate(){

		this.time += 1.0;

		this.cube.rotation.x = this.time * 0.02;
		this.cube.rotation.y = this.time * 0.02;

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