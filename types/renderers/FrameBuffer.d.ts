import { Texture, TextureParam } from "../textures/Texture";
export declare interface FrameBufferParam extends TextureParam {
}
export declare class FrameBuffer {
    texture: Texture;
    buffer: WebGLFramebuffer;
    constructor(frameBufferParam: FrameBufferParam);
    readonly isFrameBuffer: boolean;
}
