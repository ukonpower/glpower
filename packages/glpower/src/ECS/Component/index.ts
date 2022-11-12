import { Vec3 } from "../../Math/Vector3";
import { Entity } from "../Entity";

export interface Component {[key:string]: any}

export type BuiltinComponents = ComponentVector2 | ComponentVector3 | ComponentMatrix

export type ComponentName = 'position' | 'rotation' | 'scale' | 'matrix' | 'sceneNode' | ( string & {} )

// math

export type ComponentVector3 = {
} & Vec3

export type ComponentVector2 = {
	x: number;
	y: number;
}

export type ComponentMatrix = {
	local: number[],
	world: number[],
}

// scene

export type ComponentSceneNode = {
	parent?: Entity,
	children: Entity[],
}
