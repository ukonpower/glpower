
export namespace ID {

	export function genUUID(): string {

		return self.crypto.randomUUID();

	}

}
