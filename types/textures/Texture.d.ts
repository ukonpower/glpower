export declare interface TextureParam {
    wrapS?: number;
    wrapT?: number;
    magFilter?: number;
    minFilter?: number;
    width?: number;
    height?: number;
    texType?: number;
}
export declare class Texture {
    unitID: number;
    id: number;
    glTex: WebGLTexture;
    image: HTMLImageElement;
    texType: number;
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
