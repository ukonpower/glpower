export declare interface OUniform {
    value: any;
    location?: WebGLUniformLocation;
}
export declare interface Uniforms {
    [key: string]: OUniform;
}
export declare interface MaterialParam {
    frag: string;
    vert: string;
    uniforms?: Uniforms;
    side?: number;
}
export declare class Material {
    uniforms: Uniforms;
    frag: string;
    vert: string;
    side: number;
    constructor(param: MaterialParam);
    clone(): Material;
}
