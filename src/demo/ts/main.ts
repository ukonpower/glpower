import * as GLP from 'glpower';
import { Quaternion } from 'glpower';

import { Scene } from './Scene';

export class Demo {

	// contexts

	private canvas: HTMLCanvasElement;
	private gl: WebGL2RenderingContext;
	private core: GLP.Power;

	// scene

	private scene: Scene;

	constructor( canvas: HTMLCanvasElement, gl: WebGL2RenderingContext ) {

		const q = new Quaternion();
		q.euler( new GLP.Vector3( Math.PI / 2, Math.PI / 2, Math.PI / 2 ) );
		console.log( q );
		console.log( new GLP.Matrix4().applyQuaternion( q ).elm );


		this.canvas = canvas;
		this.gl = gl;
		this.core = new GLP.Power( this.gl );

		// scene

		this.scene = new Scene( this.core );

		// events

		window.addEventListener( 'resize', this.resize.bind( this ) );
		this.resize();

		// animate

		this.animate();

	}

	private animate() {

		this.scene.update();

		window.requestAnimationFrame( this.animate.bind( this ) );

	}

	private resize() {

		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		this.gl.viewport( 0, 0, this.canvas.width, this.canvas.height );

	}

}

window.addEventListener( 'DOMContentLoaded', () => {

	const canvas = document.querySelector<HTMLCanvasElement>( '#canvas' )!;

	const gl = canvas.getContext( 'webgl2' );

	if ( ! gl ) {

		alert( 'unsupported webgl...' );

		return;

	}

	new Demo( canvas, gl );

} );
