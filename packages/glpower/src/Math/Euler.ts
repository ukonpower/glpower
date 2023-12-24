import { Types } from "../types";
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

}
