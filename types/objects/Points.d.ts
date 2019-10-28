import { Geometry } from "../geometries/Geometry";
import { Material } from "../renderers/Material";
import { RenderingObject } from "./RenderingObject";
export declare class Points extends RenderingObject {
    constructor(geometry: Geometry, material: Material);
    readonly isPoints: boolean;
}
