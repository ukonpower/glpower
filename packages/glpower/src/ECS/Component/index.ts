import { IVector2, IVector3, IVector4, Vector } from "../../Math/Vector";
import { GLPowerProgram, Uniformable, UniformType } from "../../GLPowerProgram";
import { Entity } from "../Entity";
import { AttributeBuffer, GLPowerVAO } from "../../GLPowerVAO";
import { BLidgeObjectType } from "../../BLidge";
import { GLPowerFrameBuffer } from "../../GLPowerFrameBuffer";
import { Matrix } from "../../Math/Matrix";
import { GLPowerTexture } from "../../GLPowerTexture";
import { FCurveGroup } from "../../Animation/FCurveGroup";

export interface Component {[key:string]: any}

export type ComponentName =
	'position' |
	'scale' |
	'matrix' |
	'sceneNode' |
	'events' |
	'camera' |
	'perspective' |
	"orthographic" |
	"renderCameraDeferred" |
	"renderCameraForward" |
	"renderCameraShadowMap" |
	'postprocess' |
	'material' |
	'materialDepth' |
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

export type RenderType = 'forward' | 'deferred' | 'shadowMap' | 'postprocess';

export type Uniforms = {[key:string]: {value: Uniformable | Uniformable[], type: UniformType}}

export type ComponentMaterial = {
	vertexShader: string;
	fragmentShader: string;
	uniforms?: Uniforms;
	renderType?: RenderType;
	defines?: {[key: string]: string}
	needsUpdate?: boolean;
	__program?: GLPowerProgram
}

export type ComponentGeometry = {
	attributes: ( {name: string } & AttributeBuffer )[]
	index: AttributeBuffer
	needsUpdate?: Map<GLPowerVAO, boolean>
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

export type ComponentCameraOrthographic = {
	width: number,
	height: number,
}

export type ComponentRenderCamera = {
	renderTarget: GLPowerFrameBuffer | null;
	postprocess?: ComponentPostProcess
}

export type ComponentShadowmapCamera = {
	renderTarget: GLPowerFrameBuffer,
}

/*-------------------------------
	Light
-------------------------------*/

export type ComponentLightDirectional = {
	color: IVector3,
	intensity: number
}

export type ComponentLightSpot = {
	color: IVector3,
	intensity: number,
	angle: number,
	blend: number,
	distance: number,
	decay: number,
}

/*-------------------------------
	PostProcess
----------------	---------------*/

export type ComponentPostProcess = ( ComponentMaterial & {
	input: GLPowerTexture[];
	renderTarget: GLPowerFrameBuffer | null;
	customGeometry?: ComponentGeometry;
	camera?: Entity;
} )[]

/*-------------------------------
	BLidge
-------------------------------*/

export type ComponentBLidge = {
	name: string
	type: BLidgeObjectType
	updateTime?: number,
	curveGroups?: {
		position?: FCurveGroup;
		rotation?: FCurveGroup;
		scale?: FCurveGroup;
		uniforms?: {name: string, curve: FCurveGroup }[]
	},
}

/*-------------------------------
	Event
-------------------------------*/

export type ComponentEvents = {
	inited?: boolean
	onUpdate?: ( event: { time: number, deltaTime: number} ) => void,
	onResize?: ( event: { size: Vector } ) => void,
}
