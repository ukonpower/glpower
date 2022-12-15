import { Vec3 } from "../../Math/Vector3";
import { Uniformable, UniformType } from "../../GLPowerProgram";
import { Entity } from "../Entity";
import { AttributeBuffer } from "../../GLPowerVAO";
import { Vec2, Vector2 } from "../../Math/Vector2";
import { Vec4 } from "../../Math/Vector4";
import { BLidgeObjectType } from "../../BLidge";
import { AnimationAction } from "../../Animation/AnimationAction";
import { GLPowerFrameBuffer } from "../../GLPowerFrameBuffer";
import { Matrix } from "../../Math/Matrix";
import { GLPowerTexture } from "../../GLPowerTexture";

export interface Component {[key:string]: any}

export type BuiltinComponents = ComponentVector2 | ComponentVector3 | ComponentTransformMatrix

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
} & Vec2

export type ComponentVector3 = {
} & Vec3

export type ComponentVector4 = {
} & Vec4

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
	onResize?: ( size: Vector2, component: ComponentRenderCamera ) => void,
	postprocess?: ComponentMaterial & { renderTarget: GLPowerFrameBuffer | null}
}

export type ComponentPostProcess = ComponentMaterial & {
	input: GLPowerTexture[];
	renderTarget: GLPowerFrameBuffer | null;
}

export type ComponentDirectionalLight = {
	color: Vec3
}

// blidge

export type ComponentBLidge = {
	name: string
	type: BLidgeObjectType
	updateTime?: number,
	actions?: AnimationAction[]
}
