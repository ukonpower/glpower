import { IVector3, IVector4, Matrix, Types } from "..";
import { Vector } from "./Vector";

export type Quat = {
	x: number,
	y: number,
	z: number
}

export type EulerOrder = 'XYZ' | 'XZY' | 'ZYX' | 'YZX'

export class Quaternion {

	public x: number;
	public y: number;
	public z: number;
	public w: number;

	constructor( x?: number, y?: number, z?: number, w?: number ) {

		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.w = 1;

		this.set( x, y, z, w );

	}

	public set( x?: number, y?: number, z?: number, w?: number ) {

		this.x = x ?? this.x;
		this.y = y ?? this.y;
		this.z = z ?? this.z;
		this.w = w ?? this.w;

	}

	public setFromEuler( euler: Vector | IVector3, order: EulerOrder = 'XYZ' ) {

		const sx = Math.sin( euler.x / 2 );
		const sy = Math.sin( euler.y / 2 );
		const sz = Math.sin( euler.z / 2 );

		const cx = Math.cos( euler.x / 2 );
		const cy = Math.cos( euler.y / 2 );
		const cz = Math.cos( euler.z / 2 );

		if ( order == 'XYZ' ) {

			this.x = cx * sy * sz + sx * cy * cz;
			this.y = - sx * cy * sz + cx * sy * cz;
			this.z = cx * cy * sz + sx * sy * cz;
			this.w = - sx * sy * sz + cx * cy * cz;

		} else if ( order == 'XZY' ) {

			this.x = - cx * sy * sz + sx * cy * cz;
			this.y = cx * sy * cz - sx * cy * sz;
			this.z = sx * sy * cz + cx * cy * sz;
			this.w = sx * sy * sz + cx * cy * cz;

		} else if ( order == 'YZX' ) {

			this.x = sx * cy * cz + cx * sy * sz;
			this.y = sx * cy * sz + cx * sy * cz;
			this.z = - sx * sy * cz + cx * cy * sz;
			this.w = - sx * sy * sz + cx * cy * cz;

		} else if ( order == 'ZYX' ) {

			this.x = sx * cy * cz - cx * sy * sz;
			this.y = sx * cy * sz + cx * sy * cz;
			this.z = - sx * sy * cz + cx * cy * sz;
			this.w = sx * sy * sz + cx * cy * cz;

		}

		return this;

	}

	// http://marupeke296.sakura.ne.jp/DXG_No58_RotQuaternionTrans.html

	public setFromMatrix( matrix: Matrix ) {

		const elm = matrix.elm;

		// 最大成分を検索
		const elem = [ 0, 0, 0, 0 ]; // 0:x, 1:y, 2:z, 3:w
		elem[ 0 ] = elm[ 0 ] - elm[ 5 ] - elm[ 10 ] + 1.0;
		elem[ 1 ] = - elm[ 0 ] + elm[ 5 ] - elm[ 10 ] + 1.0;
		elem[ 2 ] = - elm[ 0 ] - elm[ 5 ] + elm[ 10 ] + 1.0;
		elem[ 3 ] = elm[ 0 ] + elm[ 5 ] + elm[ 10 ] + 1.0;

		let biggestIndex = 0;
		for ( let i = 1; i < 4; i ++ ) {

			if ( elem[ i ] > elem[ biggestIndex ] )
				biggestIndex = i;

		}

		if ( elem[ biggestIndex ] < 0.0 ) {

			return false; // 引数の行列に間違いあり！

		}

		const v = Math.sqrt( elem[ biggestIndex ] ) * 0.5;

		const mult = 0.25 / v;

		switch ( biggestIndex ) {

			case 0: // x
				this.x = v;
				this.y = ( elm[ 4 ] + elm[ 1 ] ) * mult;
				this.z = ( elm[ 8 ] + elm[ 2 ] ) * mult;
				this.w = ( elm[ 9 ] - elm[ 6 ] ) * mult;
				break;
			case 1: // y
				this.x = ( elm[ 4 ] + elm[ 1 ] ) * mult;
				this.y = v;
				this.z = ( elm[ 9 ] + elm[ 6 ] ) * mult;
				this.w = ( elm[ 8 ] - elm[ 2 ] ) * mult;
				break;
			case 2: // z
				this.x = ( elm[ 8 ] + elm[ 2 ] ) * mult;
				this.y = ( elm[ 9 ] + elm[ 6 ] ) * mult;
				this.z = v;
				this.w = ( elm[ 4 ] - elm[ 1 ] ) * mult;
				break;
			case 3: // w
				this.x = ( elm[ 9 ] - elm[ 6 ] ) * mult;
				this.y = ( elm[ 8 ] - elm[ 2 ] ) * mult;
				this.z = ( elm[ 4 ] - elm[ 1 ] ) * mult;
				this.w = v;
				break;

		}

		return this;

	}

	public multiply( q: Quaternion ) {

		const w = this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z;
		const x = this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y;
		const y = this.w * q.y - this.x * q.z + this.y * q.w + this.z * q.x;
		const z = this.w * q.z + this.x * q.y - this.y * q.x + this.z * q.w;

		this.set( x, y, z, w );

		return this;

	}

	public inverse() {

		this.set( - this.x, - this.y, - this.z, this.w );

		return this;

	}

	public copy( a: Quaternion | Types.Nullable<IVector4> ) {

		this.x = a.x ?? 0;
		this.y = a.y ?? 0;
		this.z = a.z ?? 0;
		this.w = a.w ?? 0;

		return this;

	}

	public clone() {

		return new Quaternion( this.x, this.y, this.z, this.w );

	}

}
