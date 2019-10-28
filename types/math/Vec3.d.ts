export declare class Vec3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    readonly isVec3: boolean;
    clone(): Vec3;
    set(x: number, y: number, z: number): this;
    add(a: Vec3): Vec3;
    add(a: number): Vec3;
    sub(a: Vec3): Vec3;
    sub(a: number): Vec3;
    multiply(a: Vec3): Vec3;
    multiply(a: number): Vec3;
    divide(a: Vec3): Vec3;
    divide(a: number): Vec3;
    length(): number;
    normalize(): Vec3;
    cross(v: Vec3): this;
    dot(v: Vec3): number;
}
