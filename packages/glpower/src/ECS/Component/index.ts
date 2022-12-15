import { IVector2, IVector3, IVector4, Vector } from "../../Math/Vector";
import { Uniformable, UniformType } from "../../GLPowerProgram";
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
	'rotation' |
	'scale' |
	'matrix' |
	'sceneNode' |
	'event' |
	'camera' |
	'perspective' |
	"renderCameraDeferred" |
	"renderCameraForward" |
	'postprocess' |
	'material' |
	'geometry' |
	'directionalLight' |
	'blidge' |
	( string & {} );

// math

export type ComponentVector2 = {
} & IVector2

export type ComponentVector3 = {
} & IVector3

export type ComponentVector4 = {
} & IVector4

export type ComponentTransformMatrix = {
	local: Matrix;
	world: Matrix;
}

export type ComponentEvent = {
	onUpdate: ( event: { time: number, deltaTime: number} ) => void,
}

// render

export type ComponentSceneNode = {
	parent?: Entity;
	children: Entity[];
}

export type RenderType = 'forward' | 'deferred' | 'shadowmap' | 'postprocess';

export type ComponentMaterial = {
	vertexShader: string;
	fragmentShader: string;
	uniforms?: {[key:string]: {value: Uniformable | Uniformable[], type: UniformType}}
	renderType?: RenderType;
}

export type ComponentGeometry = {
	attributes: ( {name: string } & AttributeBuffer )[]
	index: AttributeBuffer
	updateCache?: { [key:string]: boolean }
}

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
	onResize?: ( size: Vector, component: ComponentRenderCamera ) => void,
	postprocess?: ComponentMaterial & { renderTarget: GLPowerFrameBuffer | null}
}

export type ComponentPostProcess = ComponentMaterial & {
	input: GLPowerTexture[];
	renderTarget: GLPowerFrameBuffer | null;
}

export type ComponentDirectionalLight = {
	color: IVector4
}

// blidge

export type ComponentBLidge = {
	name: string
	type: BLidgeObjectType
	updateTime?: number,
	actions?: AnimationAction[]
}
