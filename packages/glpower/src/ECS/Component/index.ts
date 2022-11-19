import { Attribute } from "../../Geometries/Geometry";
import { Vec3 } from "../../Math/Vector3";
import { Buffer } from '../../Buffer';
import { Uniform } from "../../Program";
import { Entity } from "../Entity";
import { AttributeBuffer } from "../../VAO";

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
	( string & {} );

// math

export type ComponentVector3 = {
} & Vec3

export type ComponentVector2 = {
	x: number;
	y: number;
}

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
}

export type ComponentMaterial = {
	vertexShader: string;
	fragmentShader: string;
	uniforms?: Uniform[]
}

export type ComponentGeometry = {
	attributes: ( {name: string } & AttributeBuffer )[]
	index: AttributeBuffer
	needsUpdate?: boolean
}

// export type