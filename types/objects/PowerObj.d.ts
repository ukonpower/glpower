import { Geometry } from "../geometries/Geometry";
import { Material, Uniforms } from "../renderers/Material";
import { Empty } from "./Empty";
export declare interface PowerObjParam {
    geo?: Geometry;
    mat?: Material;
    drawType?: number;
}
export declare class PowerObj extends Empty {
    IndividualUniforms: Uniforms;
    id: number;
    geometry: Geometry;
    material: Material;
    drawType: number;
    constructor(param: PowerObjParam);
    readonly isPowerObj: boolean;
}
