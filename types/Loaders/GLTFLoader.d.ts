export declare interface AttrParam {
    size: number;
    array: [];
}
export declare interface GLTF {
    [key: string]: {
        [key: string]: AttrParam;
    };
}
export declare class GLTFLoader {
    constructor();
    load(path: string, callBack?: (gltf: GLTF) => void): void;
}
