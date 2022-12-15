import EventEmitter from 'wolfy87-eventemitter';
import { Types } from '..';
import { IVector4 } from '../Math/Vector';
import { FCurve } from './FCurve';
export declare class FCurveGroup extends EventEmitter {
    name: string;
    private curves;
    frameStart: number;
    frameEnd: number;
    frameDuration: number;
    constructor(name?: string, x?: FCurve, y?: FCurve, z?: FCurve, w?: FCurve);
    setFCurve(curve: FCurve, axis: Types.RecommendString<Types.Axis>): void;
    getValue(frame: number): IVector4 | null;
    getValue<T extends Types.Nullable<IVector4>>(frame: number, target: T): T;
}
//# sourceMappingURL=FCurveGroup.d.ts.map