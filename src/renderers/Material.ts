export declare interface OUniform{
	value: any;
	location?: WebGLUniformLocation;
}

export declare interface Uniforms{
	[key: string]: OUniform
}

export declare interface MaterialParam{
	frag: string;
	vert: string;
	uniforms?: Uniforms;
	culling?: number;
	depthTest?: boolean;
	depthFunc?: number;
	blendSrc?: number;
	blendDst?: number;
}

export class Material {

	public programs: { [key:string] : WebGLProgram };
	public uniforms: Uniforms;
	public frag: string;
	public vert: string;
	public culling: number;
	public depthTest: boolean;
	public depthFunc: number;
	public blendSrc: number;
	public blendDst: number;

	public needUpdate: boolean = true;

	constructor( param: MaterialParam ) {

		this.uniforms = param.uniforms;
		this.frag = param.frag;
		this.vert = param.vert;
		this.culling = param.culling;
		this.depthTest = param.depthTest !== undefined ? param.depthTest : true;
		this.depthFunc = param.depthFunc;
		this.blendSrc = param.blendSrc;
		this.blendDst = param.blendSrc;
		this.programs = {};

	}

}
