export declare interface Attribute {
    vertices: number[];
    location?: number;
    stride?: number;
    vbo?: WebGLBuffer;
}
export declare interface Attributes {
    [key: string]: Attribute;
}
export declare class Geometry {
    attributes: Attributes;
    constructor();
    clone(): Geometry;
    addAttributes(name: string, vertices: number[], stride: number): void;
}
