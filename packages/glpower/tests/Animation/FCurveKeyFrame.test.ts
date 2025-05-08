/* eslint no-undef: 0 */
import { FCurveKeyFrame } from '../../src/Animation/FCurveKeyFrame';

describe( 'FCurveKeyFrame', () => {

	describe( 'Initialization', () => {

		it( 'should initialize with default values', () => {

			const keyframe = new FCurveKeyFrame( { x: 1, y: 2 } );

			expect( keyframe.coordinate ).toEqual( { x: 1, y: 2 } );
			expect( keyframe.handleLeft ).toEqual( { x: 1, y: 2 } );
			expect( keyframe.handleRight ).toEqual( { x: 1, y: 2 } );
			expect( keyframe.interpolation ).toBe( 'BEZIER' );

		} );

		it( 'should initialize with custom handles and interpolation', () => {

			const keyframe = new FCurveKeyFrame(
				{ x: 1, y: 2 },
				{ x: 0.5, y: 1.5 },
				{ x: 1.5, y: 2.5 },
				'LINEAR'
			);

			expect( keyframe.coordinate ).toEqual( { x: 1, y: 2 } );
			expect( keyframe.handleLeft ).toEqual( { x: 0.5, y: 1.5 } );
			expect( keyframe.handleRight ).toEqual( { x: 1.5, y: 2.5 } );
			expect( keyframe.interpolation ).toBe( 'LINEAR' );

		} );

	} );

	describe( 'Interpolation', () => {

		it( 'should interpolate with BEZIER', () => {

			const keyframe1 = new FCurveKeyFrame(
				{ x: 0, y: 0 },
				{ x: 0, y: 0 },
				{ x: 0.25, y: 0.1 }
			);

			const keyframe2 = new FCurveKeyFrame(
				{ x: 1, y: 1 },
				{ x: 0.75, y: 0.9 },
				{ x: 1, y: 1 }
			);

			// ベジェ補間での中間値をテスト
			const midValue = keyframe1.to( keyframe2, 0.5 );
			expect( midValue ).toBeGreaterThan( 0 );
			expect( midValue ).toBeLessThan( 1 );

		} );

		it( 'should interpolate with LINEAR', () => {

			const keyframe1 = new FCurveKeyFrame(
				{ x: 0, y: 0 },
				undefined,
				undefined,
				'LINEAR'
			);

			const keyframe2 = new FCurveKeyFrame(
				{ x: 1, y: 1 }
			);

			// 線形補間での中間値をテスト
			expect( keyframe1.to( keyframe2, 0.5 ) ).toBeCloseTo( 0.5 );

		} );

		it( 'should interpolate with CONSTANT', () => {

			const keyframe1 = new FCurveKeyFrame(
				{ x: 0, y: 2 },
				undefined,
				undefined,
				'CONSTANT'
			);

			const keyframe2 = new FCurveKeyFrame(
				{ x: 1, y: 4 }
			);

			// 一定値補間では最初のキーフレームの値を保持
			expect( keyframe1.to( keyframe2, 0.25 ) ).toBe( 2 );
			expect( keyframe1.to( keyframe2, 0.5 ) ).toBe( 2 );
			expect( keyframe1.to( keyframe2, 0.75 ) ).toBe( 2 );

		} );

	} );

	describe( 'Caching', () => {

		it( 'should cache easing function', () => {

			const keyframe1 = new FCurveKeyFrame( { x: 0, y: 0 } );
			const keyframe2 = new FCurveKeyFrame( { x: 1, y: 1 } );

			// 最初の呼び出しでイージング関数を作成
			const value1 = keyframe1.to( keyframe2, 0.5 );

			// 同じキーフレームでの2回目の呼び出しはキャッシュを使用
			const value2 = keyframe1.to( keyframe2, 0.5 );

			expect( value1 ).toBe( value2 );

			// 異なるキーフレームでは新しいイージング関数を作成
			const keyframe3 = new FCurveKeyFrame( { x: 1, y: 2 } );
			const value3 = keyframe1.to( keyframe3, 0.5 );

			expect( value3 ).not.toBe( value1 );

		} );

	} );

} );
