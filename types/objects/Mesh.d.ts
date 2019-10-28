import { Geometry } from "../geometries/Geometry";
import { Material } from "../renderers/Material";
import { RenderingObject } from "./RenderingObject";
export declare class Mesh extends RenderingObject {
    constructor(geometry: Geometry, material: Material);
    readonly isMesh: boolean;
}
