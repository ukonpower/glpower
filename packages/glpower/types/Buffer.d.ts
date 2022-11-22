export declare type BufferType = 'vbo' | 'ibo';
export declare type TArrayBuffer = Uint8Array | Uint16Array | Uint32Array | Float32Array | Float64Array;
export declare class Buffer {
    private gl;
    buffer: WebGLBuffer | null;
    constructor(gl: WebGL2RenderingContext);
    setData(data: TArrayBuffer, type?: BufferType, usage?: number): this;
}
//# sourceMappingURL=Buffer.d.ts.map