import { Vec3, Vector3 } from "./Vector3";
export declare class Matrix4 {
    elm: number[];
    constructor(elm?: number[]);
    get isMat4(): boolean;
    identity(): this;
    clone(): Matrix4;
    copy(mat: Matrix4): this;
    perspective(fov: number, aspect: number, near: number, far: number): this;
    lookAt(eye: Vector3, target: Vector3, up: Vector3): this;
    inverse(): this;
    set(elm: number[]): this;
    setFromTransform(pos: Vec3, rot: Vec3, scale: Vec3): this;
    decompose(pos?: Vec3, rot?: Vec3, scale?: Vec3): void;
    applyPosition(position: Vec3): this;
    applyRot(rotation: Vec3): this;
    applyScale(scale: Vec3): this;
    protected matmul(elm2: number[]): void;
    multiply(m: Matrix4): this;
    preMultiply(m: Matrix4): this;
    copyToArray(array: number[]): number[];
}
//# sourceMappingURL=Matrix4.d.ts.map