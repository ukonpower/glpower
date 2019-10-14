import { Vec3 } from "../math/Vec3";

export class Empty{

	public children: Empty[] = [];
	
	public position: Vec3;
	public rotation: any;
	
	constructor(){

		this.position = new Vec3();
		this.rotation = new Vec3();

	}

	public add( obj: Empty ){

		this.children.push( obj );

	}

}