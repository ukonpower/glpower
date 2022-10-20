import * as GLP from '@glpower';

export class Demo {

	// contexts

	private canvas: HTMLCanvasElement;
	private gl: WebGL2RenderingContext;

	constructor( canvas: HTMLCanvasElement, gl: WebGL2RenderingContext ) {

		this.canvas = document.querySelector( '#canvas' )!;
		this.gl = this.canvas.getContext( 'webgl2' )!;

		// resize

		window.addEventListener( 'resize', this.resize.bind( this ) );
		this.resize();

		// animate

		this.animate();

	}

	private animate() {

		this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
		this.gl.clearDepth( 1.0 );
		this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );



		window.requestAnimationFrame( this.animate.bind( this ) );

	}

	private resize() {

		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

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
