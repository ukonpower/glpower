export declare class Extensions {
    protected gl: WebGLRenderingContext;
    exts: any;
    constructor(gl: WebGLRenderingContext);
    enableExtension(name: string): void;
    getExt(name: string): any;
}
