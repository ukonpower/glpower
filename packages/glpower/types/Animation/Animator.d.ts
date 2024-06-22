import { UniformType } from "../GLPowerProgram";
import { Vector } from "../Math/Vector";
import { EventEmitter } from "../utils/EventEmitter";
import { EasingFunc } from "./Easings";
import { LerpFunc } from "./Lerps";
export declare type AnimatorVariableType = Vector | number;
export declare interface AnimatorVariable<T> {
    time: number;
    duration: number;
    value: T;
    type: UniformType;
    valueStart: T;
    valueEnd: T;
    easingFunc: EasingFunc;
    lerpFunc: LerpFunc<T>;
    animating: boolean;
    onFinish?: () => void;
    userData?: any;
}
export declare class Animator extends EventEmitter {
    protected variables: Map<string, AnimatorVariable<AnimatorVariableType>>;
    constructor();
    add(name: string, init: AnimatorVariableType, easing?: EasingFunc, type?: UniformType): void;
    get<T extends AnimatorVariableType>(name: string): AnimatorVariable<T> | null;
    getValue<T extends AnimatorVariableType>(name: string): T | null;
    cancel(name: string): void;
    animate(name: string, value: AnimatorVariableType, duration?: number, cb?: () => void): void;
    update(deltaTime: number): void;
}
//# sourceMappingURL=Animator.d.ts.map