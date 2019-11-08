export declare interface Attribute{
	vert: number[];
	instancing?: boolean;
	location?: number;
	stride?: number;
	vbo?: WebGLBuffer;
}

export declare interface Attributes{
	[key: string]: Attribute
}

export class Geometry{
	
	public attributes: Attributes = {};
	public instancing: boolean = false;
	public instancingCnt: number;
	
	constructor(){

	}

	public add( name: string, vert: number[], stride: number, instancing?: boolean ){
		
		this.attributes[name] = {
			vert: vert,
			stride: stride,
			instancing: instancing,
		}

		if( instancing ){

			this.instancing = true;
			this.instancingCnt = vert.length / stride;

		}

	}

}