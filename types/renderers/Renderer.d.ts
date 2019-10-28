import { Uniforms } from "./Material";
import { Scene } from "../objects/Scene";
import { Camera } from "./Camera";
import { Geometry } from "../geometries/Geometry";
import { Vec2 } from "../math/Vec2";
import { Vec3 } from "../math/Vec3";
import { Mat4 } from "../math/Mat4";
import { RenderingObject } from "../objects/RenderingObject";
import { Texture } from "../textures/Texture";
export declare interface RendererParam {
    canvas: HTMLCanvasElement;
    retina?: boolean;
}
export declare type Uniformable = number | Vec2 | Vec3 | Mat4 | Texture;
export declare class Renderer {
    protected _gl: WebGLRenderingContext;
    protected _canvas: HTMLCanvasElement;
    protected pixelRatio: number;
    protected isRetina: boolean;
    protected attributeCnt: number;
    protected textureCnt: number;
    constructor(param: RendererParam);
    protected initContext(canvas: HTMLCanvasElement): void;
    setSize(width: number, height: number): void;
    protected createProgram(obj: RenderingObject): void;
    protected createShader(src: string, type: number): WebGLShader;
    protected createAttributes(obj: RenderingObject): void;
    protected createBufferObject(vertices: number[], isIndex?: boolean): WebGLBuffer;
    protected setAttributes(geo: Geometry): void;
    protected clearAttributes(): void;
    protected createUniforms(program: WebGLProgram, uniforms: Uniforms): void;
    protected applyUniforms(uniforms: Uniforms): void;
    protected setUniform(location: WebGLUniformLocation, value: Uniformable): void;
    protected createTexture(texture: Texture): {
        texture: WebGLTexture;
        unitID: number;
    };
    protected renderObject(obj: RenderingObject, camera: Camera): void;
    render(scene: Scene, camera: Camera): void;
}
