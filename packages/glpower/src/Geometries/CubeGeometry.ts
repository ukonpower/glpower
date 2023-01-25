import { Geometry } from './Geometry';

export class CubeGeometry extends Geometry {

	constructor( width: number = 1, height: number = 1, depth: number = 1 ) {

		super();

		const hx = width / 2;
		const hy = height / 2;
		const hz = depth / 2;

		const posArray = [
			- hx, hy, hz,
			hx, hy, hz,
			- hx, - hy, hz,
			hx, - hy, hz,

			hx, hy, - hz,
			- hx, hy, - hz,
			hx, - hy, - hz,
			- hx, - hy, - hz,

			hx, hy, hz,
			hx, hy, - hz,
			hx, - hy, hz,
			hx, - hy, - hz,

			- hx, hy, - hz,
			- hx, hy, hz,
			- hx, - hy, - hz,
			- hx, - hy, hz,

			- hx, hy, - hz,
			hx, hy, - hz,
			- hx, hy, hz,
			hx, hy, hz,

			- hx, - hy, hz,
			hx, - hy, hz,
			- hx, - hy, - hz,
			hx, - hy, - hz,

		];

		const normalArray = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, - 1,
			0, 0, - 1,
			0, 0, - 1,
			0, 0, - 1,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			- 1, 0, 0,
			- 1, 0, 0,
			- 1, 0, 0,
			- 1, 0, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, - 1, 0,
			0, - 1, 0,
			0, - 1, 0,
			0, - 1, 0,
		];

		const uvArray = [];
		const indexArray = [];

		for ( let i = 0; i < 6; i ++ ) {

			uvArray.push(
				0, 1,
				1, 1,
				0, 0,
				1, 0
			);

			const offset = 4 * i;

			indexArray.push(
				0 + offset, 2 + offset, 1 + offset, 1 + offset, 2 + offset, 3 + offset
			);

		}

		this.setAttribute( 'position', posArray, 3 );
		this.setAttribute( 'normal', normalArray, 3 );
		this.setAttribute( 'uv', uvArray, 2 );
		this.setAttribute( 'index', indexArray, 1 );

	}

}
