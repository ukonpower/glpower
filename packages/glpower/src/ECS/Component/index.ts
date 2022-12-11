import { Vec3 } from "../../Math/Vector3";
import { Uniformable, UniformType } from "../../GLPowerProgram";
import { Entity } from "../Entity";
import { AttributeBuffer } from "../../GLPowerVAO";
import { Vec2, Vector2 } from "../../Math/Vector2";
import { Vec4 } from "../../Math/Vector4";
import { BLidgeObjectType } from "../../BLidge";
import { AnimationAction } from "../../Animation/AnimationAction";
import { GLPowerFrameBuffer } from "../../GLPowerFrameBuffer";
import { Matrix4 } from "../../Math/Matrix4";

export interface Component {[key:string]: any}

export type BuiltinComponents = ComponentVector2 | ComponentVector3 | ComponentsTransformMatrix

export type ComponentName =
	'position' |
	'rotation' |
	'scale' |
	'matrix' |
	'sceneNode' |
	'camera' |
	'perspective' |
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

export type ComponentsTransformMatrix = {
	local: number[];
	world: number[];
}

// render

export type ComponentSceneNode = {
	parent?: Entity;
	children: Entity[];
}

export type RenderPhase = {
	type: 'forward' | 'deferred' | 'shadowmap';
	renderTarget: GLPowerFrameBuffer | null;
	onResize?: ( size: Vector2, rt: GLPowerFrameBuffer | null, camera: ComponentCamera ) => void
}

export type ComponentCamera = {
	near: number;
	far: number;
	aspectRatio: number;
	projectionMatrix: Matrix4,
	viewMatrix: Matrix4,
	needsUpdate?: boolean;
	renderPhases?: RenderPhase[]
}

export type ComponentCameraPerspective = {
	fov: number;
}

export type ComponentMaterial = {
	vertexShader: string;
	fragmentShader: string;
	uniforms?: {[key:string]: {value: Uniformable | Uniformable[], type: UniformType}}
}

export type ComponentGeometry = {
	attributes: ( {name: string } & AttributeBuffer )[]
	index: AttributeBuffer
	needsUpdate?: boolean
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
