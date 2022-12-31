import { IVector2, IVector3, IVector4, Vector } from "../../Math/Vector";
import { GLPowerProgram, Uniformable, UniformType } from "../../GLPowerProgram";
import { Entity } from "../Entity";
import { AttributeBuffer } from "../../GLPowerVAO";
import { BLidgeObjectType } from "../../BLidge";
import { AnimationAction } from "../../Animation/AnimationAction";
import { GLPowerFrameBuffer } from "../../GLPowerFrameBuffer";
import { Matrix } from "../../Math/Matrix";
import { GLPowerTexture } from "../../GLPowerTexture";

export interface Component {[key:string]: any}

export type ComponentName =
	'position' |
	'scale' |
	'matrix' |
	'sceneNode' |
	'events' |
	'camera' |
	'perspective' |
	"renderCameraDeferred" |
	"renderCameraForward" |
	'postprocess' |
	'material' |
	'geometry' |
	'directionalLight' |
	'pointLight' |
	'blidge' |
	( string & {} );

/*-------------------------------
	Math
-------------------------------*/

export type ComponentVector2 = {
} & IVector2

export type ComponentVector3 = {
} & IVector3

export type ComponentVector4 = {
} & IVector4

/*-------------------------------
	Object
-------------------------------*/

export type ComponentTransformMatrix = {
	local: Matrix;
	world: Matrix;
}

export type ComponentSceneNode = {
	parent?: Entity;
	children: Entity[];
}

/*-------------------------------
	Mesh
-------------------------------*/

export type RenderType = 'forward' | 'deferred' | 'shadowmap' | 'postprocess';

export type ComponentMaterial = {
	vertexShader: string;
	fragmentShader: string;
	uniforms?: {[key:string]: {value: Uniformable | Uniformable[], type: UniformType}}
	renderType?: RenderType;
	defines?: {[key: string]: string}
	needsUpdate?: boolean;
	__program?: GLPowerProgram
}

export type ComponentGeometry = {
	attributes: ( {name: string } & AttributeBuffer )[]
	index: AttributeBuffer
	needsUpdate?: { [key:string]: boolean }
}

/*-------------------------------
	Camera
-------------------------------*/

export type ComponentCamera = {
	near: number;
	far: number;
	aspectRatio: number;
	projectionMatrix: Matrix,
	viewMatrix: Matrix,
	needsUpdate?: boolean;
}

export type ComponentCameraPerspective = {
	fov: number;
}

export type ComponentRenderCamera = {
	renderTarget: GLPowerFrameBuffer | null;
	postprocess?: ComponentPostProcess
}

/*-------------------------------
	Light
-------------------------------*/

export type ComponentLightDirection = {
	color: IVector3,
	intensity: number
}

export type ComponentLightPoint = {
	color: IVector3,
	intensity: number
}

/*-------------------------------
	PostProcess
-------------------------------*/

export type ComponentPostProcess = ( ComponentMaterial & {
	input: GLPowerTexture[];
	renderTarget: GLPowerFrameBuffer | null;
	customGeometry?: ComponentGeometry;
} )[]

/*-------------------------------
	BLidge
-------------------------------*/

export type ComponentBLidge = {
	name: string
	type: BLidgeObjectType
	updateTime?: number,
	actions?: AnimationAction[]
}

/*-------------------------------
	Event
-------------------------------*/

export type ComponentEvents = {
	inited?: boolean
	onUpdate?: ( event: { time: number, deltaTime: number} ) => void,
	onResize?: ( event: { size: Vector } ) => void,
}
