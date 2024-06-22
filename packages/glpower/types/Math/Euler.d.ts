import { Types } from "../types";
import { Matrix } from "./Matrix";
import { Quaternion } from "./Quaternion";
import { IVector4, Vector } from "./Vector";
export declare type EulerOrder = 'XYZ' | 'XZY' | 'ZYX' | 'YZX';
export declare class Euler extends Vector {
    order: EulerOrder;
    constructor(x?: number | undefined, y?: number | undefined, z?: number | undefined, order?: EulerOrder);
    copy(a: Vector | Types.Nullable<IVector4> | Euler): this;
    setFromQuaternion(q: Quaternion): this;
    setFromRotationMatrix(m: Matrix): this;
}
//# sourceMappingURL=Euler.d.ts.map