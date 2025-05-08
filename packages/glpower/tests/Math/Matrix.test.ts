/* eslint no-undef: 0 */

import { Matrix } from '../../src/Math/Matrix';
import { Vector } from '../../src/Math/Vector';
import { Quaternion } from '../../src/Math/Quaternion';

describe( 'Matrix', () => {

	let matrix: Matrix;

	beforeEach( () => {

		matrix = new Matrix();

	} );

	describe( '初期化とコピー', () => {

		it( 'デフォルトで単位行列として初期化される', () => {

			const expected = [
				1, 0, 0, 0,
				0, 1, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1,
			];
			expect( matrix.elm ).toEqual( expected );

		} );

		it( '要素を指定して初期化できる', () => {

			const elements = [
				2, 0, 0, 0,
				0, 2, 0, 0,
				0, 0, 2, 0,
				1, 2, 3, 1,
			];
			matrix = new Matrix( elements );
			expect( matrix.elm ).toEqual( elements );

		} );

		it( 'clone()で新しいインスタンスにコピーできる', () => {

			const elements = [
				2, 0, 0, 0,
				0, 2, 0, 0,
				0, 0, 2, 0,
				1, 2, 3, 1,
			];
			matrix.set( elements );
			const cloned = matrix.clone();
			expect( cloned.elm ).toEqual( elements );
			expect( cloned ).not.toBe( matrix ); // 異なるインスタンス

		} );

	} );

	describe( '行列変換', () => {

		it( 'transpose()で転置行列を計算できる', () => {

			const elements = [
				1, 2, 3, 4,
				5, 6, 7, 8,
				9, 10, 11, 12,
				13, 14, 15, 16,
			];
			const expected = [
				1, 5, 9, 13,
				2, 6, 10, 14,
				3, 7, 11, 15,
				4, 8, 12, 16,
			];
			matrix.set( elements );
			matrix.transpose();
			expect( matrix.elm ).toEqual( expected );

		} );

		it( 'inverse()で逆行列を計算できる', () => {

			const elements = [
				1, 0, 0, 0,
				0, 2, 0, 0,
				0, 0, 3, 0,
				1, 2, 3, 1,
			];
			matrix.set( elements );
			matrix.inverse();

			// 元の行列と逆行列を掛けると単位行列になることを確認
			const original = new Matrix( elements );
			original.multiply( matrix );

			// 浮動小数点の誤差を考慮して近似値で比較
			const identity = new Matrix().identity();
			original.elm.forEach( ( value, index ) => {

				expect( value ).toBeCloseTo( identity.elm[ index ], 5 );

			} );

		} );

	} );

	describe( '変換行列生成', () => {

		it( 'perspective()で透視投影行列を生成できる', () => {

			const fov = 45;
			const aspect = 16 / 9;
			const near = 0.1;
			const far = 1000;

			matrix.perspective( fov, aspect, near, far );

			// 透視投影行列の特徴的な要素をチェック
			expect( matrix.elm[ 0 ] ).toBeCloseTo( 1.357995, 5 ); // fov/aspectによる値
			expect( matrix.elm[ 5 ] ).toBeCloseTo( 2.414213, 5 ); // fovによる値
			expect( matrix.elm[ 10 ] ).toBeCloseTo( - 1.0002, 5 ); // near/farによる値
			expect( matrix.elm[ 14 ] ).toBeCloseTo( - 0.20002, 5 ); // near/farによる値

		} );

		it( 'lookAt()でビュー行列を生成できる', () => {

			const eye = new Vector( 0, 0, 5 );
			const target = new Vector( 0, 0, 0 );
			const up = new Vector( 0, 1, 0 );

			matrix.lookAt( eye, target, up );

			// カメラが+Z方向を向いているときの行列を確認
			expect( matrix.elm[ 2 ] ).toBeCloseTo( 0, 5 );
			expect( matrix.elm[ 6 ] ).toBeCloseTo( 0, 5 );
			expect( matrix.elm[ 10 ] ).toBeCloseTo( 1, 5 );
			expect( matrix.elm[ 14 ] ).toBeCloseTo( 5, 5 ); // eye.z

		} );

	} );

	describe( '変換の適用', () => {

		it( 'setFromTransform()で位置・回転・スケールから変換行列を生成できる', () => {

			const position = { x: 1, y: 2, z: 3 };
			const rotation = new Quaternion().setFromEuler( { x: 0, y: Math.PI / 2, z: 0 } );
			const scale = { x: 2, y: 2, z: 2 };

			matrix.setFromTransform( position, rotation, scale );

			// 位置が正しく設定されているか
			expect( matrix.elm[ 12 ] ).toBe( 1 );
			expect( matrix.elm[ 13 ] ).toBe( 2 );
			expect( matrix.elm[ 14 ] ).toBe( 3 );

			// スケールが正しく適用されているか
			expect( matrix.elm[ 0 ] ).toBeCloseTo( 0, 5 ); // 回転とスケールの組み合わせ
			expect( matrix.elm[ 5 ] ).toBeCloseTo( 2, 5 ); // y軸スケール
			expect( matrix.elm[ 10 ] ).toBeCloseTo( 0, 5 ); // 回転とスケールの組み合わせ

		} );

		it( 'multiply()で行列を乗算できる', () => {

			const m1 = new Matrix( [
				2, 0, 0, 0,
				0, 2, 0, 0,
				0, 0, 2, 0,
				1, 2, 3, 1,
			] );

			const m2 = new Matrix( [
				1, 0, 0, 0,
				0, 1, 0, 0,
				0, 0, 1, 0,
				4, 5, 6, 1,
			] );

			m1.multiply( m2 );

			// 行列乗算の結果を確認
			expect( m1.elm[ 12 ] ).toBe( 9 ); // 変換後のx
			expect( m1.elm[ 13 ] ).toBe( 12 ); // 変換後のy
			expect( m1.elm[ 14 ] ).toBe( 15 ); // 変換後のz

		} );

	} );

} );
