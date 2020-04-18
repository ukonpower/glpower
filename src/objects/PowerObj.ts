import { Geometry } from "../geometries/Geometry";
import { Material, Uniforms } from "../renderers/Material";
import { Empty } from "./Empty";

export class PowerObj extends Empty {

	public IndividualUniforms: Uniforms;

	public id: number;

	public geometry: Geometry;
	public material: Material;
	public drawType: number;

	constructor( geo?: Geometry, mat?: Material, drawType?: number ) {

		super();

		this.geometry = geo;
		this.material = mat;
		this.drawType = drawType;

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
