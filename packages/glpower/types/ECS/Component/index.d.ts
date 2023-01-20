import { IVector2, IVector3, IVector4, Vector } from "../../Math/Vector";
import { GLPowerProgram, Uniformable, UniformType } from "../../GLPowerProgram";
import { Entity } from "../Entity";
import { AttributeBuffer, GLPowerVAO } from "../../GLPowerVAO";
import { BLidgeObjectType } from "../../BLidge";
import { GLPowerFrameBuffer } from "../../GLPowerFrameBuffer";
import { Matrix } from "../../Math/Matrix";
import { GLPowerTexture } from "../../GLPowerTexture";
import { FCurveGroup } from "../../Animation/FCurveGroup";
export interface Component {
    [key: string]: any;
}
export declare type ComponentName = 'position' | 'scale' | 'matrix' | 'sceneNode' | 'events' | 'camera' | 'perspective' | "orthographic" | "renderCameraDeferred" | "renderCameraForward" | "renderCameraShadowMap" | 'postprocess' | 'material' | 'materialDepth' | 'geometry' | 'directionalLight' | 'pointLight' | 'blidge' | (string & {});
export declare type ComponentVector2 = {} & IVector2;
export declare type ComponentVector3 = {} & IVector3;
export declare type ComponentVector4 = {} & IVector4;
export declare type ComponentTransformMatrix = {
    local: Matrix;
    world: Matrix;
};
export declare type ComponentSceneNode = {
    parent?: Entity;
    children: Entity[];
};
export declare type RenderType = 'forward' | 'deferred' | 'shadowMap' | 'postprocess';
export declare type Uniforms = {
    [key: string]: {
        value: Uniformable | Uniformable[];
        type: UniformType;
    };
};
export declare type ComponentMaterial = {
    vertexShader: string;
    fragmentShader: string;
    uniforms?: Uniforms;
    renderType?: RenderType;
    defines?: {
        [key: string]: string;
    };
    needsUpdate?: boolean;
    __program?: GLPowerProgram;
};
export declare type ComponentGeometry = {
    attributes: ({
        name: string;
    } & AttributeBuffer)[];
    index: AttributeBuffer;
    needsUpdate?: Map<GLPowerVAO, boolean>;
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
export declare type ComponentCameraOrthographic = {
    width: number;
    height: number;
};
export declare type ComponentRenderCamera = {
    renderTarget: GLPowerFrameBuffer | null;
    postprocess?: ComponentPostProcess;
};
export declare type ComponentShadowmapCamera = {
    renderTarget: GLPowerFrameBuffer;
};
export declare type ComponentLightDirectional = {
    color: IVector3;
    intensity: number;
};
export declare type ComponentLightSpot = {
    color: IVector3;
    intensity: number;
    angle: number;
    blend: number;
    distance: number;
    decay: number;
};
export declare type ComponentPostProcess = (ComponentMaterial & {
    input: GLPowerTexture[];
    renderTarget: GLPowerFrameBuffer | null;
    customGeometry?: ComponentGeometry;
})[];
export declare type ComponentBLidge = {
    name: string;
    type: BLidgeObjectType;
    updateTime?: number;
    curveGroups?: {
        position?: FCurveGroup;
        rotation?: FCurveGroup;
        scale?: FCurveGroup;
        uniforms?: {
            name: string;
            curve: FCurveGroup;
        }[];
    };
};
export declare type ComponentEvents = {
    inited?: boolean;
    onUpdate?: (event: {
        time: number;
        deltaTime: number;
    }) => void;
    onResize?: (event: {
        size: Vector;
    }) => void;
};
//# sourceMappingURL=index.d.ts.map