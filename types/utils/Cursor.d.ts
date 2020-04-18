import { Vec2 } from "../math/Vec2";
export declare class Cursor {
    onTouchStart: Function;
    onTouchMove: Function;
    onTouchEnd: Function;
    onHover: Function;
    onWheel: Function;
    attenuation: number;
    protected isSP: boolean;
    protected _touchDown: boolean;
    protected _position: Vec2;
    protected _delta: Vec2;
    readonly position: Vec2;
    readonly delta: Vec2;
    constructor();
    getNormalizePosition(windowSize: Vec2): any;
    getRelativePosition(elm: HTMLElement, normalize?: boolean): Vec2;
    protected setPos(x: number, y: number): void;
    protected _MouseEvent(type: string, event: MouseEvent | TouchEvent): void;
    protected wheel(e: MouseWheelEvent): void;
    update(): void;
}
