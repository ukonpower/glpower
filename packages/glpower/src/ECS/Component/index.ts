import { Vec3 } from "../../Math/Vector3";
import { Uniform, Uniformable, UniformType } from "../../GLPowerProgram";
import { Entity } from "../Entity";
import { AttributeBuffer } from "../../GLPowerVAO";
import { Vec2 } from "../../Math/Vector2";
import { Vec4 } from "../../Math/Vector4";
import { BLidgeObjectType } from "../../BLidge";

export interface Component {[key:string]: any}

export type BuiltinComponents = ComponentVector2 | ComponentVector3 | ComponentsTransformMatrix

export type ComponentName =
	'position' |
	'rotation' |
	'scale' |
	'matrix' |
	'sceneNode' |
	'perspectiveCamera' |
	'material' |
	'geometry' |
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

export type ComponentPerspectiveCamera = {
	fov: number;
	aspectRatio: number;
	near: number;
	far: number;
	needsUpdate?: boolean;
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

export type ComponentBLidge = {
	type: BLidgeObjectType
}

// export type
