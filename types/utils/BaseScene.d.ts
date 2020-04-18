import { Cursor } from '../utils/Cursor';
import { GlobalProperties, ResizeArgs } from './Controller';
import { Renderer } from '../renderers/Renderer';
import { Scene } from '../objects/Scene';
import { Camera } from '../renderers/Camera';
export declare class BaseScene {
    gProps: GlobalProperties;
    name: string;
    gl: WebGLRenderingContext;
    renderer: Renderer;
    scene: Scene;
    camera: Camera;
    time: number;
    constructor();
    tick(deltaTime: number): void;
    animate(deltaTime: number): void;
    onBind(gProps: GlobalProperties): void;
    onResize(args: ResizeArgs): void;
    onTouchStart(cursor: Cursor, event: MouseEvent): void;
    onTouchMove(cursor: Cursor, event: MouseEvent): void;
    onTouchEnd(cursor: Cursor, event: MouseEvent): void;
    onHover(cursor: Cursor): void;
    onWheel(event: WheelEvent): void;
}
