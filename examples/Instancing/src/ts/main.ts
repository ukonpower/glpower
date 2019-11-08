import * as GLP from '../../../../src';

import vert from './shaders/cube.vs';
import frag from './shaders/cube.fs';

export class APP{

	private renderer: GLP.Renderer;
	private gl: WebGLRenderingContext;
	
	private scene: GLP.Scene;
	private camera: GLP.Camera;

	private cube: GLP.RenderingObject;

	private time: number = 0;

	private uniforms: GLP.Uniforms;

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

		let geo = new GLP.CubeGeometry( 0.1, 0.1, 0.1 );
		
		let offsetPosArray = [];
		let nArray = [];

		for( let i = 0; i < 1000; i ++ ){

			offsetPosArray.push(
				( Math.random() - 0.5 ) * 3,
				( Math.random() - 0.5 ) * 3,
				( Math.random() - 0.5 ) * 3,
			)

			nArray.push( i );
			
		}

		geo.add( 'offsetPos', offsetPosArray, 3, true );
		geo.add( 'n', nArray, 1, true );
		
		this.uniforms = {
			time: {
				value: 0
			}
		}
		
		let mat = new GLP.Material({
			frag: frag,
			vert: vert,
			uniforms: this.uniforms,
			culling: this.gl.CCW,
		});
		
		this.cube = new GLP.RenderingObject({
			geo: geo,
			mat: mat
		});

		this.scene.add( this.cube );

	}

	private animate(){

		this.time += 1.0;

		this.uniforms.time.value = this.time;

		let theta = this.time * 0.01;
		let r = 5;

		this.camera.position.x = Math.sin( theta ) * r;
		this.camera.position.z = Math.cos( theta ) * r;
		this.camera.rotation.y = theta;
		
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