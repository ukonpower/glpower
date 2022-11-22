export declare class Texture {
    private gl;
    private image;
    private texture;
    constructor(gl: WebGL2RenderingContext);
    load(src: string): void;
    active(unitId: number): void;
    getTexture(): WebGLTexture | null;
}
//# sourceMappingURL=Texture.d.ts.map