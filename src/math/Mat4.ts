import { Vec3 } from "./Vec3";

export class Mat4{

	public element: number[];

	constructor(){
		
		this.identity();
		
	}

	public get isMat4(){

		return true;

	}

	public identity(){

		this.element = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		]

	}

	public clone(){

		return new Mat4().copy( this );

	}

	public copy( mat: Mat4 ){

		this.element = mat.element.slice();

		return this;

	}

	public perspective( fov: number, aspect: number, near: number, far: number ){

		var r = 1 / Math.tan(fov * Math.PI / 360);
        var d = far - near;
		
		this.element = [
			r / aspect, 0, 0, 0,
			0, r, 0, 0,
			0, 0, -(far + near) / d, -1,
			0, 0,  -(far * near * 2) / d, 0
		]

		return this;

	}

	public lookAt( eye: Vec3, target: Vec3, up: Vec3 ){
		
		let zAxis = eye.clone().sub( target ).normalize();
		let xAxis = up.clone().cross( zAxis ).normalize();
		let yAxis = zAxis.clone().cross( xAxis ).normalize();
		
		this.element = [
		   xAxis.x, yAxis.x, zAxis.x, 0,
		   xAxis.y, yAxis.y, zAxis.y, 0,
		   xAxis.z, yAxis.z, zAxis.z, 0,
		   -eye.dot( xAxis ),
		   -eye.dot( yAxis ),
		   -eye.dot( zAxis ),
		   1,
		];

		return this;
		
	}

	public inverse(){

		
	}

	public createTransformMatrix( pos: Vec3, rot: Vec3, scale: Vec3 ){

		this.identity();

		//rotation

		let c = Math.cos( rot.x ), s = Math.sin( rot.x );

		this.matmul([
			1, 0, 0, 0,
			0, c, s, 0,
			0, -s, c, 0,
			0, 0, 0, 1
		])

		c = Math.cos( rot.y ), s = Math.sin( rot.y );

		this.matmul([
			c, 0, -s, 0,
			0, 1, 0, 0,
		    s, 0, c, 0,
			0, 0, 0, 1
		])

		c = Math.cos( rot.z ), s = Math.sin( rot.z );

		this.matmul([
			c, s, 0, 0,
			-s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		])

		//position
		
		this.matmul([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			pos.x, pos.y, pos.z, 1
		])

		//scale

		this.matmul([
			scale.x, 0, 0, 0,
			0, scale.y, 0, 0,
			0, 0, scale.z, 0,
			0, 0, 0, 1	
		])

		return this;

	}

	protected matmul( elm2: number[] ){

		let dist = new Array( 16 );

		for( let i = 0; i < 4; i++ ){

			for( let j = 0; j < 4; j++ ){

				let sum  = 0;

				for( let k = 0; k < 4; k++ ){
					
					sum += this.element[k * 4 + j] * elm2[k + i * 4];
					
				}

				dist[j + i * 4] = sum;

			}
			
		}

		this.element = dist;

	}
	
	public multiply( m: Mat4 ){
		
		this.matmul( m.element );

		return this;

	}

	public multiplyScaler( a: number ){

		for( let i = 0; i < this.element.length; i++ ){

			this.element[i] *= a;

		}

		return this;

	}
	
}