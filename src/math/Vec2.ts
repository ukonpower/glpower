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

	public multiply( a: number ) {

		this.x *= a;
		this.y *= a;

		return this;

	}

	public devide( a: number ) {

		this.x /= a;
		this.y /= a;

		return this;

	}

}
