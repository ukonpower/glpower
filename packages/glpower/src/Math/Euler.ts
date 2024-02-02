import { Types } from "../types";

import { Matrix } from "./Matrix";
import { Quaternion } from "./Quaternion";
import { IVector4, Vector } from "./Vector";

export type EulerOrder = 'XYZ' | 'XZY' | 'ZYX' | 'YZX'

export class Euler extends Vector {

	public order: EulerOrder;

	constructor( x?: number | undefined, y?: number | undefined, z?: number | undefined, order?: EulerOrder ) {

		super( x, y, z, 0 );

		this.order = order || 'XYZ';

	}

	public copy( a: Vector | Types.Nullable<IVector4> | Euler ): this {

		if ( "order" in a ) {

			this.order = a.order;

		}

		return super.copy( a );

	}

	public setFromQuaternion( q: Quaternion ) {

		this.order = "XYZ";

		this.y = Math.asin( 2 * q.x * q.z + 2 * q.y * q.w );

		if ( Math.cos( this.y ) != 0.0 ) {

			this.x = Math.atan( - ( 2 * q.y * q.z - 2 * q.x * q.w ) / ( 2 * q.w * q.w + 2 * q.z * q.z - 1 ) );
			this.z = Math.atan( - ( 2 * q.x * q.y - 2 * q.z * q.w ) / ( 2 * q.w * q.w + 2 * q.x * q.x - 1 ) );

		} else {

			this.x = Math.atan( ( 2 * q.y * q.z + 2 * q.x * q.w ) / ( 2 * q.w * q.w + 2 * q.y * q.y - 1 ) );
			this.z = 0;

		}

		return this;

	}

}
