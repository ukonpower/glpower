import { Vec3 } from "../math/Vec3";
import { Mat4 } from "../math/Mat4";
export declare class Empty {
    children: Empty[];
    modelMatrix: Mat4;
    invModelMatrix: Mat4;
    modelViewMatrix: Mat4;
    position: Vec3;
    rotation: Vec3;
    scale: Vec3;
    visible: boolean;
    name: string;
    constructor();
    add(obj: Empty): void;
    updateMatrix(): void;
}
