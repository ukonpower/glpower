import { Empty } from "../objects/Empty";
import { Mat4 } from "../math/Mat4";
export declare class Camera extends Empty {
    fov: number;
    near: number;
    far: number;
    aspect: number;
    projectionMatrix: Mat4;
    modelMatrixInverse: Mat4;
    constructor(fov: number, near: number, far: number, aspect: number);
    updateMatrix(): void;
}
