import EventEmitter from 'wolfy87-eventemitter';
import { Types } from '..';
import { IVector4 } from '../Math/Vector';
import { FCurve } from './FCurve';

export class FCurveGroup extends EventEmitter {

	public name: string;

	private curves: Map<Types.RecommendString<Types.Axis>, FCurve>

	public frameStart: number;
	public frameEnd: number;
	public frameDuration: number;

	constructor( name?: string, x?: FCurve, y?: FCurve, z?: FCurve, w?: FCurve ) {

		super();

		this.name = name || '';

		this.frameStart = 0;
		this.frameEnd = 0;
		this.frameDuration = 0;

		this.curves = new Map();

		if ( x ) this.setFCurve( x, 'x' );
		if ( y ) this.setFCurve( y, 'y' );
		if ( z ) this.setFCurve( z, 'z' );
		if ( w ) this.setFCurve( w, 'w' );

	}

	public setFCurve( curve: FCurve, axis: Types.RecommendString<Types.Axis> ) {

		this.curves.set( axis, curve );

		let minStart = Infinity;
		let maxEnd = - Infinity;

		this.curves.forEach( curve => {

			if ( curve.frameStart < minStart ) {

				minStart = curve.frameStart;

			}

			if ( curve.frameEnd > maxEnd ) {

				maxEnd = curve.frameEnd;

			}

		} );

		if ( minStart == - Infinity || maxEnd == Infinity ) {

			minStart = 0;
			maxEnd = 1;

		}

		this.frameStart = minStart;
		this.frameEnd = maxEnd;
		this.frameDuration = this.frameEnd - this.frameStart;

	}


	public getValue( frame: number ): IVector4 | null;

	public getValue<T extends Types.Nullable<IVector4>>( frame: number, target: T ): T;

	public getValue<T extends Types.Nullable<IVector4>>( frame: number, target?: T ): T | IVector4 | null {

		const x = this.curves.get( 'x' );
		const y = this.curves.get( 'y' );
		const z = this.curves.get( 'z' );
		const w = this.curves.get( 'w' );

		if ( target ) {

			if ( x ) target.x = x.getValue( frame );
			if ( y ) target.y = y.getValue( frame );
			if ( z ) target.z = z.getValue( frame );
			if ( w ) target.w = w.getValue( frame );

			return target;

		}

		return {
			x: x ? x.getValue( frame ) : 0,
			y: y ? y.getValue( frame ) : 0,
			z: z ? z.getValue( frame ) : 0,
			w: w ? w.getValue( frame ) : 0,
		};

	}

}
