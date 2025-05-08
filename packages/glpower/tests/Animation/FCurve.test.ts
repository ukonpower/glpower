/* eslint no-undef: 0 */
import { FCurve } from '../../src/Animation/FCurve';
import { FCurveKeyFrame } from '../../src/Animation/FCurveKeyFrame';

describe( 'FCurve', () => {

	describe( 'Initialization', () => {

		it( 'should initialize with empty keyframes', () => {

			const curve = new FCurve();

			expect( curve.keyframes ).toHaveLength( 0 );
			expect( curve.frameStart ).toBe( 0 );
			expect( curve.frameEnd ).toBe( 0 );
			expect( curve.frameDuration ).toBe( 0 );

		} );

		it( 'should initialize with provided keyframes', () => {

			const keyframes = [
				new FCurveKeyFrame( { x: 0, y: 0 } ),
				new FCurveKeyFrame( { x: 1, y: 1 } ),
				new FCurveKeyFrame( { x: 2, y: 0 } )
			];

			const curve = new FCurve( keyframes );

			expect( curve.keyframes ).toHaveLength( 3 );
			expect( curve.frameStart ).toBe( 0 );
			expect( curve.frameEnd ).toBe( 2 );

		} );

	} );

	describe( 'Keyframe Management', () => {

		let curve: FCurve;

		beforeEach( () => {

			curve = new FCurve();

		} );

		it( 'should add keyframes in correct order', () => {

			curve.addKeyFrame( new FCurveKeyFrame( { x: 2, y: 0 } ) );
			curve.addKeyFrame( new FCurveKeyFrame( { x: 0, y: 0 } ) );
			curve.addKeyFrame( new FCurveKeyFrame( { x: 1, y: 1 } ) );

			expect( curve.keyframes ).toHaveLength( 3 );
			expect( curve.keyframes[ 0 ].coordinate.x ).toBe( 0 );
			expect( curve.keyframes[ 1 ].coordinate.x ).toBe( 1 );
			expect( curve.keyframes[ 2 ].coordinate.x ).toBe( 2 );

		} );

		it( 'should update frame info when adding keyframes', () => {

			curve.addKeyFrame( new FCurveKeyFrame( { x: 1, y: 1 } ) );
			expect( curve.frameStart ).toBe( 1 );
			expect( curve.frameEnd ).toBe( 1 );

			curve.addKeyFrame( new FCurveKeyFrame( { x: 0, y: 0 } ) );
			expect( curve.frameStart ).toBe( 0 );
			expect( curve.frameEnd ).toBe( 1 );

			curve.addKeyFrame( new FCurveKeyFrame( { x: 2, y: 0 } ) );
			expect( curve.frameStart ).toBe( 0 );
			expect( curve.frameEnd ).toBe( 2 );

		} );

		it( 'should set multiple keyframes at once', () => {

			const keyframes = [
				new FCurveKeyFrame( { x: 0, y: 0 } ),
				new FCurveKeyFrame( { x: 1, y: 1 } )
			];

			curve.set( keyframes );

			expect( curve.keyframes ).toHaveLength( 2 );
			expect( curve.frameStart ).toBe( 0 );
			expect( curve.frameEnd ).toBe( 1 );

		} );

	} );

	describe( 'Value Interpolation', () => {

		let curve: FCurve;

		beforeEach( () => {

			curve = new FCurve( [
				new FCurveKeyFrame( { x: 0, y: 0 } ),
				new FCurveKeyFrame( { x: 1, y: 1 } ),
				new FCurveKeyFrame( { x: 2, y: 0 } )
			] );

		} );

		it( 'should interpolate between keyframes', () => {

			expect( curve.getValue( 0 ) ).toBe( 0 );
			expect( curve.getValue( 0.5 ) ).toBeCloseTo( 0.5 );
			expect( curve.getValue( 1 ) ).toBe( 1 );
			expect( curve.getValue( 1.5 ) ).toBeCloseTo( 0.5 );
			expect( curve.getValue( 2 ) ).toBe( 0 );

		} );

		it( 'should handle values before first keyframe', () => {

			expect( curve.getValue( - 1 ) ).toBe( 0 );

		} );

		it( 'should handle values after last keyframe', () => {

			expect( curve.getValue( 3 ) ).toBe( 0 );

		} );

		it( 'should cache computed values', () => {

			const value1 = curve.getValue( 0.5 );
			const value2 = curve.getValue( 0.5 );

			expect( value1 ).toBe( value2 );

		} );

	} );

	describe( 'Edge Cases', () => {

		it( 'should handle empty curve', () => {

			const curve = new FCurve();
			expect( curve.getValue( 0 ) ).toBe( 0 );
			expect( curve.getValue( 1 ) ).toBe( 0 );

		} );

		it( 'should handle single keyframe', () => {

			const curve = new FCurve( [
				new FCurveKeyFrame( { x: 1, y: 2 } )
			] );

			expect( curve.getValue( 0 ) ).toBe( 2 );
			expect( curve.getValue( 1 ) ).toBe( 2 );
			expect( curve.getValue( 2 ) ).toBe( 2 );

		} );

		it( 'should handle different interpolation types', () => {

			const curve = new FCurve( [
				new FCurveKeyFrame( { x: 0, y: 0 }, undefined, undefined, 'LINEAR' ),
				new FCurveKeyFrame( { x: 1, y: 1 }, undefined, undefined, 'CONSTANT' ),
				new FCurveKeyFrame( { x: 2, y: 2 } )
			] );

			// LINEAR補間区間
			expect( curve.getValue( 0.5 ) ).toBeCloseTo( 0.5 );

			// CONSTANT補間区間
			expect( curve.getValue( 1.5 ) ).toBe( 1 );

		} );

	} );

} );
