import { GLPowerTextureCube } from "./GLPowerTextureCube";
import { GLPowerFrameBfferOpt, GLPowerFrameBuffer } from ".";
export declare class GLPowerFrameBufferCube extends GLPowerFrameBuffer {
    private cubeTarget;
    textures: GLPowerTextureCube[];
    currentFace: number;
    constructor(gl: WebGL2RenderingContext, opt?: GLPowerFrameBfferOpt);
    setTexture(textures: GLPowerTextureCube[]): this;
    face(face: number): void;
}
//# sourceMappingURL=GLPowerFrameBufferCube.d.ts.map