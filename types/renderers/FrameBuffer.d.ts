import { Texture, TextureParam } from "../textures/Texture";
export declare interface FrameBufferParam extends TextureParam {
}
export declare class FrameBuffer {
    tex: Texture;
    buffer: WebGLFramebuffer;
    constructor(frameBufferParam: FrameBufferParam);
    readonly isFrameBuffer: boolean;
}
