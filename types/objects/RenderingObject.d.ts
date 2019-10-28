import { Geometry } from "../geometries/Geometry";
import { Material, Uniforms } from "../renderers/Material";
import { Empty } from "./Empty";
export declare class RenderingObject extends Empty {
    program: WebGLProgram;
    IndividualUniforms: Uniforms;
    geometry: Geometry;
    material: Material;
    constructor(geometry: Geometry, material: Material);
    readonly isRenderingObject: boolean;
}
