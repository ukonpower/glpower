import { Extensions } from './Extensions';
import { Material, MaterialParam, Uniforms } from "./Material";
import { Scene } from "../objects/Scene";
import { Camera } from "./Camera";
import { Geometry, Attribute } from "../geometries/Geometry";
import { Vec2 } from "../math/Vec2";
import { Vec3 } from "../math/Vec3";
import { Mat4 } from "../math/Mat4";
import { PowerObj } from "../objects/PowerObj";
import { Texture } from "../textures/Texture";
import { FrameBuffer } from "./FrameBuffer";
import { TSMethodSignature, isUserWhitespacable } from "babel-types";
import { Empty } from '../objects/Empty';

export declare interface RendererParam{
	canvas: HTMLCanvasElement;
	retina?: boolean;
}

export type Uniformable = number | Vec2 | Vec3 | Mat4 | Texture | FrameBuffer;

export class Renderer {

	public gl: WebGLRenderingContext;

	public ext: Extensions;

	protected _canvas: HTMLCanvasElement;

	protected pixelRatio: number;

	protected isRetina: boolean;

	// count

	protected objectCnt: number = 0;

	protected activeAttrs: number[] = [];

	protected textureCnt: number = 0;


	// render
	protected renderTarget: FrameBuffer;

	// extensions
	protected instancingExt: ANGLE_instanced_arrays;

	constructor( param: RendererParam ) {

		console.log( '%c GLパワーを見せつけろ', 'padding: 5px 10px; background-color: black; color: white;font-size:13px;' );

		this.initContext( param.canvas );

		this.isRetina = param.retina || false;

	}

	protected initContext( canvas: HTMLCanvasElement ) {

		this._canvas = canvas;

		this.gl = this._canvas.getContext( 'webgl' );

		this.gl.enable( this.gl.DEPTH_TEST );
		this.gl.enable( this.gl.BLEND );

		this.ext = new Extensions( this.gl );

		this.ext.enableExtension( 'OES_texture_float_linear' );
		this.ext.enableExtension( 'OES_texture_half_float_linear' );
		this.ext.enableExtension( 'WEBGL_color_buffer_float' );
		this.ext.enableExtension( 'OES_texture_float' );
		this.ext.enableExtension( 'OES_texture_half_float' );
		this.ext.enableExtension( 'ANGLE_instanced_arrays' );

	}

	public setSize( width: number, height: number ) {

		this._canvas.width = width * ( this.isRetina ? window.devicePixelRatio : 1 );
		this._canvas.height = height * ( this.isRetina ? window.devicePixelRatio : 1 );

	}

	protected cPrg( obj: PowerObj ) {

		let mat = obj.material;

		let prg = this.gl.createProgram();

		let vs = this.cShader( mat.vert, this.gl.VERTEX_SHADER );
		let fs = this.cShader( mat.frag, this.gl.FRAGMENT_SHADER );

		this.gl.attachShader( prg, vs );
		this.gl.attachShader( prg, fs );
		this.gl.linkProgram( prg );

		if ( this.gl.getProgramParameter( prg, this.gl.LINK_STATUS ) ) {

			obj.material.programs[ obj.id ] = prg;

		} else {

			console.error( this.gl.getProgramInfoLog( prg ) );

		}



	}

	protected cShader( src: string, type: number ) {

		let shader = this.gl.createShader( type );

		this.gl.shaderSource( shader, src );
		this.gl.compileShader( shader );

		if ( this.gl.getShaderParameter( shader, this.gl.COMPILE_STATUS ) ) {

			return shader;

		} else {

			console.error( this.gl.getShaderInfoLog( shader ) );

		}

	}

	protected cAttr( obj: PowerObj ) {

		let geo = obj.geometry;
		let prg = obj.material.programs[ obj.id ];

		let keys = Object.keys( geo.attributes );

		for ( let i = 0; i < keys.length; i ++ ) {

			let key = keys[ i ];
			let attr = geo.attributes[ key ];

			attr.location = this.gl.getAttribLocation( prg, key );

			attr.vbo = this.cVBO( attr, key == 'index' );

		}

	}

	protected cVBO( attr: Attribute, isIndex: boolean = false ) {

		let target = isIndex ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER;
		let array = isIndex ? new Int16Array( attr.vert ) : new Float32Array( attr.vert );

		let vbo = this.gl.createBuffer();

		this.gl.bindBuffer( target, vbo );
		this.gl.bufferData( target, array, this.gl.STATIC_DRAW );
		this.gl.bindBuffer( target, null );

		return vbo;

	}

