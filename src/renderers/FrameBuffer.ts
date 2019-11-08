import { Texture,TextureParam } from "../textures/Texture";

export declare interface FrameBufferParam extends TextureParam{
}

export class FrameBuffer{

	public tex: Texture;
	public buffer: WebGLFramebuffer;
	
	constructor( frameBufferParam: FrameBufferParam ){
		
		this.tex = new Texture( frameBufferParam );
		
	}

	public get isFrameBuffer(){

		return true;
		
	}
	
}