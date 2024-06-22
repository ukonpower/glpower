import { GLPowerTexture } from "./GLPowerTexture";
declare type ImagePretense = {
    width: number;
    height: number;
    data?: any;
};
export declare class GLPowerTextureCube extends GLPowerTexture {
    private cubeTarget;
    constructor(gl: WebGL2RenderingContext);
    attach(img: HTMLImageElement[] | ImagePretense | null): this;
}
export {};
//# sourceMappingURL=GLPowerTextureCube.d.ts.map