import EventEmitter from 'wolfy87-eventemitter';
import { Types } from '..';
import { IVector4, Vector } from '../Math/Vector';
import { FCurveGroup } from './FCurveGroup';
export declare type AnimationFrameInfo = {
    start: number;
    end: number;
    duration: number;
};
export declare class AnimationAction extends EventEmitter {
    name: string;
    curves: {
        [key: string]: FCurveGroup;
    };
    private uniforms;
    frame: AnimationFrameInfo;
    constructor(name?: string);
    addFcurveGroup(propertyName: string, fcurveGroup: FCurveGroup): void;
    removeFCurve(propertyName: string): void;
    private calcFrame;
    getFCurveGroup(propertyName: string): FCurveGroup | null;
    assignUniforms(propertyName: string, uniform: any): void;
    getUniforms(propertyName: string): Types.Uniform<IVector4> | null;
    getValue(accessor: string): Vector | null;
    getValue<T extends Types.Nullable<IVector4>>(accessor: string, target: T): T;
    getValueAt<T extends number>(propertyName: string, frame: number): T | null;
    getValueAt<T extends Vector | IVector4>(propertyName: string, frame: number, target: T): T;
    updateFrame(frame: number): void;
}
//# sourceMappingURL=AnimationAction.d.ts.map