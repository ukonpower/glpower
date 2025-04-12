
let uuid = 0;

export namespace ID {

	export function genUUID(): string {

		return ( uuid ++ ).toString( 16 );

	}

}
