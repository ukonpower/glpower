import { IVector2, IVector3, IVector4, Vector } from "../../Math/Vector";
import { Uniformable, UniformType } from "../../GLPowerProgram";
import { Entity } from "../Entity";
import { AttributeBuffer } from "../../GLPowerVAO";
import { BLidgeObjectType } from "../../BLidge";
import { AnimationAction } from "../../Animation/AnimationAction";
import { GLPowerFrameBuffer } from "../../GLPowerFrameBuffer";
import { Matrix } from "../../Math/Matrix";
import { GLPowerTexture } from "../../GLPowerTexture";
export interface Component {
    [key: string]: any;
}
export declare type ComponentName = 'position' | 'rotation' | 'scale' | 'matrix' | 'sceneNode' | 'event' | 'camera' | 'perspective' | "renderCameraDeferred" | "renderCameraForward" | 'postprocess' | 'material' | 'geometry' | 'directionalLight' | 'blidge' | (string & {});
export declare type ComponentVector2 = {} & IVector2;
export declare type ComponentVector3 = {} & IVector3;
export declare type ComponentVector4 = {} & IVector4;
export declare type ComponentTransformMatrix = {
    local: Matrix;
    world: Matrix;
};
export declare type ComponentEvent = {
    onUpdate: (event: {
        time: number;
        deltaTime: number;
    }) => void;
};
export declare type ComponentSceneNode = {
    parent?: Entity;
    children: Entity[];
};
export declare type RenderType = 'forward' | 'deferred' | 'shadowmap' | 'postprocess';
export declare type ComponentMaterial = {
    vertexShader: string;
    fragmentShader: string;
    uniforms?: {
        [key: string]: {
            value: Uniformable | Uniformable[];
            type: UniformType;
        };
    };
    renderType?: RenderType;
};
export declare type ComponentGeometry = {
    attributes: ({
        name: string;
    } & AttributeBuffer)[];
    index: AttributeBuffer;
    updateCache?: {
        [key: string]: boolean;
    };
};
export declare type ComponentCamera = {
    near: number;
    far: number;
    aspectRatio: number;
    projectionMatrix: Matrix;
    viewMatrix: Matrix;
    needsUpdate?: boolean;
};
export declare type ComponentCameraPerspective = {
    fov: number;
};
export declare type ComponentRenderCamera = {
    renderTarget: GLPowerFrameBuffer | null;
    onResize?: (size: Vector, component: ComponentRenderCamera) => void;
    postprocess?: ComponentMaterial & {
        renderTarget: GLPowerFrameBuffer | null;
    };
};
export declare type ComponentPostProcess = ComponentMaterial & {
    input: GLPowerTexture[];
    renderTarget: GLPowerFrameBuffer | null;
};
export declare type ComponentDirectionalLight = {
    color: IVector4;
};
export declare type ComponentBLidge = {
    name: string;
    type: BLidgeObjectType;
    updateTime?: number;
    actions?: AnimationAction[];
};
//# sourceMappingURL=index.d.ts.map