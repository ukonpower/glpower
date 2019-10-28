import { Vec3 } from "./Vec3";
export declare class Mat4 {
    element: number[];
    constructor();
    readonly isMat4: boolean;
    identity(): this;
    clone(): Mat4;
    copy(mat: Mat4): this;
    perspective(fov: number, aspect: number, near: number, far: number): this;
    lookAt(eye: Vec3, target: Vec3, up: Vec3): this;
    inverse(): this;
    createTransformMatrix(pos: Vec3, rot: Vec3, scale: Vec3): this;
    protected matmul(elm2: number[]): void;
    multiply(m: Mat4): this;
    multiplyScaler(a: number): this;
}
