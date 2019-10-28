export declare interface TextureParam {
    texturePath?: string;
    wrapS?: number;
    wrapT?: number;
    magFilter?: number;
    minFilter?: number;
}
export declare class Texture {
    unitID: number;
    wrapS: number;
    wrapT: number;
    magFilter: number;
    minFilter: number;
    image: HTMLImageElement;
    webglTex: WebGLTexture;
    constructor(param?: TextureParam);
    loadImg(path: string, callBack: (tex: Texture) => void): void;
    readonly isTexture: boolean;
}
