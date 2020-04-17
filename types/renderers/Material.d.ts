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
    culling?: number;
    depthTest?: boolean;
    depthFunc?: number;
    blendSrc?: number;
    blendDst?: number;
}
export declare class Material {
    programs: {
        [key: string]: WebGLProgram;
    };
    uniforms: Uniforms;
    frag: string;
    vert: string;
    culling: number;
    depthTest: boolean;
    depthFunc: number;
    blendSrc: number;
    blendDst: number;
    needUpdate: boolean;
    constructor(param: MaterialParam);
}
