import EventEmitter from 'wolfy87-eventemitter';
import { IVector2 } from '..';
export declare type FCurveInterpolation = "BEZIER" | "LINEAR";
export declare class FCurveKeyFrame extends EventEmitter {
    coordinate: IVector2;
    handleLeft: IVector2;
    handleRight: IVector2;
    interpolation: FCurveInterpolation;
    private easing;
    private nextFrame;
    constructor(coordinate: IVector2, handleLeft?: IVector2, handleRight?: IVector2, interpolation?: FCurveInterpolation);
    set(coordinate: IVector2, handleLeft?: IVector2, handleRight?: IVector2, interpolation?: FCurveInterpolation): void;
    private getEasing;
    to(nextFrame: FCurveKeyFrame, t: number): any;
}
//# sourceMappingURL=FCurveKeyFrame.d.ts.map