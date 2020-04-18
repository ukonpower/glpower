import { Vec2 } from "./Vec2";
export declare class Vec3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    readonly isVec3: boolean;
    set(x: number, y: number, z: number): this;
    add(a: Vec3): Vec3;
    add(a: number): Vec3;
    sub(a: Vec3): Vec3;
    sub(a: number): Vec3;
    multiply(a: number): this;
    divide(a: number): this;
    length(): number;
    normalize(): this;
    cross(v: Vec3): this;
    dot(v: Vec3): number;
    copy(a: Vec2 | Vec3): this;
    clone(): Vec3;
}
