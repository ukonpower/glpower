import * as GLP from '../../../../src';

import vert from './shaders/cube.vs';
import frag from './shaders/cube.fs';

export class APP{

	private renderer: GLP.Renderer;
	private gl: WebGLRenderingContext;
	
	private scene: GLP.Scene;
	private camera: GLP.Camera;

	private objs: GLP.RenderingObject[] = [];

	private time: number = 0;

	constructor(){

		this.renderer = new GLP.Renderer({
			canvas: document.querySelector( '#canvas' ),
			retina: true
		});

		this.gl = this.renderer.gl;

		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.initScene();

		this.animate();

		window.addEventListener( 'resize', this.resize.bind( this ) );

	}

	private initScene(){
		
		this.scene = new GLP.Scene();

		this.camera = new GLP.Camera( 50, 0.1, 1000, window.innerWidth / window.innerHeight );
		this.camera.position.set( 0, 0, 5 );
	
		let mat = new GLP.Material({
			frag: frag,
			vert: vert,
			uniforms: {},
		});
		
		this.objs.push( new GLP.RenderingObject({ geo: new GLP.PlaneGeometry(), mat: mat }) );
		this.objs.push( new GLP.RenderingObject({ geo: new GLP.SphereGeometry(), mat: mat }) );
		this.objs.push( new GLP.RenderingObject({ geo: new GLP.CylinderGeometry(), mat: mat }) );
		this.objs.push( new GLP.RenderingObject({ geo: new GLP.CubeGeometry(), mat: mat }) );

		let distance = 1.5;
		
		for (let i = 0; i < this.objs.length; i++) {
			
			let obj = this.objs[i];
			
			obj.position.x = -( ( this.objs.length - 1 ) / 2 ) * distance + i * distance;

			this.scene.add( obj );
			
		}
		
	}

	private animate(){

		this.time += 1.0;

		for ( let i = 0; i < this.objs.length; i++ ) {
			
			let obj = this.objs[i];
			
			obj.rotation.x = this.time * 0.01;
			obj.rotation.y = this.time * 0.01;
			
		}

		this.renderer.render( this.scene, this.camera );

		requestAnimationFrame( this.animate.bind( this ) );

	}

	private resize(){

		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.renderer.setSize( window.innerWidth, window.innerHeight );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

});