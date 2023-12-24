import { GLPowerTexture } from "./GLPowerTexture";
import { Vector } from "./Math/Vector";
export declare type GLPowerFrameBfferOpt = {
    disableDepthBuffer?: boolean;
};
export declare class GLPowerFrameBuffer {
    size: Vector;
    private gl;
    frameBuffer: WebGLFramebuffer | null;
    textures: GLPowerTexture[];
    depthTexture: GLPowerTexture | null;
    textureAttachmentList: number[];
    constructor(gl: WebGL2RenderingContext, opt?: GLPowerFrameBfferOpt);
    setDepthTexture(depthTexture: GLPowerTexture | null): void;
    setTexture(textures: GLPowerTexture[]): this;
    setSize(size: Vector): GLPowerFrameBuffer;
    setSize(width: number, height: number): GLPowerFrameBuffer;
    getFrameBuffer(): WebGLFramebuffer | null;
    dispose(): void;
}
//# sourceMappingURL=GLPowerFrameBuffer.d.ts.map