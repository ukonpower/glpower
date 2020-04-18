import { Vec3 } from "./Vec3";

export class Vec2 {

	public x: number;
	public y: number;
	public z: number;

	constructor( x?: number, y?: number, z?: number ) {

		this.x = x || 0;
		this.y = y || 0;

	}

	public get isVec2() {

		return true;

	}

	public set( x: number, y: number ) {

		this.x = x;
		this.y = y;

		return this;

	}

	public add( a: Vec2 )

	public add( a: number )

	public add( a: any ) {

		if ( ( a as Vec2 ).isVec2 ) {

			this.x += a.x;
			this.y += a.y;

		} else if ( typeof ( a ) == 'number' ) {

			this.x += a;
			this.y += a;

		}

		return this;

	}

	public sub( a: Vec2 )

	public sub( a: number )

	public sub( a: any ) {

		if ( ( a as Vec2 ).isVec2 ) {

			this.x -= a.x;
			this.y -= a.y;

		} else if ( typeof ( a ) == 'number' ) {

			this.x -= a;
			this.y -= a;

		}

		return this;

	}

	public multiply( a: number | Vec2 ) {

		this.x *= ( a as Vec2 ).x | ( a as number );
		this.y *= ( a as Vec2 ).y | ( a as number );


		return this;

	}

	public divide( a: number | Vec2 ) {

		this.x /= ( a as Vec2 ).x | ( a as number );
		this.y /= ( a as Vec2 ).y | ( a as number );

		return this;

	}

	public copy( a: Vec2 | Vec3 ) {

		this.x = a.x;
		this.y = a.y;

		return this;

	}

	public clone() {

		return new Vec2( this.x, this.y );

	}

}
