import { Geometry } from "../geometries/Geometry";
import { Material, Uniforms } from "../renderers/Material";
import { Empty } from "./Empty";

export declare interface PowerObjParam{
	geo?: Geometry;
	mat?: Material;
	drawType?: number;
}

export class PowerObj extends Empty {

	public IndividualUniforms: Uniforms;

	public id: number;

	public geometry: Geometry;
	public material: Material;
	public drawType: number;

	constructor( param: PowerObjParam ) {

		super();

		this.geometry = param.geo;
		this.material = param.mat;
		this.drawType = param.drawType;
		this.material = param.mat;

		this.IndividualUniforms = {
			modelViewMatrix: {
				value: this.modelViewMatrix
			},
			invMatrix: {
				value: this.invModelMatrix
			},
			projectionMatrix: {
				value: null
			}
		};

	}

	public get isPowerObj() {

		return true;

	}

}
