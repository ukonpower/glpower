import { Types } from "..";

export type IVector2 = {
	x: number,
	y: number,
}

export type IVector3 = IVector2 & {
	z: number,
}

export type IVector4 = IVector3 & {
	w: number,
}

export class Vector {

	public x: number;
	public y: number;
	public z: number;
	public w: number;

	constructor( x?: number, y?: number, z?: number, w?: number ) {

		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		this.w = w || 0;

	}

	public get isVector() {

		return true;

	}

	public set( x: number, y?: number, z?: number, w?: number ) {

		this.x = x;
		this.y = y ?? this.y;
		this.z = z ?? this.z;
		this.w = w ?? this.w;

		return this;

	}

	public add( a: number ): Vector

	public add( a: Vector | Types.Nullable<IVector4> ): Vector

	public add( a: Vector | Types.Nullable<IVector4> | number ): Vector {

		if ( typeof a == 'number' ) {

			this.x += a;
			this.y += a;
			this.z += a;
			this.w += a;

		} else {

			this.x += a.x ?? 0;
			this.y += a.y ?? 0;
			this.z += a.z ?? 0;
			this.w += a.w ?? 0;

		}

		return this;

	}

	public sub( a: number ): Vector

	public sub( a: Vector | Types.Nullable<IVector4> ): Vector

	public sub( a: Vector | Types.Nullable<IVector4> | number ) {

		if ( typeof ( a ) == 'number' ) {

			this.x -= a;
			this.y -= a;
			this.z -= a;

		} else {

			this.x -= a.x ?? 0;
			this.y -= a.y ?? 0;
			this.z -= a.z ?? 0;
			this.w -= a.w ?? 0;

		}

		return this;

	}

	public multiply( a: number ) {

		this.x *= a;
		this.y *= a;
		this.z *= a;
		this.w *= a;

		return this;

	}

	public divide( a: number ) {

		this.x /= a;
		this.y /= a;
		this.z /= a;
		this.w /= a;

		return this;

	}

	public length() {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );

	}

	public normalize() {

		return this.divide( this.length() || 1 );

	}

	public cross( v: Vector | IVector3 ) {

		const ax = this.x, ay = this.y, az = this.z;
		const bx = v.x, by = v.y, bz = v.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;

	}

	public dot( v: Vector | IVector3 ) {

		return this.x * v.x + this.y * v.y + this.z * v.z;

	}

	public copy( a: Vector | Types.Nullable<IVector4> ) {

		this.x = a.x ?? 0;
		this.y = a.y ?? 0;
		this.z = a.z ?? 0;
		this.w = a.w ?? 0;

		return this;

	}

	public clone() {

		return new Vector( this.x, this.y, this.z, this.w );

	}

	public getElm( type?: 'vec2' | 'vec3' | 'vec4' ) {

		if ( type == 'vec2' ) {

			return [ this.x, this.y, this.z ];

		} else if ( type == 'vec3' ) {

			return [ this.x, this.y, this.z ];

		} else {

			return [ this.x, this.y, this.z, this.w ];

		}

	}

}
