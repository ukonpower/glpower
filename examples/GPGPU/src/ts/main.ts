import * as GLP from '../../../../src';

import vert from './shaders/cube.vs';
import frag from './shaders/cube.fs';

import texFrag from './shaders/tex.fs';
import standardVert from './shaders/standard.vs';

import comPos from './shaders/computePosition.fs';
import comVel from './shaders/computeVelocity.fs';

import { GPUComputationController, GPUcomputationData, GPUComputationKernel } from './GPUComputationController';

export class APP {

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

	private cube: GLP.PowerObj;

	private time: number = 0;

	private boxUniforms: GLP.Uniforms;

	private screenUni: GLP.Uniforms;

	private boxResolution: GLP.Vec2 = new GLP.Vec2( 500, 500 );

	constructor() {

		this.renderer = new GLP.Renderer( {
			canvas: document.querySelector( '#canvas' ),
			retina: true
		} );

		this.gl = this.renderer.gl;

		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.initScene();

		this.initComputing();

		this.animate();

		window.addEventListener( 'resize', this.resize.bind( this ) );

	}

	private initComputing() {

		this.gcon = new GPUComputationController( this.gl, this.renderer, this.boxResolution );

		this.gdataPos = this.gcon.createData();
		this.gdataVel = this.gcon.createData();

		this.gKernelVel = this.gcon.createKernel( comVel );
		this.gKernelPos = this.gcon.createKernel( comPos );

		this.gKernelVel.uniforms.time = { value: 0 };
		this.gKernelVel.uniforms.texVel = { value: null };
		this.gKernelVel.uniforms.texPos = { value: null };

		this.gKernelPos.uniforms.time = { value: 0 };
		this.gKernelPos.uniforms.texVel = { value: null };
		this.gKernelPos.uniforms.texPos = { value: null };

	}

	private initScene() {

		this.scene = new GLP.Scene();

		this.camera = new GLP.Camera( 50, 0.1, 1000, window.innerWidth / window.innerHeight );
		this.camera.position.set( 0, 0, 5 );

		let geo = new GLP.CubeGeometry( 0.1, 0.1, 0.1 );

		let nArray = [];
		let computeUVArray = [];

		for ( let i = 0; i < this.boxResolution.y; i ++ ) {

			for ( let j = 0; j < this.boxResolution.x; j ++ ) {

				nArray.push( i );

				computeUVArray.push( ( j ) / this.boxResolution.x, ( i ) / this.boxResolution.y );

			}

		}

		geo.add( 'n', nArray, 1, true );
		geo.add( 'computeUV', computeUVArray, 2, true );

		this.boxUniforms = {
			time: {
				value: 0
			},
			texPos: {
				value: null
			},
			texVel: {
				value: null
			},
		};

		let mat = new GLP.Material( {
			frag: frag,
			vert: vert,
			uniforms: this.boxUniforms,
			culling: this.gl.CCW,
		} );

		this.cube = new GLP.PowerObj( geo, mat, this.gl.TRIANGLES );

		this.scene.add( this.cube );

		this.screenUni = {
			texture: {
				value: null
			}
		};

		let screen = new GLP.PowerObj(
			new GLP.CubeGeometry( 0.5, 0.5, 0.5 ),
			new GLP.Material( {
				frag: texFrag,
				vert: standardVert,
				uniforms: this.screenUni
			} )
		);

		this.scene.add( screen );

	}

	private animate() {

		this.time += 1.0;

		this.boxUniforms.time.value = this.time;
		this.gKernelPos.uniforms.time.value = this.time;
		this.gKernelVel.uniforms.time.value = this.time;

		//gpgpu
		this.gKernelVel.uniforms.texVel.value = this.gdataVel.buffer.tex;
		this.gKernelVel.uniforms.texPos.value = this.gdataPos.buffer.tex;
		this.gcon.compute( this.gKernelVel, this.gdataVel );

		this.gKernelPos.uniforms.texVel.value = this.gdataVel.buffer.tex;
		this.gKernelPos.uniforms.texPos.value = this.gdataPos.buffer.tex;
		this.gcon.compute( this.gKernelPos, this.gdataPos );

		//cube
		this.boxUniforms.texPos.value = this.gdataPos.buffer.tex;
		this.boxUniforms.texVel.value = this.gdataVel.buffer.tex;

		let theta = this.time * 0.01;
		let r = 5;

		this.camera.position.x = Math.sin( theta ) * r;
		this.camera.position.z = Math.cos( theta ) * r;
		this.camera.rotation.y = theta;

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
