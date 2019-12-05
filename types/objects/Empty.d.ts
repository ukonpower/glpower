import { Vec3 } from "../math/Vec3";
import { Mat4 } from "../math/Mat4";
export declare class Empty {
    children: Empty[];
    modelMatrix: Mat4;
    modelViewMatrix: Mat4;
    position: Vec3;
    rotation: Vec3;
    scale: Vec3;
    constructor();
    add(obj: Empty): void;
    updateMatrix(): void;
}
