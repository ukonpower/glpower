import EventEmitter from 'wolfy87-eventemitter';
import { Types } from '..';
import { IVector4, Vector } from '../Math/Vector';
import { FCurveGroup } from './FCurveGroup';

export type AnimationFrameInfo = {
	start: number
	end: number
	duration: number
}

export class AnimationAction extends EventEmitter {

	public name: string;
	public curves: {[key:string]:FCurveGroup} = {};
	private uniforms: {[key: string]: { value: Types.Nullable<IVector4>}};

	public frame: AnimationFrameInfo;

	constructor( name?: string ) {

		super();

		this.name = name || '';
		this.uniforms = {};

		this.frame = {
			start: 0,
			end: 0,
			duration: 0,
		};

	}

	public addFcurveGroup( propertyName: string, fcurveGroup: FCurveGroup ) {

		this.curves[ propertyName ] = fcurveGroup;

		this.calcFrame();

	}

	public removeFCurve( propertyName: string ) {

		delete this.curves[ propertyName ];

		this.calcFrame();

	}

	private calcFrame() {

		const curveKeys = Object.keys( this.curves );

		let minStart = Infinity;
		let maxEnd = - Infinity;

		for ( let i = 0; i < curveKeys.length; i ++ ) {

			const curve = ( this.curves )[ curveKeys[ i ] ];

			if ( curve.frameStart < minStart ) {

				minStart = curve.frameStart;

			}

			if ( curve.frameEnd > maxEnd ) {

				maxEnd = curve.frameEnd;

			}

		}

		if ( minStart == - Infinity || maxEnd == Infinity ) {

			minStart = 0;
			maxEnd = 1;

		}

		this.frame.start = minStart;
		this.frame.end = maxEnd;
		this.frame.duration = this.frame.end - this.frame.start;

	}

	public getFCurveGroup( propertyName: string ): FCurveGroup | null {

		return this.curves[ propertyName ] || null;

	}

	/*-------------------------------
		get values
	-------------------------------*/

	public assignUniforms( propertyName: string, uniform: any ) {

		this.uniforms[ propertyName ] = uniform;

	}

	public getUniforms( propertyName: string ): Types.Uniform<Types.Nullable<IVector4>> | null {

		if ( this.uniforms[ propertyName ] ) {

			return this.uniforms[ propertyName ];

		}

		const curveGroup = this.getFCurveGroup( propertyName );

		if ( curveGroup ) {

			const uni: Types.Uniform<Types.Nullable<IVector4>> = {
				value: {}
			};

			this.uniforms[ propertyName ] = uni;

			return uni;

		}

		return null;

	}

	public getValue( accessor: string ): Types.Nullable<IVector4> | null;

	public getValue<T extends Types.Nullable<IVector4>>( accessor: string, target: T ): T;

	public getValue<T extends Types.Nullable<IVector4>>( accessor: string, target?: T ): Types.Nullable<IVector4> | null {

		const uniform = this.getUniforms( accessor );

		if ( ! uniform ) return target || null;

		const value = uniform.value;

		if ( ! target ) return value;

		target.x = value.x ?? target.x;
		target.y = value.y ?? target.y;
		target.z = value.z ?? target.z;
		target.w = value.w ?? target.w;

		return target;

	}

	public getValueAt<T extends number>( propertyName: string, frame: number ): T | null;

	public getValueAt<T extends Vector | IVector4 >( propertyName: string, frame: number, target: T ): T;

	public getValueAt( propertyName: string, frame: number, target?: Vector | IVector4 ): Vector | IVector4 | null {

		const curveGroup = this.getFCurveGroup( propertyName );

		if ( target ) {

			if ( ! curveGroup ) return target;

			return curveGroup.getValue( frame || 0, target );

		} else {

			if ( ! curveGroup ) return null;

			return curveGroup.getValue( frame );

		}

	}

	/*-------------------------------
		UpdateFrame
	-------------------------------*/

	public updateFrame( frame: number ) {

		const curveKeys = Object.keys( this.curves );

		for ( let i = 0; i < curveKeys.length; i ++ ) {

			const fcurveGroup = this.curves[ curveKeys[ i ] ];
			const uni = this.getUniforms( curveKeys[ i ] );

			if ( ! uni ) continue;

			fcurveGroup.getValue( frame, uni.value );

		}

		this.emitEvent( 'update', [ this ] );

	}

}
