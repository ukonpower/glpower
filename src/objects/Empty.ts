	import { Vec3 } from "../math/Vec3";
import { Mat4 } from "../math/Mat4";
import { Camera } from "../renderers/Camera";

export class Empty{

	public children: Empty[];
	
	public modelMatrix: Mat4;
	public modelViewMatrix: Mat4;

	public position: Vec3;
	public rotation: Vec3;
	public scale: Vec3;
	
	constructor(){

		this.children = [];
		
		this.modelMatrix = new Mat4();
		this.modelViewMatrix = new Mat4();

		this.position = new Vec3();
		this.rotation = new Vec3();
		this.scale = new Vec3( 1, 1, 1 );

	}
	
	public add( obj: Empty ){

		this.children.push( obj );

	}

	public updateMatrix(){

		this.modelMatrix.cTransform( this.position, this.rotation, this.scale );

	}

}