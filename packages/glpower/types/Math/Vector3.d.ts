import { Vector2 } from "./Vector2";
export declare type Vec3 = {
    x: number;
    y: number;
    z: number;
};
export declare class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    get isVector3(): boolean;
    set(x: number, y: number, z: number): this;
    add(a: Vector3): Vector3;
    add(a: number): Vector3;
    sub(a: Vector3): Vector3;
    sub(a: number): Vector3;
    multiply(a: number): this;
    divide(a: number): this;
    length(): number;
    normalize(): this;
    cross(v: Vector3): this;
    dot(v: Vector3): number;
    copy(a: Vector2 | Vector3): this;
    clone(): Vector3;
    get elm(): number[];
}
//# sourceMappingURL=Vector3.d.ts.map