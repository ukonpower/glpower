import { GLPowerTextureCube } from "./GLPowerTextureCube";

import { GLPowerFrameBfferOpt, GLPowerFrameBuffer } from ".";

export class GLPowerFrameBufferCube extends GLPowerFrameBuffer {

	private cubeTarget: number[];
	public textures: GLPowerTextureCube [];

	constructor( gl: WebGL2RenderingContext, opt?: GLPowerFrameBfferOpt ) {

		super( gl, opt );

		this.textures = [];

		this.cubeTarget = [
			this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,
			this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
			this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
			this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
			this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
			this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
		];

	}

	public setTexture( textures: GLPowerTextureCube [] ) {

		this.textures = textures;
		this.textureAttachmentList.length = 0;

		this.textures.forEach( ( t ) => {

			t.attach( { width: this.size.x, height: this.size.y } );

		} );


		return this;

	}

	public face( index: number ) {

		this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, this.frameBuffer );
		this.textureAttachmentList.length = 0;

		this.textures.forEach( ( t, i ) => {

			const attachment = this.gl.COLOR_ATTACHMENT0 + i;
			this.gl.framebufferTexture2D( this.gl.FRAMEBUFFER, attachment, this.cubeTarget[ index ], t.getTexture(), 0 );
			this.textureAttachmentList.push( attachment );

		} );

		this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );

	}


}
