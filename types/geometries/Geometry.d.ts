export declare interface Attribute {
    vert: number[];
    instancing?: boolean;
    location?: number;
    stride?: number;
    vbo?: WebGLBuffer;
}
export declare interface Attributes {
    [key: string]: Attribute;
}
export declare class Geometry {
    attributes: Attributes;
    instancing: boolean;
    instancingCnt: number;
    constructor();
    add(name: string, vert: number[], stride: number, instancing?: boolean): void;
}
