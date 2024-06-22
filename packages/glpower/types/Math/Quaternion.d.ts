import { IVector3, IVector4, Matrix, Types } from "..";
import { Euler, EulerOrder } from "./Euler";
import { Vector } from "./Vector";
export declare type Quat = {
    x: number;
    y: number;
    z: number;
};
export declare class Quaternion {
    x: number;
    y: number;
    z: number;
    w: number;
    updated: boolean;
    constructor(x?: number, y?: number, z?: number, w?: number);
    set(x?: number, y?: number, z?: number, w?: number): void;
    setFromEuler(euler: Vector | Euler | IVector3, orverrideOrder?: EulerOrder): this;
    setFromMatrix(matrix: Matrix): this;
    multiply(q: Quaternion): this;
    inverse(): this;
    copy(a: Quaternion | Types.Nullable<IVector4>): this;
    clone(): Quaternion;
}
//# sourceMappingURL=Quaternion.d.ts.map