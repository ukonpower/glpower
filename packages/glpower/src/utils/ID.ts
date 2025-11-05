
export namespace ID {

	/**
	 * 8桁のハッシュUUIDを生成する
	 * タイムスタンプとランダム値を組み合わせて生成
	 * @returns 8桁の16進数文字列 (例: "a3f7b2c9")
	 */
	export function genUUID(): string {

		// タイムスタンプの下位16ビット（4桁の16進数）
		const time = Date.now() & 0xFFFF;

		// ランダム値16ビット（4桁の16進数）
		const rand = Math.floor( Math.random() * 0x10000 );

		// 32ビットハッシュ値を生成（8桁の16進数）
		const hash = ( ( time << 16 ) | rand ) >>> 0;

		// 8桁の16進数文字列に変換（0埋め）
		return hash.toString( 16 ).padStart( 8, '0' );

	}

}
