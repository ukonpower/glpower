import { Geometry } from './Geometry';

export class CubeGeometry extends Geometry{

	constructor( width: number = 1, height: number = 1, depth: number = 1 ){

		super();

		let hx = width / 2;
		let hy = height / 2;
		let hz = depth / 2;
		
		let posArray = [
			-hx, hy, hz,
			hx, hy, hz,
			-hx, -hy, hz,
			hx, -hy, hz,

			hx, hy, -hz,
			-hx, hy, -hz,
			hx, -hy, -hz,
			-hx, -hy, -hz,

			hx, hy, hz,
			hx, hy, -hz,
			hx, -hy, hz,
			hx, -hy, -hz,

			-hx, hy, -hz,
			-hx, hy, hz,
			-hx, -hy, -hz,
			-hx, -hy, hz,

			hx, hy, -hz,
			hx, hy, hz,
			-hx, hy, -hz,
			-hx, hy, hz,

			-hx, -hy, -hz,
			-hx, -hy, hz,
			hx, -hy, -hz,
			hx, -hy, hz,

		];

		let normalArray = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
		];

		let uvArray = [];
		let indexArray = [];

		for( let i = 0; i < 6; i++ ){

			uvArray.push(
				0, 1,
				1, 1,
				0, 0,
				1, 0
			);

			let offset = 4 * i;

			indexArray.push(
				0 + offset, 2 + offset, 1 + offset, 1 + offset, 2 + offset, 3 + offset
			)

		}

		this.addAttributes( 'position', posArray, 3 );
		this.addAttributes( 'normal', normalArray, 3 );
		this.addAttributes( 'uv', uvArray, 2 );
		this.addAttributes( 'index', indexArray, 1 );

	}
}