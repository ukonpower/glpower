import { GLPowerBuffer, TArrayBuffer } from "./GLPowerBuffer";
export declare type Attribute = {
    array: TArrayBuffer;
    size: number;
};
export declare type AttributeOptions = {
    instanceDivisor?: number;
};
export declare type AttributeBuffer = {
    buffer: GLPowerBuffer;
    size: number;
    count: number;
    location?: number;
} & AttributeOptions;
export declare class GLPowerVAO {
    private gl;
    vao: WebGLVertexArrayObject | null;
    program: WebGLProgram;
    indexBuffer: GLPowerBuffer | null;
    protected attributes: Map<string, AttributeBuffer>;
    vertCount: number;
    indexCount: number;
    instanceCount: number;
    constructor(gl: WebGL2RenderingContext, program: WebGLProgram);
    setAttribute(name: string, buffer: GLPowerBuffer, size: number, opt?: AttributeOptions): this;
    removeAttribute(name: string): this;
    updateAttributes(force?: boolean): void;
    setIndex(indexBuffer: GLPowerBuffer | null): void;
    use(cb?: (vao: GLPowerVAO) => void): void;
    getVAO(): WebGLVertexArrayObject | null;
    dispose(): void;
}
//# sourceMappingURL=GLPowerVAO.d.ts.map