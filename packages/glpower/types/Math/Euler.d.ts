import { Types } from "../types";
import { IVector4, Vector } from "./Vector";
export declare type EulerOrder = 'XYZ' | 'XZY' | 'ZYX' | 'YZX';
export declare class Euler extends Vector {
    order: EulerOrder;
    constructor(x?: number | undefined, y?: number | undefined, z?: number | undefined, order?: EulerOrder);
    copy(a: Vector | Types.Nullable<IVector4> | Euler): this;
}
//# sourceMappingURL=Euler.d.ts.map