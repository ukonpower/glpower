import { Vector2 } from "./Math/Vector2";
import { Types } from "./types";

type ImagePretense = {
	width: number,
	height: number
}

type GLPowerTextureSetting = {
	type: number,
	internalFormat: number,
	format: number,
	magFilter: number,
	minFilter: number,
	generateMipmap: boolean
}

export class GLPowerTexture {

	public unit: number;
	public image: HTMLImageElement | ImagePretense | null;
	public size: Vector2;

	private gl: WebGL2RenderingContext;
	private texture: WebGLTexture | null;

	private _setting: GLPowerTextureSetting;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;
		this.image = null;
		this.unit = 0;
		this.size = new Vector2();
		this.texture = this.gl.createTexture();

		this._setting = {
			type: this.gl.UNSIGNED_BYTE,
			internalFormat: this.gl.RGBA,
			format: this.gl.RGBA,
			magFilter: this.gl.NEAREST,
			minFilter: this.gl.NEAREST,
			generateMipmap: false
		};

	}

	public setting( param: Types.ToNullable<GLPowerTextureSetting> ) {

		this._setting = {
			...this._setting,
			...param
		};

		this.attach( this.image );

		return this;

	}

	public attach( img: HTMLImageElement | ImagePretense | null ) {

		this.image = img;

		this.gl.bindTexture( this.gl.TEXTURE_2D, this.texture );

		if ( this.image ) {

			this.size.set( this.image.width, this.image.height );

			if ( this.image instanceof HTMLImageElement ) {

				this.gl.texImage2D( this.gl.TEXTURE_2D, 0, this._setting.internalFormat, this._setting.format, this._setting.type, this.image );

			} else {

				this.gl.texImage2D( this.gl.TEXTURE_2D, 0, this._setting.internalFormat, this.image.width, this.image.height, 0, this._setting.format, this._setting.type, null );

			}

		} else {

			this.size.set( 1, 1 );

			this.gl.texImage2D( this.gl.TEXTURE_2D, 0, this._setting.internalFormat, this.size.x, this.size.y, 0, this._setting.format, this._setting.type, null );

		}

		this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this._setting.magFilter );
		this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this._setting.minFilter );

		if ( this._setting.generateMipmap ) {

			this.gl.generateMipmap( this.gl.TEXTURE_2D );

		}

		this.gl.bindTexture( this.gl.TEXTURE_2D, null );

		return this;

	}

	public activate( unitNumber: number ) {

		this.gl.activeTexture( this.gl.TEXTURE0 + unitNumber );
		this.gl.bindTexture( this.gl.TEXTURE_2D, this.texture );

		this.unit = unitNumber;

		return this;

	}

	public load( src: string, callBack?: () => void ) {

		const img = new Image();

		img.onload = () => {

			this.attach( img );

			if ( callBack ) callBack();

		};

		img.src = src;

		return this;

	}

	public getTexture() {

		return this.texture;

	}

	public loadAsync( src: string ) {

		return new Promise( ( resolve, reject ) => {

			const img = new Image();

			img.onload = () => {

				this.attach( img );

				resolve( this );

			};

			img.onerror = () => {

				reject( 'img error, ' + src );

			};

			img.src = src;

		} );

	}

}
