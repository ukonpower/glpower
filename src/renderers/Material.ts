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
	blendSrc?: number;
	blendDst?: number;
}

export class Material{

	public program: WebGLProgram;
	public uniforms: Uniforms;
	public frag: string;
	public vert: string;
	public culling: number;
	public blendSrc: number;
	public blendDst: number;

	public needUpdate: boolean = true;

	constructor( param: MaterialParam ){

		this.uniforms = param.uniforms;
		this.frag = param.frag;
		this.vert = param.vert;
		this.culling = param.culling;
		this.blendSrc = param.blendSrc;
		this.blendDst = param.blendSrc;

	}

}