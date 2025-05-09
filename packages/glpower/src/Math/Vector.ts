import { Matrix, Types } from "..";

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

		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.w = 0;

		this.set( x, y, z, w );

	}

	public get isVector() {

		return true;

	}

	public set( x?: number, y?: number, z?: number, w?: number ) {

		this.x = x ?? 0;
		this.y = y ?? 0;
		this.z = z ?? 0;
		this.w = w ?? 0;

		return this;

	}

	public setScalar( value: number ) {

		this.x = value;
		this.y = value;
		this.z = value;
		this.w = value;

		return this;

	}

	public setFromArray( array: number[] ) {

		this.x = array[ 0 ] || 0;
		this.y = array[ 1 ] || 0;
		this.z = array[ 2 ] || 0;
		this.w = array[ 3 ] || 0;

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

	public multiply( a: number ): Vector;

	public multiply( a: Vector ): Vector;

	public multiply( a: number | Vector ) {

		if ( typeof a == 'number' ) {

			this.x *= a;
			this.y *= a;
			this.z *= a;
			this.w *= a;

		} else {

			this.x *= a.x;
			this.y *= a.y;
			this.z *= a.z;
			this.w *= a.w;

		}

		return this;

	}

	public divide( a: number ): Vector;

	public divide( a: Vector ): Vector;

	public divide( a: number | Vector ) {

		if ( typeof a == 'number' ) {

			this.x /= a;
			this.y /= a;
			this.z /= a;
			this.w /= a;

		} else {

			this.x /= a.x;
			this.y /= a.y;
			this.z /= a.z;
			this.w /= a.w;

		}

		return this;

	}

	public length() {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

	}

	public distanceTo( v: Vector | IVector3 ) {

		const dx = this.x - v.x;
		const dy = this.y - v.y;
		const dz = this.z - v.z;

		return Math.sqrt( dx * dx + dy * dy + dz * dz );

	}

	public normalize() {

		const length = this.length() || 1;

		this.x /= length;
		this.y /= length;
		this.z /= length;

		return this;

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

	public applyMatrix3( mat: Matrix ) {

		const elm = mat.elm;

		const e11 = elm[ 0 ], e12 = elm[ 1 ], e13 = elm[ 2 ],
			e21 = elm[ 4 ], e22 = elm[ 5 ], e23 = elm[ 6 ],
			e31 = elm[ 8 ], e32 = elm[ 9 ], e33 = elm[ 10 ];

		// const xx = this.x * e11 + this.y * e12 + this.z * e13;
		// const yy = this.x * e21 + this.y * e22 + this.z * e23;
		// const zz = this.x * e31 + this.y * e32 + this.z * e33;

		const xx = this.x * e11 + this.y * e21 + this.z * e31;
		const yy = this.x * e12 + this.y * e22 + this.z * e32;
		const zz = this.x * e13 + this.y * e23 + this.z * e33;

		this.x = xx;
		this.y = yy;
		this.z = zz;
		this.w = 0;

		return this;

	}

	public applyMatrix4( mat: Matrix ) {

		const elm = mat.elm;

		const e11 = elm[ 0 ], e12 = elm[ 1 ], e13 = elm[ 2 ], e14 = elm[ 3 ],
			e21 = elm[ 4 ], e22 = elm[ 5 ], e23 = elm[ 6 ], e24 = elm[ 7 ],
			e31 = elm[ 8 ], e32 = elm[ 9 ], e33 = elm[ 10 ], e34 = elm[ 11 ],
			e41 = elm[ 12 ], e42 = elm[ 13 ], e43 = elm[ 14 ], e44 = elm[ 15 ];

		const xx = this.x * e11 + this.y * e21 + this.z * e31 + this.w * e41;
		const yy = this.x * e12 + this.y * e22 + this.z * e32 + this.w * e42;
		const zz = this.x * e13 + this.y * e23 + this.z * e33 + this.w * e43;
		const ww = this.x * e14 + this.y * e24 + this.z * e34 + this.w * e44;

		this.x = xx;
		this.y = yy;
		this.z = zz;
		this.w = ww;

		return this;

	}

	public applyMatrix4AsPosition( mat: Matrix ) {

		const tempW = this.w;
		this.w = 1;
		this.applyMatrix4( mat );
		this.w = tempW;
		return this;

	}

	public applyMatrix4AsDirection( mat: Matrix ) {

		const tempW = this.w;
		this.w = 0;
		this.applyMatrix4( mat );
		this.w = tempW;
		return this;

	}

	public floor() {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );
		this.z = Math.floor( this.z );
		this.w = Math.floor( this.w );

	}

	public lerp( b: Vector, t: number ) {

		this.x = this.x + ( b.x - this.x ) * t;
		this.y = this.y + ( b.y - this.y ) * t;
		this.z = this.z + ( b.z - this.z ) * t;
		this.w = this.w + ( b.w - this.w ) * t;

		return this;

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

			return [ this.x, this.y ];

		} else if ( type == 'vec3' ) {

			return [ this.x, this.y, this.z ];

		} else {

			return [ this.x, this.y, this.z, this.w ];

		}

	}

}
