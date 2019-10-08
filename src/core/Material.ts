export declare interface OUniform{
	value: any;
}

export declare interface Uniforms{
	[key: string]: OUniform
}

export declare interface MaterialParam{
	frag: string;
	vert: string;
	uniforms: Uniforms
}

export class Material{

	public program: WebGLProgram;

	public uniforms: Uniforms;
	public frag: string;
	public vert: string;
	
	constructor( param: MaterialParam ){

		this.uniforms = param.uniforms;
		this.frag = param.frag;
		this.vert = param.vert;

	}

}