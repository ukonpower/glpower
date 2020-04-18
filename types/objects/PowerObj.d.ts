import { Geometry } from "../geometries/Geometry";
import { Material, Uniforms } from "../renderers/Material";
import { Empty } from "./Empty";
export declare class PowerObj extends Empty {
    IndividualUniforms: Uniforms;
    id: number;
    geometry: Geometry;
    material: Material;
    drawType: number;
    constructor(geo?: Geometry, mat?: Material, drawType?: number);
    readonly isPowerObj: boolean;
}
