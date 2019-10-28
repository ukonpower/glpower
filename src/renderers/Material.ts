import { SideFront } from "../Constants";

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
	side?: number;
}

export class Material{

	public uniforms: Uniforms;
	public frag: string;
	public vert: string;
	public side: number;
	
	constructor( param: MaterialParam ){

		this.uniforms = param.uniforms;
		this.frag = param.frag;
		this.vert = param.vert;
		this.side = param.side || SideFront;

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
			side: this.side,
			uniforms: uni
		});
		
	}

}