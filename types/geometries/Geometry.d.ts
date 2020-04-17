export declare interface Attribute {
    vert: number[];
    instancing?: boolean;
    location?: number;
    stride?: number;
    vbo?: WebGLBuffer;
    divisor?: number;
}
export declare interface Attributes {
    [key: string]: Attribute;
}
export declare class Geometry {
    attributes: Attributes;
    vertCnt: number;
    instancing: boolean;
    instancingCnt: number;
    constructor();
    add(name: string, vert: number[], stride: number, instancing?: boolean, divisor?: number): void;
}
