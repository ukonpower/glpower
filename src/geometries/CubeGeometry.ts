import { Geometry } from './Geometry';

export class CubeGeometry extends Geometry{

	constructor( width: number = 1, height: number = 1, depth: number = 1, resX: number = 0, resY: number = 1, resZ: number = 1){

		super();

		let posArray = [];
		let uvArray = [];
		let indexArray = [];

		for( let i = 0; i <= resY; i++ ){

			let x: number;
			let y: number;
			let z: number;

			y = ( height / 2 ) - ( height / resY ) * i;

			for( let j = 0; j <= resX; j++ ){
				
				x = -( width / 2 ) + ( width / resX ) * j;
				z = depth / 2;
				
				posArray.push( x, y, z );

			}

			for( let j = 0; j <= resY; j++ ){

				x = width / 2;
				z = ( depth / 2 ) - ( depth / resY ) * j;
				posArray.push( x, y, z );
				
			}

			for( let j = 0; j <= resX; j++ ){

				x = ( width / 2 ) - ( width / resX ) * j;
				z = -depth / 2;
				posArray.push( x, y, z );
				
			}

			for( let j = 0; j <= resY; j++ ){

				x = -width / 2;
				z = -( depth / 2 ) + ( depth / resY ) * j;
				posArray.push( x, y, z );
				
			}

		}
		
		this.addAttributes( 'position', posArray, 3 );

	}
}