
export namespace ID {

	let uuid: number = 0;

	export function genUUID(): string {

		return ( uuid ++ ).toString( 16 ).padStart( 8, '0' );

	}

	export function advanceCounter( restoredUUID: string ) {

		const num = parseInt( restoredUUID, 16 );

		if ( ! isNaN( num ) && num >= uuid ) {

			uuid = num + 1;

		}

	}

}
