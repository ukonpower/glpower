import EventEmitter from "wolfy87-eventemitter";
import { IVector2, IVector3 } from "..";
import { FCurveGroup } from '../Animation/FCurveGroup';
import { FCurveInterpolation } from "../Animation/FCurveKeyFrame";
export declare type BLidgeMessage = BLidgeSyncSceneMessage | BLidgeSyncFrameMessage;
export declare type BLidgeAnimationCurveAxis = 'x' | 'y' | 'z' | 'w';
export declare type BLidgeSyncSceneMessage = {
    type: "sync/scene";
    data: BLidgeSceneData;
};
export declare type BLidgeObjectType = 'empty' | 'cube' | 'sphere' | 'mesh' | 'camera' | 'plane' | 'light';
export declare type BLidgeCameraParams = {
    fov: number;
};
export declare type BLidgeMeshParams = {
    position: number[];
    uv: number[];
    normal: number[];
    index: number[];
};
export declare type BLidgeAnimation = {
    [key: string]: string;
};
export declare type BLidgeMaterialParams = {
    name: string;
    uniforms: BLidgeAnimation;
};
export declare type BLidgeObject = {
    name: string;
    parent: string;
    children: BLidgeObject[];
    animation: BLidgeAnimation;
    position: IVector3;
    rotation: IVector3;
    scale: IVector3;
    type: BLidgeObjectType;
    material: BLidgeMaterialParams;
    camera?: BLidgeCameraParams;
    mesh?: BLidgeMeshParams;
};
export declare type BLidgeSceneData = {
    animations: {
        [key: string]: BLidgeAnimationCurveParam[];
    };
    scene: BLidgeObject;
    frame: BLidgeSceneFrameData;
};
export declare type BLidgeAnimationCurveParam = {
    keyframes: BLidgeAnimationCurveKeyFrameParam[];
    axis: BLidgeAnimationCurveAxis;
};
export declare type BLidgeAnimationCurveKeyFrameParam = {
    c: IVector2;
    h_l: IVector2;
    h_r: IVector2;
    e: string;
    i: FCurveInterpolation;
};
export declare type BLidgeSyncFrameMessage = {
    type: "sync/timeline";
    data: BLidgeSceneFrameData;
};
export declare type BLidgeSceneFrameData = {
    start: number;
    end: number;
    current: number;
};
export declare class BLidge extends EventEmitter {
    private url?;
    private ws?;
    connected: boolean;
    frame: BLidgeSceneFrameData;
    objects: BLidgeObject[];
    curveGroups: FCurveGroup[];
    scene: BLidgeObject | null;
    constructor(url?: string);
    connect(url: string): void;
    syncJsonScene(jsonPath: string): void;
    private onSyncScene;
    private onSyncTimeline;
    private onOpen;
    private onMessage;
    private onClose;
    getCurveGroup(name: string): FCurveGroup | undefined;
    dispose(): void;
    disposeWS(): void;
}
//# sourceMappingURL=index.d.ts.map