	protected setAttr( geo: Geometry, obj: PowerObj ) {

		let keys = Object.keys( geo.attributes );

		for ( let i = 0; i < keys.length; i ++ ) {

			let key = keys[ i ];
			let attr = geo.attributes[ key ];

			if ( key == 'index' ) {

				this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, attr.vbo );

			} else {

				if ( attr.location !== - 1 ) {

					this.activeAttrs.push( attr.location );
					this.gl.enableVertexAttribArray( attr.location );
					this.gl.bindBuffer( this.gl.ARRAY_BUFFER, attr.vbo );
					this.gl.vertexAttribPointer( attr.location, attr.stride, this.gl.FLOAT, false, 0, 0 );

					if ( attr.instancing === true ) {

						this.ext.getExt( 'ANGLE_instanced_arrays' ).vertexAttribDivisorANGLE( attr.location, attr.divisor );

					}

				}

			}

		}

	}


	protected resetAttr( geo: Geometry, obj: PowerObj ) {

		let keys = Object.keys( geo.attributes );

		for ( let i = 0; i < keys.length; i ++ ) {

			let key = keys[ i ];
			let attr = geo.attributes[ key ];

			if ( attr.location !== - 1 && attr.instancing === true ) {

				this.ext.getExt( 'ANGLE_instanced_arrays' ).vertexAttribDivisorANGLE( attr.location, 0 );

			}

		}

	}

	protected clearAttr() {

		for ( let i = this.activeAttrs.length - 1; i >= 0; i -- ) {

			this.gl.disableVertexAttribArray( this.activeAttrs[ i ] );

			this.activeAttrs.pop();

		}

	}

	protected cUni( program: WebGLProgram, uniforms: Uniforms ) {

		if ( ! uniforms ) return;

		let matUniKeys = Object.keys( uniforms );

		for ( let i = 0; i < matUniKeys.length; i ++ ) {

			const key = matUniKeys[ i ];

			let uni = uniforms[ key ];

			uni.location = this.gl.getUniformLocation( program, key.toString() );

		}

	}

	protected setUni( uniforms: Uniforms ) {

		if ( ! uniforms ) return;

		let keys = Object.keys( uniforms );

		for ( let i = 0; i < keys.length; i ++ ) {

			const key = keys[ i ];

			let uni = uniforms[ key ];

			if ( uni.location ) {

				this.setUniform( uni.location, uni.value );

			}

		}

	}

	protected setUniform( location: WebGLUniformLocation, value: Uniformable ) {

		if ( value == null ) return;

		let type: string = 'uniform';
		let input: any;

		input = value;

		if ( typeof ( value ) == 'number' ) {

			type += '1f';

		} else if ( 'isVec2' in value ) {

			type += '2fv';

		} else if ( 'isVec3' in value ) {

			type += '3fv';

		} else if ( 'isMat4' in value ) {

			type += 'Matrix4fv';

			input = value.elm;

		} else if ( 'isTexture' in value || 'isFrameBuffer' in value ) {

			let tex: Texture;

			if ( 'isFrameBuffer' in value ) {

				tex = value.tex;

			} else {

				tex = value;

				if ( tex.needUpdate == true ) {

					this.cTex( tex );

					tex.needUpdate = false;

				}

			}

			tex.unitID = this.textureCnt;

			this.gl.activeTexture( this.gl.TEXTURE0 + this.textureCnt ++ );

			this.gl.bindTexture( this.gl.TEXTURE_2D, tex.glTex );

			input = tex.unitID;

			type += '1i';

		}

		if ( type ) {

			if ( type == 'uniformMatrix4fv' ) {

				this.gl[ type ]( location, false, input );

			} else {

				this.gl[ type ]( location, input );

			}

		}

	}

	protected cTex( texture: Texture ) {

		let tex = this.gl.createTexture();

		this.gl.bindTexture( this.gl.TEXTURE_2D, tex );

		if ( texture.image != null ) {

			this.gl.texImage2D( this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, texture.texType || this.gl.UNSIGNED_BYTE, texture.image );
			this.gl.generateMipmap( this.gl.TEXTURE_2D );

		} else {

			this.gl.texImage2D( this.gl.TEXTURE_2D, 0, this.gl.RGBA, texture.width, texture.height, 0, this.gl.RGBA, texture.texType || this.gl.UNSIGNED_BYTE, null );

		}

		this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, texture.minFilter || this.gl.NEAREST );
		this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, texture.magFilter || this.gl.NEAREST );
		this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, texture.wrapS || this.gl.CLAMP_TO_EDGE );
		this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, texture.wrapT || this.gl.CLAMP_TO_EDGE );

		this.gl.bindTexture( this.gl.TEXTURE_2D, null );

		texture.glTex = tex;

	}

	protected renderObject( obj: PowerObj, camera: Camera ) {

		let mat = obj.material;
		let geo = obj.geometry;

		if ( obj.id == null ) {

			obj.id = this.objectCnt ++;

		}

		if ( ! mat || ! geo ) return;

		obj.updateMatrix();

		obj.modelViewMatrix.copy( camera.modelMatrixInverse.clone().multiply( obj.modelMatrix ) );

		obj.IndividualUniforms.projectionMatrix.value = camera.projectionMatrix;

		if ( ! obj.material.programs[ obj.id ] ) {

			this.cPrg( obj );

			this.gl.useProgram( obj.material.programs[ obj.id ] );

			this.cAttr( obj );

			this.cUni( obj.material.programs[ obj.id ], mat.uniforms );

			this.cUni( obj.material.programs[ obj.id ], obj.IndividualUniforms );

		} else {

			this.gl.useProgram( obj.material.programs[ obj.id ] );

		}

		// curring

		if ( mat.culling ) {

			this.gl.enable( this.gl.CULL_FACE );

			this.gl.frontFace( mat.culling );

		} else {

			this.gl.disable( this.gl.CULL_FACE );

		}

		// depthTest

		if ( mat.depthTest ) {

			this.gl.enable( this.gl.DEPTH_TEST );

			this.gl.depthFunc( mat.depthFunc || this.gl.LEQUAL );

		} else {

			this.gl.disable( this.gl.DEPTH_TEST );

		}

		// blend

		this.gl.blendFunc( mat.blendSrc || this.gl.SRC_ALPHA, mat.blendDst || this.gl.ONE_MINUS_SRC_ALPHA );

		// uniforms

		this.setUni( mat.uniforms );

		this.setUni( obj.IndividualUniforms );

		// attributes

		this.clearAttr();

		this.setAttr( geo, obj );

		// draw

		if ( geo.instancing ) {

			this.ext.getExt( 'ANGLE_instanced_arrays' ).drawElementsInstancedANGLE( obj.drawType != null ? obj.drawType : this.gl.TRIANGLES, geo.attributes.index.vert.length, this.gl.UNSIGNED_SHORT, 0, geo.instancingCnt );

		} else {

			this.gl.drawElements( obj.drawType != null ? obj.drawType : this.gl.TRIANGLES, geo.attributes.index.vert.length, this.gl.UNSIGNED_SHORT, 0 );

		}

		this.resetAttr( geo, obj );

	}

	public setFrameBuffer( frameBuffer: FrameBuffer ) {

		this.renderTarget = frameBuffer;

		if ( frameBuffer && ! frameBuffer.buffer ) {

			this.cFBuffer( frameBuffer );

		}

		this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, frameBuffer ? frameBuffer.buffer : null );

	}

	protected cFBuffer( frameBuffer: FrameBuffer ) {

		let buffer = this.gl.createFramebuffer();

		this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, buffer );

		let depthBuffer = this.gl.createRenderbuffer();
		this.gl.bindRenderbuffer( this.gl.RENDERBUFFER, depthBuffer );
		this.gl.renderbufferStorage( this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, frameBuffer.tex.width, frameBuffer.tex.height );
		this.gl.framebufferRenderbuffer( this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, depthBuffer );

		if ( frameBuffer.tex.glTex == null ) {

			this.cTex( frameBuffer.tex );

		}

		this.gl.framebufferTexture2D( this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, frameBuffer.tex.glTex, 0 );

		this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );
		this.gl.bindRenderbuffer( this.gl.RENDERBUFFER, null );

		frameBuffer.buffer = buffer;

		frameBuffer.tex.needUpdate = false;

	}

	private renderRecursive( scene: Scene | Empty | PowerObj, camera: Camera ) {

		if ( ! scene.visible ) return;

		if ( ( scene as PowerObj ).isPowerObj ) {

			this.renderObject( scene as PowerObj, camera );

		}

		for ( let i = 0; i < scene.children.length; i ++ ) {

			this.renderRecursive( scene.children[ i ], camera );

		}

	}

	public render( scene: Scene, camera: Camera ) {

		camera.updateMatrix();

		this.textureCnt = 0;

		this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
		this.gl.clearDepth( 1.0 );
		this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );

		if ( this.renderTarget ) {

			this.gl.viewport( 0, 0, this.renderTarget.tex.width, this.renderTarget.tex.height );

		} else {

			this.gl.viewport( 0, 0, this.gl.canvas.width, this.gl.canvas.height );

		}

		this.renderRecursive( scene, camera );

		this.gl.flush();

	}

}
