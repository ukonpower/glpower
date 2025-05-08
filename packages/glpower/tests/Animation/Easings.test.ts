/* eslint no-undef: 0 */
import { Easings } from '../../src/Animation/Easings';

describe( 'Easings', () => {

	describe( 'Basic Functions', () => {

		it( 'sigmoid should return correct values', () => {

			const sigmoid = Easings.sigmoid( 6 );
			expect( sigmoid( 0 ) ).toBeCloseTo( 0 );
			expect( sigmoid( 0.5 ) ).toBeCloseTo( 0.5 );
			expect( sigmoid( 1 ) ).toBeCloseTo( 1 );

		} );

		it( 'smoothstep should interpolate correctly', () => {

			expect( Easings.smoothstep( 0, 1, 0 ) ).toBe( 0 );
			expect( Easings.smoothstep( 0, 1, 0.5 ) ).toBeCloseTo( 0.5 );
			expect( Easings.smoothstep( 0, 1, 1 ) ).toBe( 1 );

		} );

		it( 'linear should return input value', () => {

			expect( Easings.linear( 0 ) ).toBe( 0 );
			expect( Easings.linear( 0.5 ) ).toBe( 0.5 );
			expect( Easings.linear( 1 ) ).toBe( 1 );

		} );

	} );

	describe( 'Quadratic Functions', () => {

		it( 'easeInQuad should have correct curve', () => {

			expect( Easings.easeInQuad( 0 ) ).toBe( 0 );
			expect( Easings.easeInQuad( 0.5 ) ).toBe( 0.25 );
			expect( Easings.easeInQuad( 1 ) ).toBe( 1 );

		} );

		it( 'easeOutQuad should have correct curve', () => {

			expect( Easings.easeOutQuad( 0 ) ).toBe( 0 );
			expect( Easings.easeOutQuad( 0.5 ) ).toBe( 0.75 );
			expect( Easings.easeOutQuad( 1 ) ).toBe( 1 );

		} );

		it( 'easeInOutQuad should have correct curve', () => {

			expect( Easings.easeInOutQuad( 0 ) ).toBe( 0 );
			expect( Easings.easeInOutQuad( 0.25 ) ).toBe( 0.125 );
			expect( Easings.easeInOutQuad( 0.5 ) ).toBe( 0.5 );
			expect( Easings.easeInOutQuad( 0.75 ) ).toBe( 0.875 );
			expect( Easings.easeInOutQuad( 1 ) ).toBe( 1 );

		} );

	} );

	describe( 'Cubic Functions', () => {

		it( 'easeInCubic should have correct curve', () => {

			expect( Easings.easeInCubic( 0 ) ).toBe( 0 );
			expect( Easings.easeInCubic( 0.5 ) ).toBe( 0.125 );
			expect( Easings.easeInCubic( 1 ) ).toBe( 1 );

		} );

		it( 'easeOutCubic should have correct curve', () => {

			expect( Easings.easeOutCubic( 0 ) ).toBe( 0 );
			expect( Easings.easeOutCubic( 0.5 ) ).toBe( 0.875 );
			expect( Easings.easeOutCubic( 1 ) ).toBe( 1 );

		} );

		it( 'easeInOutCubic should have correct curve', () => {

			expect( Easings.easeInOutCubic( 0 ) ).toBe( 0 );
			expect( Easings.easeInOutCubic( 0.25 ) ).toBeCloseTo( 0.0625 );
			expect( Easings.easeInOutCubic( 0.5 ) ).toBe( 0.5 );
			expect( Easings.easeInOutCubic( 0.75 ) ).toBeCloseTo( 0.9375 );
			expect( Easings.easeInOutCubic( 1 ) ).toBe( 1 );

		} );

	} );

	describe( 'Quart Functions', () => {

		it( 'easeInQuart should have correct curve', () => {

			expect( Easings.easeInQuart( 0 ) ).toBe( 0 );
			expect( Easings.easeInQuart( 0.5 ) ).toBe( 0.0625 );
			expect( Easings.easeInQuart( 1 ) ).toBe( 1 );

		} );

		it( 'easeOutQuart should have correct curve', () => {

			expect( Easings.easeOutQuart( 0 ) ).toBe( 0 );
			expect( Easings.easeOutQuart( 0.5 ) ).toBe( 0.9375 );
			expect( Easings.easeOutQuart( 1 ) ).toBe( 1 );

		} );

		it( 'easeInOutQuart should have correct curve', () => {

			expect( Easings.easeInOutQuart( 0 ) ).toBe( 0 );
			expect( Easings.easeInOutQuart( 0.25 ) ).toBeCloseTo( 0.03125 );
			expect( Easings.easeInOutQuart( 0.5 ) ).toBe( 0.5 );
			expect( Easings.easeInOutQuart( 0.75 ) ).toBeCloseTo( 0.96875 );
			expect( Easings.easeInOutQuart( 1 ) ).toBe( 1 );

		} );

	} );

	describe( 'Quint Functions', () => {

		it( 'easeInQuint should have correct curve', () => {

			expect( Easings.easeInQuint( 0 ) ).toBe( 0 );
			expect( Easings.easeInQuint( 0.5 ) ).toBe( 0.03125 );
			expect( Easings.easeInQuint( 1 ) ).toBe( 1 );

		} );

		it( 'easeOutQuint should have correct curve', () => {

			expect( Easings.easeOutQuint( 0 ) ).toBe( 0 );
			expect( Easings.easeOutQuint( 0.5 ) ).toBe( 0.96875 );
			expect( Easings.easeOutQuint( 1 ) ).toBe( 1 );

		} );

		it( 'easeInOutQuint should have correct curve', () => {

			expect( Easings.easeInOutQuint( 0 ) ).toBe( 0 );
			expect( Easings.easeInOutQuint( 0.25 ) ).toBeCloseTo( 0.015625 );
			expect( Easings.easeInOutQuint( 0.5 ) ).toBe( 0.5 );
			expect( Easings.easeInOutQuint( 0.75 ) ).toBeCloseTo( 0.984375 );
			expect( Easings.easeInOutQuint( 1 ) ).toBe( 1 );

		} );

	} );

	describe( 'Bezier Functions', () => {

		it( 'bezier should create correct easing function', () => {

			const ease = Easings.bezier(
				{ x: 0, y: 0 },
				{ x: 0.25, y: 0.1 },
				{ x: 0.75, y: 0.9 },
				{ x: 1, y: 1 }
			);

			expect( ease( 0 ) ).toBe( 0 );
			expect( ease( 1 ) ).toBe( 1 );
			// 中間値はベジェ曲線に従う
			expect( ease( 0.5 ) ).toBeGreaterThan( 0 );
			expect( ease( 0.5 ) ).toBeLessThan( 1 );

		} );

		it( 'cubicBezier should create correct easing function', () => {

			const ease = Easings.cubicBezier( 0.25, 0.1, 0.75, 0.9 );

			expect( ease( 0 ) ).toBe( 0 );
			expect( ease( 1 ) ).toBe( 1 );
			// 中間値はベジェ曲線に従う
			expect( ease( 0.5 ) ).toBeGreaterThan( 0 );
			expect( ease( 0.5 ) ).toBeLessThan( 1 );

		} );

	} );

} );
