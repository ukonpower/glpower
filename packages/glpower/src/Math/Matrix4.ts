import { Quaternion } from "./Quaternion";
import { Vec3, Vector3 } from "./Vector3";
import { Vec4 } from "./Vector4";

export class Matrix4 {

	public elm: number[];

	constructor( elm?: number [] ) {

		this.elm = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		];

		if ( elm ) {

			this.set( elm );

		}

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

		return new Matrix4().copy( this );

	}

	public copy( mat: Matrix4 ) {

		this.set( mat.elm );

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

	public lookAt( eye: Vector3, target: Vector3, up: Vector3 ) {

		const zAxis = eye.clone().sub( target ).normalize();
		const xAxis = up.clone().cross( zAxis ).normalize();
		const yAxis = zAxis.clone().cross( xAxis ).normalize();

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

		const a = this.elm[ 0 ], b = this.elm[ 1 ], c = this.elm[ 2 ], d = this.elm[ 3 ],
			e = this.elm[ 4 ], f = this.elm[ 5 ], g = this.elm[ 6 ], h = this.elm[ 7 ],
			i = this.elm[ 8 ], j = this.elm[ 9 ], k = this.elm[ 10 ], l = this.elm[ 11 ],
			m = this.elm[ 12 ], n = this.elm[ 13 ], o = this.elm[ 14 ], p = this.elm[ 15 ],
			q = a * f - b * e, r = a * g - c * e,
			s = a * h - d * e, t = b * g - c * f,
			u = b * h - d * f, v = c * h - d * g,
			w = i * n - j * m, x = i * o - k * m,
			y = i * p - l * m, z = j * o - k * n,
			A = j * p - l * n, B = k * p - l * o,
			det = ( q * B - r * A + s * z + t * y - u * x + v * w ),
			ivd = 1 / det;

		if ( det == 0 ) return this.identity();

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

	public set( elm: number[] ) {

		for ( let i = 0; i < this.elm.length; i ++ ) {

			this.elm[ i ] = elm[ i ] ?? 0;

		}

		return this;

	}

	public setFromTransform( pos: Vector3 | Vec3, qua: Quaternion | Vec4, scale: Vector3 | Vec3 ) {

		this.identity();

		this.applyPosition( pos );

		this.applyQuaternion( qua );

		this.applyScale( scale );

		return this;

	}

	public decompose( pos?: Vec3, rot?: Vec3, scale?: Vec3 ) {

		if ( pos ) {

			pos.x = this.elm[ 12 ];
			pos.y = this.elm[ 13 ];
			pos.z = this.elm[ 14 ];

		}

	}

	public applyPosition( position: Vec3 ) {

		this.matmul( [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			position.x, position.y, position.z, 1
		] );

		return this;

	}

	public applyQuaternion( q: Quaternion | Vec4 ) {

		const x = q.x, y = q.y, z = q.z, w = q.w;
		const xx = 2 * x * x, yy = 2 * y * y, zz = 2 * z * z;
		const xy = 2 * x * y, xz = 2 * x * z, xw = 2 * x * w;
		const yz = 2 * y * z, yw = 2 * y * w;
		const zw = 2 * z * w;

		this.matmul( [
			1 - yy - zz,
			xy + zw,
			xz + yw,
			0,

			xy - zw,
			1 - xx - zz,
			yz + xw,
			0,

			xz + yw,
			yz - xw,
			1.0 - xx - yy,
			0,

			0,
			0,
			0,
			1,
		] );

		return this;

	}

	public applyScale( scale: Vec3 ) {

		this.matmul( [
			scale.x, 0, 0, 0,
			0, scale.y, 0, 0,
			0, 0, scale.z, 0,
			0, 0, 0, 1
		] );

		return this;

	}

	protected matmul( elm2: number[] ) {

		const dist = new Array( 16 );

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

	public multiply( m: Matrix4 ) {

		this.matmul( m.elm );

		return this;

	}

	public preMultiply( m: Matrix4 ) {

		const tmp = this.copyToArray( [] );

		this.set( m.elm );

		this.matmul( tmp );

		return this;

	}

	public copyToArray( array: number[] ) {

		array.length = this.elm.length;

		for ( let i = 0; i < this.elm.length; i ++ ) {

			array[ i ] = this.elm[ i ];

		}

		return array;

	}


}
