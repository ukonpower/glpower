export class Vec3{

	public x: number;
	public y: number;
	public z: number;

	constructor( x?: number, y?: number, z?: number ){

		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;

	}

	public get isVec3(){
		
		return true;
		
	}

	public add( a: Vec3 )
	
	public add( a: number )

	public add( a: any ){

		if( ( a as Vec3 ).isVec3 ){

			this.x += a.x;
			this.y += a.y;
			this.z += a.z;

		}else if( typeof( a ) == 'number' ){

			this.x += a;
			this.y += a;
			this.z += a;

		}

		return this;
		
	}

	public sub( a: Vec3 )
	
	public sub( a: number )

	public sub( a: any ){

		if( ( a as Vec3 ).isVec3 ){

			this.x -= a.x;
			this.y -= a.y;
			this.z -= a.z;

		}else if( typeof( a ) == 'number' ){

			this.x -= a;
			this.y -= a;
			this.z -= a;

		}

		return this;
		
	}

	public multiply( a: Vec3 )
	
	public multiply( a: number )

	public multiply( a: any ){

		if( ( a as Vec3 ).isVec3 ){

			this.x *= a.x;
			this.y *= a.y;
			this.z *= a.z;

		}else if( typeof( a ) == 'number' ){

			this.x *= a;
			this.y *= a;
			this.z *= a;

		}

		return this;
		
	}
	
}