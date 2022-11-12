import { BufferType } from "../Buffer";
import { Core } from "../Core";
import { Attribute, AttributeBuffer } from "../VAO";

type DefaultAttributeName = 'position' | 'uv' | 'normal' | 'index';

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

	public getAttributeBuffer( core: Core, name: DefaultAttributeName | ( string & {} ), constructor: Float32ArrayConstructor | Uint16ArrayConstructor, bufferType: BufferType = 'vbo' ): AttributeBuffer {

		const attr = this.getAttribute( name );

		return {
			buffer: core.createBuffer().setData( new constructor( attr.array ), bufferType ),
			size: attr.size,
			count: attr.array.length / attr.size
		};

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
