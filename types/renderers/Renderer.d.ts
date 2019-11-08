import { Extensions } from './Extensions';
import { Uniforms } from "./Material";
import { Scene } from "../objects/Scene";
import { Camera } from "./Camera";
import { Geometry, Attribute } from "../geometries/Geometry";
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
    ext: Extensions;
    protected _canvas: HTMLCanvasElement;
    protected pixelRatio: number;
    protected isRetina: boolean;
    protected attributeCnt: number;
    protected textureCnt: number;
    protected renderTarget: FrameBuffer;
    protected instancingExt: ANGLE_instanced_arrays;
    constructor(param: RendererParam);
    protected initContext(canvas: HTMLCanvasElement): void;
    setSize(width: number, height: number): void;
    protected cPrg(obj: RenderingObject): void;
    protected cShader(src: string, type: number): WebGLShader;
    protected cAttr(obj: RenderingObject): void;
    protected cVBO(attr: Attribute, isIndex?: boolean): WebGLBuffer;
    protected setAttr(geo: Geometry): void;
    protected clearAttr(): void;
    protected cUni(program: WebGLProgram, uniforms: Uniforms): void;
    protected applyUniforms(uniforms: Uniforms): void;
    protected setUniform(location: WebGLUniformLocation, value: Uniformable): void;
    protected cTex(texture: Texture): void;
    protected renderObject(obj: RenderingObject, camera: Camera): void;
    setFrameBuffer(frameBuffer: FrameBuffer): void;
    protected cFBuffer(frameBuffer: FrameBuffer): void;
    render(scene: Scene, camera: Camera): void;
}
