import * as MyPackage from '../../../../src';

export class APP{

	constructor(){

		console.log( '[examples1]' );

		let testClass = new MyPackage.Test();
		testClass.print();

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

});