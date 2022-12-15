import { Types } from "..";
export declare type IVector2 = {
    x: number;
    y: number;
};
export declare type IVector3 = IVector2 & {
    z: number;
};
export declare type IVector4 = IVector3 & {
    w: number;
};
export declare class Vector {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(x?: number, y?: number, z?: number, w?: number);
    get isVector(): boolean;
    set(x: number, y?: number, z?: number, w?: number): this;
    add(a: number): Vector;
    add(a: Vector | Types.Nullable<IVector4>): Vector;
    sub(a: number): Vector;
    sub(a: Vector | Types.Nullable<IVector4>): Vector;
    multiply(a: number): this;
    divide(a: number): this;
    length(): number;
    normalize(): this;
    cross(v: Vector | IVector3): this;
    dot(v: Vector | IVector3): number;
    copy(a: Vector | Types.Nullable<IVector4>): this;
    clone(): Vector;
    getElm(type?: 'vec2' | 'vec3' | 'vec4'): number[];
}
//# sourceMappingURL=Vector.d.ts.map