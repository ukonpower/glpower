import { Cursor } from '../utils/Cursor';
import { BaseScene } from './BaseScene';
import { Vec2 } from '../math/Vec2';
import { Renderer, RendererParam } from '../renderers/Renderer';
export declare interface ControllerParam extends RendererParam {
    retina?: boolean;
    silent?: boolean;
}
export declare interface ResizeArgs {
    aspectRatio: number;
    windowSize: Vec2;
    rendererSize: Vec2;
}
export declare interface GlobalProperties {
    renderer: Renderer;
    cursor: Cursor;
    resizeArgs: ResizeArgs;
}
export declare class Controller {
    currentScene: BaseScene;
    renderer: Renderer;
    cursor: Cursor;
    protected timeMem: number;
    gProps: GlobalProperties;
    constructor(parameter: ControllerParam);
    protected tick(): void;
    bindScene(scene: BaseScene): void;
    protected onWindowResize(): void;
    onOrientationDevice(): void;
    onTouchStart(e: MouseEvent): void;
    onTouchMove(e: MouseEvent): void;
    onTouchEnd(e: MouseEvent): void;
    onHover(): void;
    onWheel(e: WheelEvent): void;
}
