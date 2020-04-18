import { Vec3 } from "./Vec3";
export declare class Vec2 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    readonly isVec2: boolean;
    set(x: number, y: number): this;
    add(a: Vec2): any;
    add(a: number): any;
    sub(a: Vec2): any;
    sub(a: number): any;
    multiply(a: number | Vec2): this;
    divide(a: number | Vec2): this;
    copy(a: Vec2 | Vec3): this;
    clone(): Vec2;
}
