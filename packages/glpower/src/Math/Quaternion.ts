import { IVector3 } from "..";
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

	constructor() {

		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.w = 1;

	}

	public euler( euler: Vector | IVector3, order: EulerOrder = 'XYZ' ) {

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

	public multiply() {
	}

}
