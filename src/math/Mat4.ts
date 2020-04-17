import { Vec3 } from "./Vec3";

export class Mat4 {

	public elm: number[];

	constructor() {

		this.identity();

	}

	public get isMat4() {

		return true;

	}

	public identity() {

		this.elm = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		];

		return this;

	}

	public clone() {

		return new Mat4().copy( this );

	}

	public copy( mat: Mat4 ) {

		this.elm = mat.elm.slice();

		return this;

	}

	public perspective( fov: number, aspect: number, near: number, far: number ) {

		var r = 1 / Math.tan( fov * Math.PI / 360 );
		var d = far - near;

		this.elm = [
			r / aspect, 0, 0, 0,
			0, r, 0, 0,
			0, 0, - ( far + near ) / d, - 1,
			0, 0, - ( far * near * 2 ) / d, 0
		];

		return this;

	}

	public lookAt( eye: Vec3, target: Vec3, up: Vec3 ) {

		let zAxis = eye.clone().sub( target ).normalize();
		let xAxis = up.clone().cross( zAxis ).normalize();
		let yAxis = zAxis.clone().cross( xAxis ).normalize();

		this.elm = [
		   xAxis.x, yAxis.x, zAxis.x, 0,
		   xAxis.y, yAxis.y, zAxis.y, 0,
		   xAxis.z, yAxis.z, zAxis.z, 0,
		   - eye.dot( xAxis ),
		   - eye.dot( yAxis ),
		   - eye.dot( zAxis ),
		   1,
		];

		return this;

	}

	public inverse() {

		let a = this.elm[ 0 ], b = this.elm[ 1 ], c = this.elm[ 2 ], d = this.elm[ 3 ],
			e = this.elm[ 4 ], f = this.elm[ 5 ], g = this.elm[ 6 ], h = this.elm[ 7 ],
			i = this.elm[ 8 ], j = this.elm[ 9 ], k = this.elm[ 10 ], l = this.elm[ 11 ],
			m = this.elm[ 12 ], n = this.elm[ 13 ], o = this.elm[ 14 ], p = this.elm[ 15 ],
			q = a * f - b * e, r = a * g - c * e,
			s = a * h - d * e, t = b * g - c * f,
			u = b * h - d * f, v = c * h - d * g,
			w = i * n - j * m, x = i * o - k * m,
			y = i * p - l * m, z = j * o - k * n,
			A = j * p - l * n, B = k * p - l * o,
			ivd = 1 / ( q * B - r * A + s * z + t * y - u * x + v * w );

		this.elm[ 0 ] = ( f * B - g * A + h * z ) * ivd;
		this.elm[ 1 ] = ( - b * B + c * A - d * z ) * ivd;
		this.elm[ 2 ] = ( n * v - o * u + p * t ) * ivd;
		this.elm[ 3 ] = ( - j * v + k * u - l * t ) * ivd;
		this.elm[ 4 ] = ( - e * B + g * y - h * x ) * ivd;
		this.elm[ 5 ] = ( a * B - c * y + d * x ) * ivd;
		this.elm[ 6 ] = ( - m * v + o * s - p * r ) * ivd;
		this.elm[ 7 ] = ( i * v - k * s + l * r ) * ivd;
		this.elm[ 8 ] = ( e * A - f * y + h * w ) * ivd;
		this.elm[ 9 ] = ( - a * A + b * y - d * w ) * ivd;
		this.elm[ 10 ] = ( m * u - n * s + p * q ) * ivd;
		this.elm[ 11 ] = ( - i * u + j * s - l * q ) * ivd;
		this.elm[ 12 ] = ( - e * z + f * x - g * w ) * ivd;
		this.elm[ 13 ] = ( a * z - b * x + c * w ) * ivd;
		this.elm[ 14 ] = ( - m * t + n * r - o * q ) * ivd;
		this.elm[ 15 ] = ( i * t - j * r + k * q ) * ivd;

		return this;

	}

	public cTransform( pos: Vec3, rot: Vec3, scale: Vec3 ) {

		this.identity();

		//position

		this.matmul( [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			pos.x, pos.y, pos.z, 1
		] );

		//rotation

		let c = Math.cos( rot.x ), s = Math.sin( rot.x );

		this.matmul( [
			1, 0, 0, 0,
			0, c, s, 0,
			0, - s, c, 0,
			0, 0, 0, 1
		] );

		c = Math.cos( rot.y ), s = Math.sin( rot.y );

		this.matmul( [
			c, 0, - s, 0,
			0, 1, 0, 0,
		    s, 0, c, 0,
			0, 0, 0, 1
		] );

		c = Math.cos( rot.z ), s = Math.sin( rot.z );

		this.matmul( [
			c, s, 0, 0,
			- s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		] );

		//scale

		this.matmul( [
			scale.x, 0, 0, 0,
			0, scale.y, 0, 0,
			0, 0, scale.z, 0,
			0, 0, 0, 1
		] );





		return this;

	}

	protected matmul( elm2: number[] ) {

		let dist = new Array( 16 );

		for ( let i = 0; i < 4; i ++ ) {

			for ( let j = 0; j < 4; j ++ ) {

				let sum = 0;

				for ( let k = 0; k < 4; k ++ ) {

					sum += this.elm[ k * 4 + j ] * elm2[ k + i * 4 ];

				}

				dist[ j + i * 4 ] = sum;

			}

		}

		this.elm = dist;

	}

	public multiply( m: Mat4 ) {

		this.matmul( m.elm );

		return this;

	}

	public multiplyScaler( a: number ) {

		for ( let i = 0; i < this.elm.length; i ++ ) {

			this.elm[ i ] *= a;

		}

		return this;

	}

}
