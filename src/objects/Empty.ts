import { Vec3 } from "../math/Vec3";
import { Mat4 } from "../math/Mat4";
import { Camera } from "../renderers/Camera";

export class Empty{

	public children: Empty[] = [];
	
	public modelViewMatrix: Mat4;

	public position: Vec3;
	public rotation: Vec3;
	public scale: Vec3;
	
	constructor(){

		this.modelViewMatrix = new Mat4();
		this.position = new Vec3();
		this.rotation = new Vec3();
		this.scale = new Vec3( 1, 1, 1 );

	}
	
	public add( obj: Empty ){

		this.children.push( obj );

	}

	public updateMatrix(){

		// this.modelViewMatrix.createIdentity();

		this.modelViewMatrix.lookAt( new Vec3( 0, 0, 5 ), new Vec3( 0, 0, 0 ), new Vec3( 0, 1, 0 ) ) ;
		this.modelViewMatrix.multiply( new Mat4().createTransformMatrix( this.position, this.rotation, this.scale ) );


	}

}