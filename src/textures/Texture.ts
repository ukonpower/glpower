export declare interface TextureParam{
	texturePath?: string;
	wrapS?: number;
	wrapT?: number;
	magFilter?: number;
	minFilter?: number;
	width?: number;
	height?: number;
}

export class Texture{

	public unitID: number;

	public wrapS: number;
	public wrapT: number;

	public magFilter: number;
	public minFilter: number;
	
	public image: HTMLImageElement;

	public width: number;
	public height: number;

	public webglTex: WebGLTexture;

	constructor( param?: TextureParam ){

		param = param || {};

		this.wrapS = param.wrapS;
		this.wrapT = param.wrapT;

		this.magFilter = param.magFilter;
		this.minFilter = param.magFilter;

		this.width = param.width || 0;
		this.height = param.height || 0;

	}

	public loadImg( path: string, callBack: ( tex: Texture ) => void ){
		
		let img = new Image();
		img.src = path;
		img.onload = () => {

			this.image = img;
			this.width = img.width;
			this.height = img.height;

			callBack( this );
			
		}
		
	}

	public get isTexture(){

		return true;

	}
	
}