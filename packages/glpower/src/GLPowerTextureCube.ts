import { GLPowerTextureSetting } from "./GLPowerTexture";
import { Vector } from "./Math/Vector";
import { Types } from "./types";

export class GLPowerTextureCube {

	public unit: number;
	public image: HTMLImageElement[];
	public size: Vector;

	protected gl: WebGL2RenderingContext;
	protected texture: WebGLTexture | null;

	protected textureType: number;
	protected _setting: GLPowerTextureSetting;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;
		this.image = [];
		this.unit = 0;
		this.size = new Vector();
		this.texture = this.gl.createTexture();

		this._setting = {
			type: this.gl.UNSIGNED_BYTE,
			internalFormat: this.gl.RGBA,
			format: this.gl.RGBA,
			magFilter: this.gl.NEAREST,
			minFilter: this.gl.NEAREST,
			generateMipmap: false,
			wrapS: this.gl.CLAMP_TO_EDGE,
			wrapT: this.gl.CLAMP_TO_EDGE,
		};

		this.textureType = gl.TEXTURE_CUBE_MAP;

	}

	public get isTexture() {

		return true;

	}

	public setting( param?: Types.Nullable<GLPowerTextureSetting> ) {

		this._setting = {
			...this._setting,
			...param
		};

		this.attach( this.image );

		return this;

	}

	public attach( img: HTMLImageElement[] ) {

		this.image = img;

		this.gl.bindTexture( this.textureType, this.texture );

		var target = [
			this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,
			this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
			this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
			this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
			this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
			this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
		];

		for ( let i = 0; i < this.image.length; i ++ ) {

			const img = this.image[ i ];
			this.gl.texImage2D( target[ i ], 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img );

		}

		if ( this._setting.generateMipmap ) {

			this.gl.generateMipmap( this.textureType );

		}

		this.gl.texParameteri( this.textureType, this.gl.TEXTURE_MAG_FILTER, this._setting.magFilter );
		this.gl.texParameteri( this.textureType, this.gl.TEXTURE_MIN_FILTER, this._setting.minFilter );
		this.gl.texParameterf( this.textureType, this.gl.TEXTURE_WRAP_S, this._setting.wrapS );
		this.gl.texParameterf( this.textureType, this.gl.TEXTURE_WRAP_T, this._setting.wrapT );

		this.gl.bindTexture( this.textureType, null );

		return this;

	}

	public activate( unitNumber: number ) {

		this.gl.activeTexture( this.gl.TEXTURE0 + unitNumber );
		this.gl.bindTexture( this.textureType, this.texture );

		this.unit = unitNumber;

		return this;

	}

	public getTexture() {

		return this.texture;

	}

	public dispose() {

		this.gl.deleteTexture( this.texture );

	}

}
