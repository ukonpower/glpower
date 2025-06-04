import { MathUtils } from '../../src/Math/Utils';
import { Vector } from '../../src/Math/Vector';

describe('MathUtils', () => {

    describe('gauss', () => {
        it('returns higher value near x0', () => {
            const center = MathUtils.gauss(0, 0, 1);
            const far = MathUtils.gauss(5, 0, 1);
            expect(center).toBeGreaterThan(far);
        });
    });

    describe('gaussWeights', () => {
        it('generates normalized weights', () => {
            const weights = MathUtils.gaussWeights(5);
            const norm = weights.reduce((t,w,i)=> t + w*(i>0?2:1), 0);
            expect(norm).toBeCloseTo(1);
            weights.forEach(w => expect(w).toBeGreaterThanOrEqual(0));
        });
    });

    describe('randomSeed', () => {
        it('produces reproducible sequence', () => {
            const rndA = MathUtils.randomSeed(123);
            const rndB = MathUtils.randomSeed(123);
            const seqA = [rndA(), rndA(), rndA()];
            const seqB = [rndB(), rndB(), rndB()];
            expect(seqA).toEqual(seqB);
        });
    });

    describe('randomRange', () => {
        it('returns value within given range', () => {
            for(let i=0;i<10;i++){
                const v = MathUtils.randomRange(1,2);
                expect(v).toBeGreaterThanOrEqual(1);
                expect(v).toBeLessThanOrEqual(2);
            }
        });
    });

    describe('randomVector', () => {
        it('returns vector within given ranges', () => {
            const min = new Vector(0,0,0,0);
            const max = new Vector(1,1,1,1);
            const v = MathUtils.randomVector(min,max);
            expect(v.x).toBeGreaterThanOrEqual(0);
            expect(v.x).toBeLessThanOrEqual(1);
            expect(v.y).toBeGreaterThanOrEqual(0);
            expect(v.y).toBeLessThanOrEqual(1);
            expect(v.z).toBeGreaterThanOrEqual(0);
            expect(v.z).toBeLessThanOrEqual(1);
            expect(v.w).toBeGreaterThanOrEqual(0);
            expect(v.w).toBeLessThanOrEqual(1);
        });
    });

    describe('smoothstep', () => {
        it('interpolates between min and max', () => {
            expect(MathUtils.smoothstep(0,1,-1)).toBe(0);
            expect(MathUtils.smoothstep(0,1,2)).toBe(1);
            expect(MathUtils.smoothstep(0,1,0.5)).toBeCloseTo(0.5);
        });
    });
});
