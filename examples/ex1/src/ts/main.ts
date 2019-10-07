import * as GLP from '../../../../src';

export class APP{

	private renderer: GLP.Renderer;

	constructor(){

		this.renderer = new GLP.Renderer();

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

});