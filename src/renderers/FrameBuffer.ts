import { Texture,TextureParam } from "../textures/Texture";

export declare interface FrameBufferParam extends TextureParam{
}

export class FrameBuffer{

	public texture: Texture;
	public buffer: WebGLFramebuffer;
	
	constructor( frameBufferParam: FrameBufferParam ){
		
		this.texture = new Texture( frameBufferParam );
		
	}

	public get isFrameBuffer(){

		return true;
		
	}
	
}