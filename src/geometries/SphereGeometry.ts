import { Geometry } from './Geometry';
import { Vec3 } from '../math/Vec3';

export class SphereGeometry extends Geometry{

	constructor( radius: number = 0.5, widthSegments: number = 20, heightSegments: number = 10 ){

		super();

		let posArray = [];
		let normalArray = [];
		let uvArray = [];
		let indexArray = [];

		for( let i = 0; i <= heightSegments; i++ ){

			let thetaI = i / heightSegments * Math.PI;
			
			let segments = ( i != 0 && i != heightSegments ) ? widthSegments : widthSegments;
			
			for( let j = 0; j < segments; j++ ){

				// pos

				let thetaJ = j / segments * Math.PI * 2.0;
				let widthRadius = Math.sin( thetaI ) * radius;

				let x = Math.cos( thetaJ ) * widthRadius;
				let y = -Math.cos( thetaI ) * radius;
				let z = Math.sin( thetaJ ) * widthRadius;

				posArray.push( x, y, z );

				// uv

				uvArray.push(
					j / segments,
					i / heightSegments
				);

				//normal

				let normal = new Vec3( x, y, z ).normalize();

				normalArray.push( normal.x, normal.y, normal.z );
				
				// index
				
				indexArray.push(
					i * widthSegments + j,
					( i + 1 ) * widthSegments + (j + 1) % widthSegments,
					i * widthSegments + (j + 1) % widthSegments,

					i * widthSegments + j,
					( i + 1 ) * widthSegments + j,
					( i + 1 ) * widthSegments + (j + 1) % widthSegments,

				);
				
			}

		}
		
		this.add( 'position', posArray, 3 );
		this.add( 'normal', normalArray, 3 );
		this.add( 'uv', uvArray, 2 );
		this.add( 'index', indexArray, 1 );

	}

}