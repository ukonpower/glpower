import * as GLP from '../../../../src';

import vert from './shaders/cube.vs';
import frag from './shaders/cube.fs';

export class APP{

	private renderer: GLP.Renderer;

	private fbuffer: GLP.FrameBuffer;
	
	private scene: GLP.Scene;
	private renderScene: GLP.Scene;

	private camera: GLP.Camera;

	private cube: GLP.Mesh;
	private renderCube: GLP.Mesh;

	private time: number = 0;

	private uniform: GLP.Uniforms;

	constructor(){

		this.renderer = new GLP.Renderer({
			canvas: document.querySelector( '#canvas' ),
			retina: true
		});

		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.fbuffer = new GLP.FrameBuffer({
			width: 1024,
			height: 512,
			minFilter: GLP.FilterLinear,
			magFilter: GLP.FilterLinear,
		})

		this.initScene();

		this.animate();

		window.addEventListener( 'resize', this.resize.bind( this ) );

	}

	private initScene(){
		
		this.scene = new GLP.Scene();
		this.renderScene = new GLP.Scene();

		this.camera = new GLP.Camera( 50, 0.1, 1000 );
		this.camera.position.set( 0, 0, 5 );

		//cube1

		let uni1 = {
			texture: {
				value: null
			}
		}
	
		let mat = new GLP.Material({
			frag: frag,
			vert: vert,
			uniforms: uni1,
			side: GLP.SideFront
		});
	
		this.cube = new GLP.Mesh( new GLP.CubeGeometry( 1.5 ), mat );
		this.scene.add( this.cube );

		let tex = new GLP.Texture();
		tex.loadImg( './assets/Lenna.jpg', ( tex ) => {

			uni1.texture.value = tex;

		})

		//cube2

		this.uniform = {
			texture: {
				value: this.fbuffer
			}
		}
	
		let mat2 = new GLP.Material({
			frag: frag,
			vert: vert,
			uniforms: this.uniform,
			side: GLP.SideDouble
		});
	
		this.renderCube = new GLP.Mesh( new GLP.PlaneGeometry( 1.5, 1.5 ), mat2 );
		this.renderScene.add( this.renderCube );

	}

	private animate(){
		
		this.time += 1.0;

		let rot = this.time * 0.02;
		
		this.cube.rotation.set( rot, rot, 0 );

		this.renderCube.rotation.set( 0, rot, 0 );
		
		this.renderer.setFrameBuffer( this.fbuffer );
		
		this.renderer.render( this.scene, this.camera );

		this.renderer.setFrameBuffer( null );

		this.renderer.render( this.renderScene, this.camera );

		requestAnimationFrame( this.animate.bind( this ) );

	}

	private resize(){

		this.renderer.setSize( window.innerWidth, window.innerHeight );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

});