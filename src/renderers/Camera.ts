import { Empty } from "../objects/Empty";
import { Mat4 } from "../math/Mat4";

export class Camera extends Empty{

	protected fov: number;
	protected near: number;
	protected far: number;
	
	public projectionMatrix: Mat4;
	public modelMatrixInverse: Mat4;
	
	constructor( fov: number, near: number, far: number ){
	
		super();

		this.fov = fov;
		this.near = near;
		this.far = far;
		
		this.projectionMatrix = new Mat4();
		this.modelMatrixInverse = new Mat4();
		
	}

	public updateMatrix(){

		super.updateMatrix();

		this.modelMatrixInverse.copy( this.modelMatrix.clone().inverse() );

		this.projectionMatrix.perspective( this.fov, window.innerWidth / window.innerHeight, this.near, this.far );		

	}

}