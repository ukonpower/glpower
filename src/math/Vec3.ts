export class Vec3 {

	public x: number;
	public y: number;
	public z: number;

	constructor( x?: number, y?: number, z?: number ) {

		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;

	}

	public get isVec3() {

		return true;

	}

	public clone() {

		return new Vec3( this.x, this.y, this.z );

	}

	public set( x: number, y: number, z: number ) {

		this.x = x;
		this.y = y;
		this.z = z;

		return this;

	}

	public add( a: Vec3 ): Vec3

	public add( a: number ): Vec3

	public add( a: any ): Vec3 {

		if ( ( a as Vec3 ).isVec3 ) {

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

	public sub( a: Vec3 ): Vec3

	public sub( a: number ): Vec3

	public sub( a: any ) {

		if ( ( a as Vec3 ).isVec3 ) {

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

	public cross( v: Vec3 ) {

		let ax = this.x, ay = this.y, az = this.z;
		let bx = v.x, by = v.y, bz = v.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;

	}

	public dot( v: Vec3 ) {

		return this.x * v.x + this.y * v.y + this.z * v.z;

	}

}
