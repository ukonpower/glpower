import { Program } from "./GLPowerProgram";
import { Buffer } from "./GLPowerBuffer";
import { Texture } from "./GLPowerTexture";
export declare class Core {
    gl: WebGL2RenderingContext;
    constructor(gl: WebGL2RenderingContext);
    createProgram(): Program;
    createBuffer(): Buffer;
    createTexture(): Texture;
}
//# sourceMappingURL=Core.d.ts.map