export declare interface Attribute {
    vertices: number[];
    location?: number;
    stride?: number;
    vbo?: WebGLBuffer;
    dynamic?: boolean;
}
export declare interface Attributes {
    [key: string]: Attribute;
}
export declare class Geometry {
    attributes: Attributes;
    constructor();
    addAttributes(name: string, vertices: number[], stride: number, dynamic?: boolean): void;
}
