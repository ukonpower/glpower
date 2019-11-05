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

	public uniforms: Uniforms;
	public frag: string;
	public vert: string;
	public culling: number;
	public blendSrc: number;
	public blendDst: number;

	constructor( param: MaterialParam ){

		this.uniforms = param.uniforms;
		this.frag = param.frag;
		this.vert = param.vert;
		this.culling = param.culling;
		this.blendSrc = param.blendSrc;
		this.blendDst = param.blendSrc;

	}


	public clone(){

		let uni: Uniforms = {};

		let uniKeys = Object.keys( this.uniforms );

		for( let i = 0; i < uniKeys.length; i++ ){

			let key = uniKeys[i];

			uni[key] = {
				value: this.uniforms[key].value
			}
			
		}
		
		return new Material({
			vert: this.vert,
			frag: this.frag,
			culling: this.culling,
			uniforms: uni,
			blendSrc: this.blendSrc,
			blendDst: this.blendDst,
		});
		
	}

}