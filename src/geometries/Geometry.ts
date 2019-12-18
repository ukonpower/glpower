export declare interface Attribute{
	vert: number[];
	instancing?: boolean;
	location?: number;
	stride?: number;
	vbo?: WebGLBuffer;
	divisor?: number;
}

export declare interface Attributes{
	[key: string]: Attribute
}

export class Geometry{
	
	public attributes: Attributes = {};
	public vertCnt: number = 0;
	public instancing: boolean = false;
	public instancingCnt: number;
	
	constructor(){

	}

	public add( name: string, vert: number[], stride: number, instancing?: boolean, divisor?: number ){
		
		this.attributes[name] = {
			vert: vert,
			stride: stride,
			instancing: instancing,
			divisor: divisor || 1
		}

		if( instancing ){

			this.instancing = true;
			this.instancingCnt = vert.length / stride;

		}else{

			if( name != 'index' ){
				
				this.vertCnt = vert.length / stride;

			}
			

		}

	}

}