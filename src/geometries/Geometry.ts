
export declare interface Attribute{
	vertices: number[];
	location?: number;
	stride?: number;
	vbo?: WebGLBuffer;
}

export declare interface Attributes{
	[key: string]: Attribute
}

export class Geometry{
	
	public attributes: Attributes = {};
	
	constructor(){

	}

	public clone(){
		
		let geo = new Geometry();
		
		let keys = Object.keys( this.attributes );

		for (let i = 0; i < keys.length; i++) {

			let attr = this.attributes[keys[i]];

			geo.addAttributes( keys[i], attr.vertices, attr.stride );
			
		}

		return geo;

	}
	
	public addAttributes( name: string, vertices: number[], stride: number ){
		
		this.attributes[name] = {
			vertices: vertices,
			stride: stride,
		}

	}

}