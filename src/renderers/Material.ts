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
	uniforms?: Uniforms,
	doubleSide?: boolean;
}

export class Material{

	public uniforms: Uniforms;
	public frag: string;
	public vert: string;
	public doubleSide: boolean;
	
	constructor( param: MaterialParam ){

		this.uniforms = param.uniforms;
		this.frag = param.frag;
		this.vert = param.vert;
		this.doubleSide = param.doubleSide || false;

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
			doubleSide: this.doubleSide,
			uniforms: uni
		});
		
	}

}