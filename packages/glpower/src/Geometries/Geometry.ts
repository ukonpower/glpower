

type DefaultAttributeName = 'position' | 'uv' | 'normal' | 'index';

export type Attribute = {
	array: number[];
	size: number;
}

export class Geometry {

	public count: number = 0;

	public attributes: {[key: string]: Attribute} = {};

	constructor() {
	}

	public setAttribute( name: DefaultAttributeName | ( string & {} ), array: number[], size: number ) {

		this.attributes[ name ] = {
			array,
			size
		};

		this.updateVertCount();

	}

	public getAttribute( name: DefaultAttributeName | ( string & {} ) ) {

		return this.attributes[ name ];

	}

	private updateVertCount() {

		const keys = Object.keys( this.attributes );

		this.count = keys.length > 0 ? Infinity : 0;

		keys.forEach( name => {

			const attribute = this.attributes[ name ];

			if ( name != 'index' ) {

				this.count = Math.min( attribute.array.length / attribute.size, this.count );

			}

		} );

	}

}
