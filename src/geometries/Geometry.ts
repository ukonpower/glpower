export declare interface Attribute{
	vertices: number[];
	location?: number;
	stride?: number;
	vbo?: WebGLBuffer;
	dynamic?: boolean;
}

export declare interface Attributes{
	[key: string]: Attribute
}

export class Geometry{
	
	public attributes: Attributes = {};
	
	constructor(){

	}

	public addAttributes( name: string, vertices: number[], stride: number, dynamic: boolean = false ){
		
		this.attributes[name] = {
			vertices: vertices,
			stride: stride,
			dynamic: dynamic
		}

	}

}