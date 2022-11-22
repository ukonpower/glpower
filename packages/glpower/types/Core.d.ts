import { Program } from "./Program";
import { Buffer } from "./Buffer";
import { Texture } from "./Texture";
export declare class Core {
    gl: WebGL2RenderingContext;
    constructor(gl: WebGL2RenderingContext);
    createProgram(): Program;
    createBuffer(): Buffer;
    createTexture(): Texture;
}
//# sourceMappingURL=Core.d.ts.map