import { Vec3 } from "../../Math/Vector3";
import { Uniformable, UniformType } from "../../Program";
import { Entity } from "../Entity";
import { AttributeBuffer } from "../../VAO";
export interface Component {
    [key: string]: any;
}
export declare type BuiltinComponents = ComponentVector2 | ComponentVector3 | ComponentsTransformMatrix;
export declare type ComponentName = 'position' | 'rotation' | 'scale' | 'matrix' | 'sceneNode' | 'perspectiveCamera' | 'material' | 'geometry' | (string & {});
export declare type ComponentVector3 = {} & Vec3;
export declare type ComponentVector2 = {
    x: number;
    y: number;
};
export declare type ComponentsTransformMatrix = {
    local: number[];
    world: number[];
};
export declare type ComponentSceneNode = {
    parent?: Entity;
    children: Entity[];
};
export declare type ComponentPerspectiveCamera = {
    fov: number;
    aspectRatio: number;
    near: number;
    far: number;
};
export declare type ComponentMaterial = {
    vertexShader: string;
    fragmentShader: string;
    uniforms?: {
        [key: string]: {
            value: Uniformable | Uniformable[];
            type: UniformType;
        };
    };
};
export declare type ComponentGeometry = {
    attributes: ({
        name: string;
    } & AttributeBuffer)[];
    index: AttributeBuffer;
    needsUpdate?: boolean;
};
//# sourceMappingURL=index.d.ts.map