export declare interface TextureParam {
    texturePath?: string;
    wrapS?: number;
    wrapT?: number;
    magFilter?: number;
    minFilter?: number;
    width?: number;
    height?: number;
}
export declare class Texture {
    unitID: number;
    wrapS: number;
    wrapT: number;
    magFilter: number;
    minFilter: number;
    image: HTMLImageElement;
    width: number;
    height: number;
    webglTex: WebGLTexture;
    needUpdate: boolean;
    constructor(param?: TextureParam);
    loadImg(path: string, callBack?: (tex: Texture) => void): this;
    readonly isTexture: boolean;
}
