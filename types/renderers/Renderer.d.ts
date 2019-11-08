import { Uniforms } from "./Material";
import { Scene } from "../objects/Scene";
import { Camera } from "./Camera";
import { Geometry } from "../geometries/Geometry";
import { Vec2 } from "../math/Vec2";
import { Vec3 } from "../math/Vec3";
import { Mat4 } from "../math/Mat4";
import { RenderingObject } from "../objects/RenderingObject";
import { Texture } from "../textures/Texture";
import { FrameBuffer } from "./FrameBuffer";
export declare interface RendererParam {
    canvas: HTMLCanvasElement;
    retina?: boolean;
}
export declare type Uniformable = number | Vec2 | Vec3 | Mat4 | Texture | FrameBuffer;
export declare class Renderer {
    gl: WebGLRenderingContext;
    protected _canvas: HTMLCanvasElement;
    protected pixelRatio: number;
    protected isRetina: boolean;
    protected attributeCnt: number;
    protected textureCnt: number;
    protected renderTarget: FrameBuffer;
    constructor(param: RendererParam);
    protected initContext(canvas: HTMLCanvasElement): void;
    setSize(width: number, height: number): void;
    protected cPrg(obj: RenderingObject): void;
    protected cShader(src: string, type: number): WebGLShader;
    protected cAttr(obj: RenderingObject): void;
    protected cVBO(vertices: number[], isIndex?: boolean): WebGLBuffer;
    protected setAttributes(geo: Geometry): void;
    protected clearAttributes(): void;
    protected cUni(program: WebGLProgram, uniforms: Uniforms): void;
    protected applyUniforms(uniforms: Uniforms): void;
    protected setUniform(location: WebGLUniformLocation, value: Uniformable): void;
    protected cTex(texture: Texture): void;
    protected renderObject(obj: RenderingObject, camera: Camera): void;
    setFrameBuffer(frameBuffer: FrameBuffer): void;
    protected cFBuffer(frameBuffer: FrameBuffer): void;
    render(scene: Scene, camera: Camera): void;
}
