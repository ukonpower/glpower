import { Empty } from "../objects/Empty";
import { Mat4 } from "../math/Mat4";

export class Camera extends Empty{

	private fov: number;
	private near: number;
	private far: number;
	
	public projectionMatrix: Mat4;
	
	constructor( fov: number, near: number, far: number ){
	
		super();

		this.fov = fov;
		this.near = near;
		this.far = far;
		
		this.projectionMatrix = new Mat4();
		
	}

	public updateMatrix(){

		super.updateMatrix();

		this.projectionMatrix.perspective( 50, window.innerWidth / window.innerHeight, this.near, this.far );		

	}

}