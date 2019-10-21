import { Geometry } from "../geometries/Geometry";
import { Material, Uniforms } from "../renderers/Material";
import { Empty } from "./Empty";

export class RenderingObject extends Empty{

	public program: WebGLProgram;
	public IndividualUniforms: Uniforms;

	public geometry: Geometry;
	public material: Material;
	
	constructor( geometry: Geometry, material: Material ){

		super();
		
		this.geometry = geometry;
		this.material = material;

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