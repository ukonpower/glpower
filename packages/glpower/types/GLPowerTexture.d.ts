import { Vector } from "./Math/Vector";
import { Types } from "./types";
declare type ImagePretense = {
    width: number;
    height: number;
};
declare type GLPowerTextureSetting = {
    type: number;
    internalFormat: number;
    format: number;
    magFilter: number;
    minFilter: number;
    generateMipmap: boolean;
};
export declare class GLPowerTexture {
    unit: number;
    image: HTMLImageElement | ImagePretense | null;
    size: Vector;
    private gl;
    private texture;
    private _setting;
    constructor(gl: WebGL2RenderingContext);
    setting(param: Types.Nullable<GLPowerTextureSetting>): this;
    attach(img: HTMLImageElement | ImagePretense | null): this;
    activate(unitNumber: number): this;
    load(src: string, callBack?: () => void): this;
    getTexture(): WebGLTexture | null;
    loadAsync(src: string): Promise<unknown>;
}
export {};
//# sourceMappingURL=GLPowerTexture.d.ts.map