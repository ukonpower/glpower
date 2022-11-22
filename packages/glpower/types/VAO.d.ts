import { Buffer } from "./Buffer";
export declare type Attribute = {
    array: number[];
    size: number;
};
export declare type AttributeBuffer = {
    buffer: Buffer;
    size: number;
    count: number;
};
export declare type AttributeBufferWithLocation = {
    location: number | null;
} & AttributeBuffer;
export declare class VAO {
    private gl;
    vao: WebGLVertexArrayObject | null;
    program: WebGLProgram;
    protected indexBuffer: Buffer | null;
    protected attributes: {
        [key: string]: AttributeBufferWithLocation;
    };
    vertCount: number;
    constructor(gl: WebGL2RenderingContext, program: WebGLProgram);
    setAttribute(name: string, buffer: Buffer, size: number, count: number): this;
    removeAttribute(name: string): this;
    updateAttributes(force?: boolean): void;
    setIndex(indexBuffer: Buffer | null): void;
    getVAO(): WebGLVertexArrayObject | null;
}
//# sourceMappingURL=VAO.d.ts.map