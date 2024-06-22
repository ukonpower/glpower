import { Vector } from "../Math/Vector";
export declare interface LerpFunc<T> {
    (a: T, b: T, t: number): T;
}
export declare namespace Lerps {
    const number: LerpFunc<number>;
    const vector: LerpFunc<Vector>;
}
//# sourceMappingURL=Lerps.d.ts.map