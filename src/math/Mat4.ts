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

		return this;

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

		let a = this.element[0],  b = this.element[1],  c = this.element[2],  d = this.element[3],
			e = this.element[4],  f = this.element[5],  g = this.element[6],  h = this.element[7],
			i = this.element[8],  j = this.element[9],  k = this.element[10], l = this.element[11],
			m = this.element[12], n = this.element[13], o = this.element[14], p = this.element[15],
			q = a * f - b * e, r = a * g - c * e,
			s = a * h - d * e, t = b * g - c * f,
			u = b * h - d * f, v = c * h - d * g,
			w = i * n - j * m, x = i * o - k * m,
			y = i * p - l * m, z = j * o - k * n,
			A = j * p - l * n, B = k * p - l * o,
			ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);

		this.element[0]  = ( f * B - g * A + h * z) * ivd;
		this.element[1]  = (-b * B + c * A - d * z) * ivd;
		this.element[2]  = ( n * v - o * u + p * t) * ivd;
		this.element[3]  = (-j * v + k * u - l * t) * ivd;
		this.element[4]  = (-e * B + g * y - h * x) * ivd;
		this.element[5]  = ( a * B - c * y + d * x) * ivd;
		this.element[6]  = (-m * v + o * s - p * r) * ivd;
		this.element[7]  = ( i * v - k * s + l * r) * ivd;
		this.element[8]  = ( e * A - f * y + h * w) * ivd;
		this.element[9]  = (-a * A + b * y - d * w) * ivd;
		this.element[10] = ( m * u - n * s + p * q) * ivd;
		this.element[11] = (-i * u + j * s - l * q) * ivd;
		this.element[12] = (-e * z + f * x - g * w) * ivd;
		this.element[13] = ( a * z - b * x + c * w) * ivd;
		this.element[14] = (-m * t + n * r - o * q) * ivd;
		this.element[15] = ( i * t - j * r + k * q) * ivd;

		return this;
		
	}

	public createTransformMatrix( pos: Vec3, rot: Vec3, scale: Vec3 ){

		this.identity();

		//position

		this.matmul([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			pos.x, pos.y, pos.z, 1
		])

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