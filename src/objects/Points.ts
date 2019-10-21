import { Geometry } from "../geometries/Geometry";
import { Material, Uniforms } from "../renderers/Material";
import { Empty } from "./Empty";
import { RenderingObject } from "./RenderingObject";

export class Points extends RenderingObject{
	
	constructor( geometry: Geometry, material: Material ){

		super( geometry, material );
	
	}
	
	public get isPoints(){

		return true;

	}

}