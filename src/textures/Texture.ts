import { WrapClamp, FilterLinear } from "../Constants";

export declare interface TextureParam{
	texturePath?: string;
	wrapS?: number;
	wrapT?: number;
	magFilter?: number;
	minFilter?: number;
}

export class Texture{

	public unitID: number;

	public wrapS: number;
	public wrapT: number;

	public magFilter: number;
	public minFilter: number;
	
	public image: HTMLImageElement;

	public webglTex: WebGLTexture;

	constructor( param?: TextureParam ){

		param = param || {};

		this.wrapS = param.wrapS || WrapClamp;
		this.wrapT = param.wrapT || WrapClamp;

		this.magFilter = param.magFilter || FilterLinear;
		this.minFilter = param.magFilter || FilterLinear;

	}

	public loadImg( path: string, callBack: ( tex: Texture ) => void ){
		
		let img = new Image();
		img.src = path;
		img.onload = () => {

			this.image = img;

			callBack( this );
			
		}
		
	}

	public get isTexture(){

		return true;

	}
	
}