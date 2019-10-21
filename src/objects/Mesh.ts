import { Geometry } from "../geometries/Geometry";
import { Material } from "../renderers/Material";
import { Empty } from "./Empty";

export class Mesh extends Empty{

	public geometry: Geometry;
	public material: Material;
	
	constructor( geometry: Geometry, material: Material ){

		super();
		
		this.geometry = geometry;
		this.material = material;
		
		this.material.uniforms.modelViewMatrix = {
			value: this.modelViewMatrix
		}

		this.material.uniforms.projectionMatrix = {
			value: null
		}
		
	}
	
	public get isMesh(){

		return true;

	}

}