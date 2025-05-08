/* eslint no-undef: 0 */

import { Quaternion } from '../../src/Math/Quaternion';
import { Matrix } from '../../src/Math/Matrix';
import { Vector } from '../../src/Math/Vector';

describe( 'Quaternion', () => {

	let quaternion: Quaternion;

	beforeEach( () => {

		quaternion = new Quaternion();

	} );

	describe( '初期化と基本操作', () => {

		it( 'デフォルトで単位四元数として初期化される', () => {

			expect( quaternion.x ).toBe( 0 );
			expect( quaternion.y ).toBe( 0 );
			expect( quaternion.z ).toBe( 0 );
			expect( quaternion.w ).toBe( 1 );

		} );

		it( '値を指定して初期化できる', () => {

			quaternion = new Quaternion( 1, 2, 3, 4 );
			expect( quaternion.x ).toBe( 1 );
			expect( quaternion.y ).toBe( 2 );
			expect( quaternion.z ).toBe( 3 );
			expect( quaternion.w ).toBe( 4 );

		} );

		it( 'set()で値を設定できる', () => {

			quaternion.set( 1, 2, 3, 4 );
			expect( quaternion.x ).toBe( 1 );
			expect( quaternion.y ).toBe( 2 );
			expect( quaternion.z ).toBe( 3 );
			expect( quaternion.w ).toBe( 4 );
			expect( quaternion.updated ).toBe( true );

		} );

		it( 'clone()で新しいインスタンスにコピーできる', () => {

			quaternion.set( 1, 2, 3, 4 );
			const cloned = quaternion.clone();
			expect( cloned.x ).toBe( 1 );
			expect( cloned.y ).toBe( 2 );
			expect( cloned.z ).toBe( 3 );
			expect( cloned.w ).toBe( 4 );
			expect( cloned ).not.toBe( quaternion ); // 異なるインスタンス

		} );

	} );

	describe( '変換', () => {

		it( 'setFromEuler()でXYZ順のオイラー角から変換できる', () => {

			const euler = { x: Math.PI / 4, y: 0, z: 0 }; // X軸周りに45度回転
			quaternion.setFromEuler( euler );

			// X軸45度回転の四元数の値を確認
			expect( quaternion.x ).toBeCloseTo( Math.sin( Math.PI / 8 ), 5 ); // sin(45/2)
			expect( quaternion.y ).toBeCloseTo( 0, 5 );
			expect( quaternion.z ).toBeCloseTo( 0, 5 );
			expect( quaternion.w ).toBeCloseTo( Math.cos( Math.PI / 8 ), 5 ); // cos(45/2)

		} );

		it( 'setFromMatrix()で回転行列から変換できる', () => {

			// Y軸90度回転の行列を作成
			const matrix = new Matrix();
			matrix.elm = [
				0, 0, - 1, 0,
				0, 1, 0, 0,
				1, 0, 0, 0,
				0, 0, 0, 1
			];

			quaternion.setFromMatrix( matrix );

			// Y軸90度回転の四元数の値を確認
			expect( quaternion.x ).toBeCloseTo( 0, 5 );
			expect( quaternion.y ).toBeCloseTo( Math.sin( Math.PI / 4 ), 5 ); // sin(90/2)
			expect( quaternion.z ).toBeCloseTo( 0, 5 );
			expect( quaternion.w ).toBeCloseTo( Math.cos( Math.PI / 4 ), 5 ); // cos(90/2)

		} );

	} );

	describe( '四元数演算', () => {

		it( 'multiply()で四元数を乗算できる', () => {

			// X軸90度回転とY軸90度回転の合成
			const q1 = new Quaternion().setFromEuler( { x: Math.PI / 2, y: 0, z: 0 } );
			const q2 = new Quaternion().setFromEuler( { x: 0, y: Math.PI / 2, z: 0 } );

			q1.multiply( q2 );

			// 合成後の値を確認
			expect( q1.x ).toBeCloseTo( 0.5, 5 );
			expect( q1.y ).toBeCloseTo( 0.5, 5 );
			expect( q1.z ).toBeCloseTo( 0.5, 5 );
			expect( q1.w ).toBeCloseTo( 0.5, 5 );

		} );

		it( 'preMultiply()で前から四元数を乗算できる', () => {

			// X軸90度回転とY軸90度回転の合成（順序を逆に）
			const q1 = new Quaternion().setFromEuler( { x: Math.PI / 2, y: 0, z: 0 } );
			const q2 = new Quaternion().setFromEuler( { x: 0, y: Math.PI / 2, z: 0 } );

			q1.preMultiply( q2 );

			// 合成後の値を確認（multiply()とは異なる結果になる）
			expect( q1.x ).toBeCloseTo( 0.5, 5 );
			expect( q1.y ).toBeCloseTo( 0.5, 5 );
			expect( q1.z ).toBeCloseTo( - 0.5, 5 );
			expect( q1.w ).toBeCloseTo( 0.5, 5 );

		} );

		it( 'inverse()で逆四元数を計算できる', () => {

			quaternion.set( 1, 2, 3, 4 );
			quaternion.inverse();

			expect( quaternion.x ).toBe( - 1 );
			expect( quaternion.y ).toBe( - 2 );
			expect( quaternion.z ).toBe( - 3 );
			expect( quaternion.w ).toBe( 4 );

		} );

	} );

} );
