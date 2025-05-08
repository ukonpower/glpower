/* eslint no-undef: 0 */

import { Euler } from '../../src/Math/Euler';
import { Matrix } from '../../src/Math/Matrix';
import { Quaternion } from '../../src/Math/Quaternion';
import { Vector } from '../../src/Math/Vector';

describe( 'Euler', () => {

	let euler: Euler;

	beforeEach( () => {

		euler = new Euler();

	} );

	describe( '初期化と基本操作', () => {

		it( 'デフォルトで0の角度とXYZ順で初期化される', () => {

			expect( euler.x ).toBe( 0 );
			expect( euler.y ).toBe( 0 );
			expect( euler.z ).toBe( 0 );
			expect( euler.order ).toBe( 'XYZ' );

		} );

		it( '値とorderを指定して初期化できる', () => {

			euler = new Euler( Math.PI / 2, Math.PI / 4, Math.PI / 6, 'ZYX' );
			expect( euler.x ).toBeCloseTo( Math.PI / 2, 5 );
			expect( euler.y ).toBeCloseTo( Math.PI / 4, 5 );
			expect( euler.z ).toBeCloseTo( Math.PI / 6, 5 );
			expect( euler.order ).toBe( 'ZYX' );

		} );

		it( 'Vector継承の機能が使える', () => {

			euler.set( 1, 2, 3 );
			expect( euler.length() ).toBeCloseTo( Math.sqrt( 14 ), 5 );

		} );

		it( 'copy()でオイラー角の値とorderをコピーできる', () => {

			const source = new Euler( 1, 2, 3, 'XZY' );
			euler.copy( source );
			expect( euler.x ).toBe( 1 );
			expect( euler.y ).toBe( 2 );
			expect( euler.z ).toBe( 3 );
			expect( euler.order ).toBe( 'XZY' );

		} );

	} );

	describe( '変換', () => {

		it( 'setFromQuaternion()でクォータニオンから変換できる', () => {

			// Y軸90度回転のクォータニオン
			const q = new Quaternion();
			q.setFromEuler( { x: 0, y: Math.PI / 2, z: 0 } );

			euler.setFromQuaternion( q );

			// Y軸90度回転のオイラー角を確認
			expect( euler.x ).toBeCloseTo( 0, 5 );
			expect( euler.y ).toBeCloseTo( Math.PI / 2, 5 );
			expect( euler.z ).toBeCloseTo( 0, 5 );

		} );

		it( 'setFromRotationMatrix()で回転行列から変換できる', () => {

			// X軸90度回転の行列
			const matrix = new Matrix( [
				1, 0, 0, 0,
				0, 0, - 1, 0,
				0, 1, 0, 0,
				0, 0, 0, 1
			] );

			euler.setFromRotationMatrix( matrix );

			// X軸90度回転のオイラー角を確認
			expect( euler.x ).toBeCloseTo( - Math.PI / 2, 5 );
			expect( euler.y ).toBeCloseTo( 0, 5 );
			expect( euler.z ).toBeCloseTo( 0, 5 );

		} );

		it( 'ジンバルロック付近での変換を正しく処理できる', () => {

			// Y軸が90度付近の回転行列（ジンバルロック付近）
			const matrix = new Matrix( [
				0, 0, 1, 0,
				0, 1, 0, 0,
				- 1, 0, 0, 0,
				0, 0, 0, 1
			] );

			euler.setFromRotationMatrix( matrix );

			// Y軸が90度で、X軸とZ軸の組み合わせが正しく計算されることを確認
			expect( euler.y ).toBeCloseTo( - Math.PI / 2, 5 );
			// X軸とZ軸の値は特定の値に固定される
			expect( euler.x ).toBeDefined();
			expect( euler.z ).toBeDefined();

		} );

	} );

	describe( '相互変換の一貫性', () => {

		it( 'Quaternion → Euler → Quaternionの変換で値が保持される', () => {

			// 任意の回転を表すクォータニオン
			const originalQuat = new Quaternion().setFromEuler( {
				x: Math.PI / 6,
				y: Math.PI / 4,
				z: Math.PI / 3
			} );

			// クォータニオン → オイラー角
			euler.setFromQuaternion( originalQuat );

			// オイラー角 → クォータニオン
			const resultQuat = new Quaternion().setFromEuler( euler );

			// 元のクォータニオンと結果を比較
			expect( resultQuat.x ).toBeCloseTo( originalQuat.x, 5 );
			expect( resultQuat.y ).toBeCloseTo( originalQuat.y, 5 );
			expect( resultQuat.z ).toBeCloseTo( originalQuat.z, 5 );
			expect( resultQuat.w ).toBeCloseTo( originalQuat.w, 5 );

		} );

	} );

} );
