import * as GLP from '../../../../src';

import vert from './shaders/cube.vs';
import frag from './shaders/cube.fs';

import texFrag from './shaders/tex.fs';
import standardVert from './shaders/standard.vs';

import comPos from './shaders/computePosition.fs';
import comVel from './shaders/computeVelocity.fs';

import { GPUComputationController, GPUcomputationData, GPUComputationKernel } from './GPUComputationController';

export class APP{

	private renderer: GLP.Renderer;
	private gl: WebGLRenderingContext;
	
	private scene: GLP.Scene;
	private camera: GLP.Camera;

	//compute renderer
	
	private gcon: GPUComputationController;
	private gdataPos: GPUcomputationData;
	private gdataVel: GPUcomputationData;
	private gKernelPos: GPUComputationKernel;
	private gKernelVel: GPUComputationKernel;
	
	private cube: GLP.RenderingObject;

	private time: number = 0;

	private uniforms: GLP.Uniforms;

	private screenUni: GLP.Uniforms;

	constructor(){

		this.renderer = new GLP.Renderer({
			canvas: document.querySelector( '#canvas' ),
			retina: true
		});

		this.gl = this.renderer.gl;

		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.initScene();

		this.initComputing();

		this.animate();

		window.addEventListener( 'resize', this.resize.bind( this ) );

	}

	private initComputing(){

		this.gcon = new GPUComputationController( this.gl, this.renderer, new GLP.Vec2( 100, 100 ) );

		this.gdataPos = this.gcon.createData();
		this.gdataVel = this.gcon.createData();

		this.gKernelVel = this.gcon.createKernel( comVel );
		this.gKernelPos = this.gcon.createKernel( comPos );

		this.gKernelVel.uniforms.texVel = { value: null }
		this.gKernelVel.uniforms.texPos = { value: null }

		this.gKernelPos.uniforms.texVel = { value: null }
		this.gKernelPos.uniforms.texPos = { value: null }

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

		// this.scene.add( this.cube );

		
		
		this.screenUni = {
			texture: {
				value: null
			}
		}
		
		let screen = new GLP.RenderingObject({
			mat: new GLP.Material({
				frag: texFrag,
				vert: standardVert,
				uniforms: this.screenUni
			}),
			geo: new GLP.PlaneGeometry( 2.0, 2.0 )
		})

		this.scene.add( screen );
	}

	private animate(){

		this.time += 1.0;

		this.uniforms.time.value = this.time;
		
		//gpgpu

		this.gKernelVel.uniforms.texVel.value = this.gdataVel.buffer.tex;
		this.gKernelVel.uniforms.texPos.value = this.gdataPos.buffer.tex;
		this.gcon.compute( this.gKernelVel, this.gdataVel );

		this.gKernelPos.uniforms.texVel.value = this.gdataVel.buffer.tex;
		this.gKernelPos.uniforms.texPos.value = this.gdataPos.buffer.tex;
		this.gcon.compute( this.gKernelPos, this.gdataPos );
		
		console.log( this.gdataPos.buffer);
		
		this.screenUni.texture.value = this.gdataPos.buffer.tex;

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