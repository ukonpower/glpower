import { Vector2 } from "./Vector2";


export type Vec3 = {
	x: number,
	y: number,
	z: number
}

export class Vector3 {

	public x: number;
	public y: number;
	public z: number;

	constructor( x?: number, y?: number, z?: number ) {

		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;

	}

	public get isVector3() {

		return true;

	}

	public set( x: number, y: number, z: number ) {

		this.x = x;
		this.y = y;
		this.z = z;

		return this;

	}

	public add( a: Vector3 ): Vector3

	public add( a: number ): Vector3

	public add( a: any ): Vector3 {

		if ( ( a as Vector3 ).isVector3 ) {

			this.x += a.x;
			this.y += a.y;
			this.z += a.z;

		} else if ( typeof ( a ) == 'number' ) {

			this.x += a;
			this.y += a;
			this.z += a;

		}

		return this;

	}

	public sub( a: Vector3 ): Vector3

	public sub( a: number ): Vector3

	public sub( a: any ) {

		if ( ( a as Vector3 ).isVector3 ) {

			this.x -= a.x;
			this.y -= a.y;
			this.z -= a.z;

		} else if ( typeof ( a ) == 'number' ) {

			this.x -= a;
			this.y -= a;
			this.z -= a;

		}

		return this;

	}

	public multiply( a: number ) {

		this.x *= a;
		this.y *= a;
		this.z *= a;

		return this;

	}

	public divide( a: number ) {

		this.x /= a;
		this.y /= a;
		this.z /= a;

		return this;

	}

	public length() {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

	}

	public normalize() {

		return this.divide( this.length() || 1 );

	}

	public cross( v: Vector3 ) {

		const ax = this.x, ay = this.y, az = this.z;
		const bx = v.x, by = v.y, bz = v.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;

	}

	public dot( v: Vector3 ) {

		return this.x * v.x + this.y * v.y + this.z * v.z;

	}

	public copy( a: Vector2 | Vector3 ) {

		this.x = a.x;
		this.y = a.y;
		this.z = ( a as any ).z || 0;

		return this;

	}

	public clone() {

		return new Vector3( this.x, this.y, this.z );

	}

	public get elm() {

		return [ this.x, this.y, this.z ];

	}

}
