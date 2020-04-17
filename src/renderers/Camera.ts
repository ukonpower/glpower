import { Empty } from "../objects/Empty";
import { Mat4 } from "../math/Mat4";

export class Camera extends Empty {

	public fov: number;
	public near: number;
	public far: number;
	public aspect: number;

	public projectionMatrix: Mat4;
	public modelMatrixInverse: Mat4;

	constructor( fov: number, near: number, far: number, aspect: number ) {

		super();

		this.fov = fov;
		this.near = near;
		this.far = far;
		this.aspect = aspect;

		this.projectionMatrix = new Mat4();
		this.modelMatrixInverse = new Mat4();

	}

	public updateMatrix() {

		super.updateMatrix();

		this.modelMatrixInverse.copy( this.modelMatrix.clone().inverse() );

		this.projectionMatrix.perspective( this.fov, this.aspect, this.near, this.far );

	}

}
