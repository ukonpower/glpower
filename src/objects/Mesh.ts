import { Geometry } from "../geometries/Geometry";
import { Material, Uniforms } from "../renderers/Material";
import { Empty } from "./Empty";
import { RenderingObject } from "./RenderingObject";

export class Mesh extends RenderingObject{
	
	constructor( geometry: Geometry, material: Material ){

		super( geometry, material );
		
		this.geometry = geometry;
		this.material = material;
		
	}
	
	public get isMesh(){

		return true;

	}

}