import { Matrix4 } from "./Math/Matrix4";
import { Vector2 } from "./Math/Vector2";
import { Vector3 } from "./Math/Vector3";
import { VAO } from "./GLPowerVAO";
export declare type Uniformable = boolean | number | Vector2 | Vector3 | Matrix4;
export declare type UniformType = '1f' | '1fv' | '2f' | '2fv' | '3f' | '3fv' | '4f' | '4fv' | '1i' | '1iv' | '2i' | '2iv' | '3i' | '3iv' | '4i' | '4iv' | 'Matrix2fv' | 'Matrix3fv' | 'Matrix4fv';
export declare type Uniform = {
    location: WebGLUniformLocation | null;
    value: (number | boolean)[];
    type: string;
    cache?: (number | boolean)[];
    needsUpdate?: boolean;
};
export declare class Program {
    gl: WebGL2RenderingContext;
    program: WebGLProgram | null;
    private vao;
    protected uniforms: Map<string, Uniform>;
    constructor(gl: WebGL2RenderingContext);
    setShader(vertexShaderSrc: string, fragmentShaderSrc: string): this | undefined;
    protected createShader(shaderSrc: string, type: number): WebGLShader | null;
    setUniform(name: string, type: UniformType, value: (number | boolean)[]): void;
    private updateUniformLocations;
    uploadUniforms(): void;
    getVAO(id?: string): VAO | null;
    use(): void;
    clean(): void;
    getProgram(): WebGLProgram | null;
}
//# sourceMappingURL=Program.d.ts.map