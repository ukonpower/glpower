import { Entity } from "../Entity";

export interface Component {[key:string]: any}

export type BuiltinComponents = ComponentVector2 | ComponentVector3 | ComponentMatrix4

export type ComponentName = 'position' | 'rotation' | 'scale' | 'matrix' | 'sceneNode' | ( string & {} )

// math

export type ComponentVector3 = {
	x: number;
	y: number;
	z: number;
}

export type ComponentVector2 = {
	x: number;
	y: number;
}

export type ComponentMatrix4 = {
	elm: number[]
}

// scene

export type ComponentSceneNode = {
	parent?: Entity,
	children: Entity[],
}
