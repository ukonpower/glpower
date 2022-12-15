import EventEmitter from "wolfy87-eventemitter";
import { IVector2, IVector3 } from "..";
import { AnimationAction } from "../Animation/AnimationAction";
import { FCurveInterpolation } from "../Animation/FCurveKeyFrame";
export declare type BLidgeMessage = BLidgeSyncSceneMessage | BLidgeSyncFrameMessage;
export declare type BLidgeAnimationCurveAxis = 'x' | 'y' | 'z' | 'w';
export declare type BLidgeSyncSceneMessage = {
    type: "sync/scene";
    data: BLidgeScene;
};
export declare type BLidgeObjectType = 'empty' | 'cube' | 'sphere' | 'mesh' | 'camera' | 'plane';
export declare type BLidgeCameraParams = {
    fov: number;
};
export declare type BLidgeObject = {
    name: string;
    parent: string;
    children: BLidgeObject[];
    actions: string[];
    position: IVector3;
    rotation: IVector3;
    scale: IVector3;
    type: BLidgeObjectType;
    camera?: BLidgeCameraParams;
};
export declare type BLidgeScene = {
    actions: BLidgeAnimationActionParam[];
    scene: BLidgeObject;
};
export declare type BLidgeAnimationActionParam = {
    name: string;
    fcurve_groups: {
        [key: string]: BLidgeAnimationCurveParam[];
    };
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
    data: BLidgeTimelineData;
};
export declare type BLidgeTimelineData = {
    start: number;
    end: number;
    current: number;
};
export declare class BLidge extends EventEmitter {
    private url?;
    private ws?;
    connected: boolean;
    frameCurrent: number;
    frameStart: number;
    frameEnd: number;
    objects: BLidgeObject[];
    actions: AnimationAction[];
    scene: BLidgeObject | null;
    constructor(url?: string);
    connect(url: string): void;
    syncJsonScene(jsonPath: string): void;
    private onSyncScene;
    private onSyncTimeline;
    private onOpen;
    private onMessage;
    private onClose;
    getActionNameList(objectName: string): string[];
    getAction(actionName: string): AnimationAction | null;
    getActionList(objectName: string): AnimationAction[];
    getActionContainsAccessor(accessor: string): AnimationAction | null;
    setTimeline(current: number, start?: number, end?: number): void;
    dispose(): void;
    disposeWS(): void;
}
//# sourceMappingURL=index.d.ts.map