import { Geometry } from "../geometries/Geometry";
import { Material, Uniforms } from "../renderers/Material";
import { Empty } from "./Empty";

export declare interface RenderingObjectParam{
	geo: Geometry;
	mat: Material;
	drawType?: number;
}

export class RenderingObject extends Empty{

	public program: WebGLProgram;
	public IndividualUniforms: Uniforms;

	public geometry: Geometry;
	public material: Material;
	public drawType: number;
	
	constructor( param: RenderingObjectParam ){

		super();
		
		this.geometry = param.geo;
		this.material = param.mat;
		this.drawType = param.drawType;

		this.IndividualUniforms = {
			modelViewMatrix: {
				value: this.modelViewMatrix
			},
			projectionMatrix: {
				value: null
			}
		};
		
	}
	
	public get isRenderingObject(){

		return true;

	}

}