import { Vector } from "./Math/Vector";
import { Types } from "./types";
declare type ImagePretense = {
    width: number;
    height: number;
    data?: any;
};
export declare type GLPowerTextureSetting = {
    type: number;
    internalFormat: number;
    format: number;
    magFilter: number;
    minFilter: number;
    generateMipmap: boolean;
    wrapS: number;
    wrapT: number;
};
export declare class GLPowerTexture {
    unit: number;
    image: HTMLImageElement | HTMLImageElement[] | ImagePretense | null;
    size: Vector;
    protected gl: WebGL2RenderingContext;
    protected glTex: WebGLTexture | null;
    protected textureType: number;
    protected _setting: GLPowerTextureSetting;
    constructor(gl: WebGL2RenderingContext);
    get isTexture(): boolean;
    setting(param?: Types.Nullable<GLPowerTextureSetting>): this;
    attach(img: HTMLImageElement | ImagePretense | null | HTMLImageElement[]): this;
    activate(unitNumber: number): this;
    load(src: string, callBack?: () => void): this;
    getTexture(): WebGLTexture | null;
    get type(): number;
    dispose(): void;
}
export {};
//# sourceMappingURL=GLPowerTexture.d.ts.map