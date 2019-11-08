export declare interface TextureParam {
    wrapS?: number;
    wrapT?: number;
    magFilter?: number;
    minFilter?: number;
    width?: number;
    height?: number;
    textureType?: number;
}
export declare class Texture {
    unitID: number;
    webglTex: WebGLTexture;
    image: HTMLImageElement;
    textureType: number;
    wrapS: number;
    wrapT: number;
    magFilter: number;
    minFilter: number;
    width: number;
    height: number;
    needUpdate: boolean;
    constructor(param?: TextureParam);
    loadImg(path: string, callBack?: (tex: Texture) => void): this;
    readonly isTexture: boolean;
}
