import { Empty } from "../objects/Empty";
import { Mat4 } from "../math/Mat4";
export declare class Camera extends Empty {
    protected fov: number;
    protected near: number;
    protected far: number;
    projectionMatrix: Mat4;
    modelMatrixInverse: Mat4;
    constructor(fov: number, near: number, far: number);
    updateMatrix(): void;
}
