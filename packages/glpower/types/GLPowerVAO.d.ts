import { GLPowerBuffer } from "./GLPowerBuffer";
export declare type Attribute = {
    array: number[];
    size: number;
};
export declare type AttributeBuffer = {
    buffer: GLPowerBuffer;
    size: number;
    count: number;
    location?: number;
    instanceDivisor?: number;
};
export declare class GLPowerVAO {
    private gl;
    vao: WebGLVertexArrayObject | null;
    program: WebGLProgram;
    protected indexBuffer: GLPowerBuffer | null;
    protected attributes: {
        [key: string]: AttributeBuffer;
    };
    vertCount: number;
    indexCount: number;
    constructor(gl: WebGL2RenderingContext, program: WebGLProgram);
    setAttribute(name: string, buffer: GLPowerBuffer, size: number, instanceDivisor?: number): this;
    removeAttribute(name: string): this;
    updateAttributes(force?: boolean): void;
    setIndex(indexBuffer: GLPowerBuffer | null): void;
    getVAO(): WebGLVertexArrayObject | null;
}
//# sourceMappingURL=GLPowerVAO.d.ts.map