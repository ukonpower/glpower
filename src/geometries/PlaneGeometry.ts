import { Geometry } from './Geometry';

export class PlaneGeometry extends Geometry {

	constructor( width: number = 1, height: number = 1, widthSegments: number = 1, heightSegments: number = 1 ) {

		super();

		let hx = width / 2;
		let hy = height / 2;

		let posArray = [];
		let normalArray = [];
		let uvArray = [];
		let indexArray = [];

		for ( let i = 0; i <= heightSegments; i ++ ) {

			for ( let j = 0; j <= widthSegments; j ++ ) {

				let x = ( j / widthSegments );
				let y = ( i / widthSegments );

				posArray.push(
					- hx + width * x,
					- hy + height * y,
					0
				);

				uvArray.push( x, y );

				if ( i > 0 && j > 0 ) {

					let n = ( widthSegments + 1 );
					let ru = n * i + j;
					let lb = n * ( i - 1 ) + j - 1;

					indexArray.push(
						ru, n * i + j - 1, lb,
						ru, lb, n * ( i - 1 ) + j,
					);

				}

			}

		}

		this.add( 'position', posArray, 3 );
		this.add( 'normal', normalArray, 3 );
		this.add( 'uv', uvArray, 2 );
		this.add( 'index', indexArray, 1 );

	}

}
