import { Geometry } from "../geometries/Geometry";
import { Material, Uniforms } from "../renderers/Material";
import { Empty } from "./Empty";
export declare interface RenderingObjectParam {
    geo?: Geometry;
    mat?: Material;
    drawType?: number;
}
export declare class RenderingObject extends Empty {
    IndividualUniforms: Uniforms;
    geometry: Geometry;
    material: Material;
    drawType: number;
    constructor(param: RenderingObjectParam);
    readonly isRenderingObject: boolean;
}
