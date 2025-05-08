/* eslint no-undef: 0 */
import { Bezier } from '../../src/Animation/Bezier';

describe( 'Bezier', () => {

	describe( 'Basic Calculations', () => {

		const controlPoints = {
			p0: 0,
			p1: 0.25,
			p2: 0.75,
			p3: 1
		};

		it( 'should calculate bezier curve value', () => {

			// t = 0 で開始点
			expect( Bezier.calcBezier( controlPoints, 0 ) ).toBe( 0 );

			// t = 1 で終了点
			expect( Bezier.calcBezier( controlPoints, 1 ) ).toBe( 1 );

			// 中間点は制御点の影響を受ける
			const midPoint = Bezier.calcBezier( controlPoints, 0.5 );
			expect( midPoint ).toBeGreaterThan( 0 );
			expect( midPoint ).toBeLessThan( 1 );

		} );

		it( 'should calculate bezier slope', () => {

			// t = 0 での傾き
			const startSlope = Bezier.calcBezierSlope( controlPoints, 0 );
			expect( startSlope ).toBeGreaterThan( 0 );

			// t = 1 での傾き
			const endSlope = Bezier.calcBezierSlope( controlPoints, 1 );
			expect( endSlope ).toBeGreaterThan( 0 );

		} );

	} );

	describe( 'T Value Calculation', () => {

		it( 'should find t value for given x using cache', () => {

			const controlPoints = {
				p0: 0,
				p1: 0.25,
				p2: 0.75,
				p3: 1
			};

			// キャッシュの準備
			const cache = new Array( Bezier.BEZIER_EASING_CACHE_SIZE );
			for ( let i = 0; i < Bezier.BEZIER_EASING_CACHE_SIZE; i ++ ) {

				cache[ i ] = Bezier.calcBezier( controlPoints, i / ( Bezier.BEZIER_EASING_CACHE_SIZE - 1.0 ) );

			}

			// x = 0 で t = 0
			expect( Bezier.getBezierTfromX( controlPoints, 0, cache ) ).toBeCloseTo( 0 );

			// x = 1 で t = 1
			expect( Bezier.getBezierTfromX( controlPoints, 1, cache ) ).toBeCloseTo( 1 );

			// 中間値のテスト
			const midT = Bezier.getBezierTfromX( controlPoints, 0.5, cache );
			expect( midT ).toBeGreaterThan( 0 );
			expect( midT ).toBeLessThan( 1 );

			// 得られたtを使って元のx値が取得できることを確認
			expect( Bezier.calcBezier( controlPoints, midT ) ).toBeCloseTo( 0.5 );

		} );

	} );

	describe( 'Edge Cases', () => {

		it( 'should handle control points at boundaries', () => {

			const controlPoints = {
				p0: 0,
				p1: 0,
				p2: 1,
				p3: 1
			};

			const cache = new Array( Bezier.BEZIER_EASING_CACHE_SIZE );
			for ( let i = 0; i < Bezier.BEZIER_EASING_CACHE_SIZE; i ++ ) {

				cache[ i ] = Bezier.calcBezier( controlPoints, i / ( Bezier.BEZIER_EASING_CACHE_SIZE - 1.0 ) );

			}

			expect( Bezier.getBezierTfromX( controlPoints, 0.5, cache ) ).toBeCloseTo( 0.5 );

		} );

		it( 'should handle zero slope', () => {

			const controlPoints = {
				p0: 0,
				p1: 0,
				p2: 0,
				p3: 0
			};

			// 全ての点が同じ高さの場合、スロープは0
			expect( Bezier.calcBezierSlope( controlPoints, 0.5 ) ).toBe( 0 );

		} );

		it( 'should clamp control points within bounds', () => {

			const controlPoints = {
				p0: 0,
				p1: - 0.5, // 範囲外
				p2: 1.5, // 範囲外
				p3: 1
			};

			const cache = new Array( Bezier.BEZIER_EASING_CACHE_SIZE );
			for ( let i = 0; i < Bezier.BEZIER_EASING_CACHE_SIZE; i ++ ) {

				cache[ i ] = Bezier.calcBezier( controlPoints, i / ( Bezier.BEZIER_EASING_CACHE_SIZE - 1.0 ) );

			}

			// getBezierTfromXは内部でp1とp2を範囲内に収める
			const t = Bezier.getBezierTfromX( controlPoints, 0.5, cache );
			expect( t ).toBeGreaterThan( 0 );
			expect( t ).toBeLessThan( 1 );

		} );

	} );

	describe( 'Performance', () => {

		it( 'should use newton method for steep curves', () => {

			const controlPoints = {
				p0: 0,
				p1: 0.9, // 急な曲線を作る
				p2: 0.1,
				p3: 1
			};

			const cache = new Array( Bezier.BEZIER_EASING_CACHE_SIZE );
			for ( let i = 0; i < Bezier.BEZIER_EASING_CACHE_SIZE; i ++ ) {

				cache[ i ] = Bezier.calcBezier( controlPoints, i / ( Bezier.BEZIER_EASING_CACHE_SIZE - 1.0 ) );

			}

			// 急な曲線でも正確な値が得られる
			const t = Bezier.getBezierTfromX( controlPoints, 0.5, cache );
			expect( Bezier.calcBezier( controlPoints, t ) ).toBeCloseTo( 0.5 );

		} );

	} );

} );
