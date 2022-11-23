import EventEmitter from 'wolfy87-eventemitter';
import { Vector2 } from '../Math/Vector2';
import { Vector3 } from '../Math/Vector3';
import { FCurveGroup } from './FCurveGroup';

export type AnimationFrameInfo = {
	start: number
	end: number
	duration: number
}

export class AnimationAction extends EventEmitter {

	public name: string;
	public curves: {[key:string]:FCurveGroup} = {};
	private uniforms: any;

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

	public getUniforms<T extends Vector2 | Vector3 | number>( propertyName: string ): any | null {

		if ( this.uniforms[ propertyName ] ) {

			return this.uniforms[ propertyName ];

		}

		const curveGroup = this.getFCurveGroup( propertyName );

		if ( curveGroup ) {

			const uni = {
				value: curveGroup.createInitValue() as T
			};

			this.uniforms[ propertyName ] = uni;

			return uni;

		}

		return null;

	}

	public getValue<T extends Vector2 | Vector3 | number>( propertyName: string ): T | null;

	public getValue<T extends Vector2 | Vector3 >( propertyName: string, target: T ): T;

	public getValue( propertyName: string, target?: Vector2 | Vector3 ): Vector2 | Vector3 | number | null {

		const uniform = this.getUniforms( propertyName );

		if ( ! uniform ) return target || null;

		const value = uniform.value;

		if ( ! target ) return value;

		if ( typeof value == 'number' ) {

			target.x = value;

			return target;

		}

		target.x = value.x;
		target.y = value.y;

		if ( 'z' in target && 'z' in value ) {

			target.z = value.z;

		}

		// if ( 'w' in target && 'w' in value ) {

		// 	target.w = value.w;

		// }

		return target || null;

	}

	public getValueAt<T extends number>( propertyName: string, frame: number ): T | null;

	public getValueAt<T extends Vector2 | Vector3 >( propertyName: string, frame: number, target: T ): T;

	public getValueAt( propertyName: string, frame: number, target?: Vector2 | Vector3 ): Vector2 | Vector3 | number | null {

		const curve = this.getFCurveGroup( propertyName );

		if ( target ) {

			if ( ! curve ) return target;

			return curve.getValue( frame || 0, target );

		} else {

			if ( ! curve ) return null;

			return curve.getValue( frame );

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

			if ( typeof uni.value == 'number' ) {

				uni.value = fcurveGroup.getValue( frame ) || 0;

			} else {

				fcurveGroup.getValue( frame, uni.value );

			}

		}

		this.emitEvent( 'update', [ this ] );

	}

}
