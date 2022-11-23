import { Vec3, Vector3 } from "./Vector3";

export type Vec2 = {
	x: number,
	y: number,
}

export class Vector2 {

	public x: number;
	public y: number;

	constructor( x?: number, y?: number ) {

		this.x = x || 0;
		this.y = y || 0;

	}

	public get isVector2() {

		return true;

	}

	public set( x: number, y: number ) {

		this.x = x;
		this.y = y;

		return this;

	}

	public add( a: Vector2 | Vec2 ): Vector2

	public add( a: number ): Vector2

	public add( a: any ): Vector2 {

		if ( ( a as Vector2 ).isVector2 ) {

			this.x += a.x;
			this.y += a.y;

		} else if ( typeof ( a ) == 'number' ) {

			this.x += a;
			this.y += a;

		}

		return this;

	}

	public sub( a: Vector2 | Vec2 ): Vector2

	public sub( a: number ): Vector2

	public sub( a: any ): Vector2 {

		if ( ( a as Vector2 ).isVector2 ) {

			this.x -= a.x;
			this.y -= a.y;

		} else if ( typeof ( a ) == 'number' ) {

			this.x -= a;
			this.y -= a;

		}

		return this;

	}

	public multiply( a: number | Vector2 | Vec2 ) {

		this.x *= ( a as Vector2 ).x | ( a as number );
		this.y *= ( a as Vector2 ).y | ( a as number );


		return this;

	}

	public divide( a: number | Vector2 | Vec2 ) {

		this.x /= ( a as Vector2 ).x | ( a as number );
		this.y /= ( a as Vector2 ).y | ( a as number );

		return this;

	}

	public copy( a: Vector2 | Vec2 | Vector3 | Vec3 ) {

		this.x = a.x;
		this.y = a.y;

		return this;

	}

	public clone() {

		return new Vector2( this.x, this.y );

	}

	public get elm() {

		return [ this.x, this.y ];

	}

}
