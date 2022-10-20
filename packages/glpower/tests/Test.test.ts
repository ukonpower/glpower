
/* eslint no-undef: 0 */

import { Test } from '../src';

describe( 'Test', () => {

	let test: Test;

	beforeEach( () => {

		test = new Test();

	} );

	it( 'can print', () => {

		expect( test.print( 'Hello' ) ).toBe( 'Hello' );

	} );

} );
