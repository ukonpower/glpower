import { Material } from "./Material";
import { Geometry } from "./Geometry";

export class Mesh{

	private geometry: Geometry;
	private material: Material;
	
	constructor( geometry: Geometry, material: Material ){
		
		this.geometry = geometry;
		this.material = material;
		
	}

}