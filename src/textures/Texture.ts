export declare interface TextureParam{
	wrapS?: number;
	wrapT?: number;
	magFilter?: number;
	minFilter?: number;
	width?: number;
	height?: number;
	texType?: number;
}

export class Texture{

	public unitID: number;
	public glTex: WebGLTexture;

	public image: HTMLImageElement;

	public texType: number;
	
	public wrapS: number;
	public wrapT: number;
	public magFilter: number;
	public minFilter: number;
	
	public width: number;
	public height: number;
	
	public needUpdate: boolean = true;

	constructor( param?: TextureParam ){

		param = param || {};

		this.wrapS = param.wrapS;
		this.wrapT = param.wrapT;

		this.magFilter = param.magFilter;
		this.minFilter = param.magFilter;

		this.width = param.width || 0;
		this.height = param.height || 0;

		this.texType = param.texType;

	}

	public loadImg( path: string, callBack?: ( tex: Texture ) => void ){
		
		let img = new Image();
		img.src = path;
		
		img.onload = () => {

			this.image = img;
			this.width = img.width;
			this.height = img.height;

			this.needUpdate = true;

			if( callBack ){

				callBack( this );

			}
			
		}

		return this;
		
	}

	public get isTexture(){

		return true;

	}
	
}