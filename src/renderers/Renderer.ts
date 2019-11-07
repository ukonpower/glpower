import { Material, MaterialParam, Uniforms } from "./Material";
import { Scene } from "../objects/Scene";
import { Camera } from "./Camera";
import { Geometry } from "../geometries/Geometry";
import { Vec2 } from "../math/Vec2";
import { Vec3 } from "../math/Vec3";
import { Mat4 } from "../math/Mat4";
import { RenderingObject } from "../objects/RenderingObject";
import { Texture } from "../textures/Texture";
import { FrameBuffer } from "./FrameBuffer";
import { TSMethodSignature } from "babel-types";

export declare interface RendererParam{
	canvas: HTMLCanvasElement;
	retina?: boolean;
}

export type Uniformable = number | Vec2 | Vec3 | Mat4 | Texture | FrameBuffer;

export class Renderer{

	public gl: WebGLRenderingContext;

	protected _canvas: HTMLCanvasElement;

	protected pixelRatio: number;

	protected isRetina: boolean;


	// count 

	protected attributeCnt: number = 0;

	protected textureCnt: number = 0;


	// render

	protected renderTarget: FrameBuffer;
	
	constructor( param: RendererParam ){

		console.log( 'GLパワーを見せつけろ');

		this.initContext( param.canvas );

		this.isRetina = param.retina || false;

	}

	protected initContext( canvas: HTMLCanvasElement ){

		this._canvas = canvas;

		this.gl = this._canvas.getContext( 'webgl' );

		this.gl.enable( this.gl.DEPTH_TEST );
		this.gl.enable( this.gl.BLEND );
		
	}

	public setSize( width: number, height: number ){

		this._canvas.width = width * ( this.isRetina ? window.devicePixelRatio : 1 );
		this._canvas.height = height * ( this.isRetina ? window.devicePixelRatio : 1 );

	}

	protected createProgram( obj: RenderingObject ){

		let mat = obj.material;

		let prg = this.gl.createProgram();

		let vs = this.createShader( mat.vert, this.gl.VERTEX_SHADER );
		let fs = this.createShader( mat.frag, this.gl.FRAGMENT_SHADER );

		this.gl.attachShader( prg, vs );
		this.gl.attachShader( prg, fs );
		this.gl.linkProgram( prg );

		obj.program = prg;

	}

	protected createShader( src: string, type: number ){
		
		let shader = this.gl.createShader( type );

		this.gl.shaderSource( shader, src );
		this.gl.compileShader( shader );

		if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {

			return shader;
			
        } else {

			
			return null;
			
        }

	}

	protected createAttributes( obj: RenderingObject ){

		let geo = obj.geometry;
		let prg = obj.program;

		let keys = Object.keys( geo.attributes );

		for ( let i = 0; i < keys.length; i++ ){

			let key = keys[i];
			let attr = geo.attributes[key];

			attr.location = this.gl.getAttribLocation( prg, key.toString() );
			attr.vbo = this.createBufferObject( attr.vertices, key == 'index' );
			
		}
		
	}

	protected createBufferObject( vertices: number[], isIndex: boolean = false ){
		
		let target = isIndex ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER;
		let array = isIndex ? new Int16Array( vertices ) : new Float32Array( vertices );
		
		let vbo = this.gl.createBuffer();

		this.gl.bindBuffer( target, vbo );
		this.gl.bufferData( target, array, this.gl.STATIC_DRAW );
		this.gl.bindBuffer( target, null );

		return vbo;

	}

	protected setAttributes( geo: Geometry ){

		this.clearAttributes();
		
		let keys = Object.keys( geo.attributes );
		this.attributeCnt = keys.length;

		for ( let i = 0; i < keys.length; i++ ){

			let key = keys[i];
			let attr = geo.attributes[key];


			if( key == 'index' ){

				this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, attr.vbo );

			}else{

				if( attr.location !== -1 ){
				
					this.gl.bindBuffer( this.gl.ARRAY_BUFFER, attr.vbo );
					this.gl.enableVertexAttribArray( attr.location );
					this.gl.vertexAttribPointer( attr.location, attr.stride, this.gl.FLOAT, false, 0, 0 );

				}
				
			}

		}

	}

	protected clearAttributes(){

		for ( let i = 0; i < this.attributeCnt; i++ ) {
			
			this.gl.disableVertexAttribArray( i );
			
		}

	}

	protected createUniforms( program: WebGLProgram, uniforms: Uniforms ){

		if( !uniforms ) return;
		
		let matUniKeys = Object.keys( uniforms );

		for ( let i = 0; i < matUniKeys.length; i++ ) {

			const key = matUniKeys[i];

			let uni = uniforms[key];
			
			uni.location = this.gl.getUniformLocation( program, key.toString() );			

		}

	}

	protected applyUniforms( uniforms: Uniforms ){

		if( !uniforms ) return;

		let keys = Object.keys( uniforms );

		for ( let i = 0; i < keys.length; i++ ) {

			const key = keys[i];

			let uni = uniforms[key];

			this.setUniform( uni.location, uni.value );

		}

	}

	protected setUniform( location: WebGLUniformLocation, value: Uniformable ){

		if( value == null ) return;
		
		let type: string = 'uniform';
		let input: any;

		input = value;

		if( typeof( value ) == 'number' ){

			type += '1f';
			
		}else if( 'isVec2' in value ){

			type += '2fv';

		}else if( 'isVec3' in value ){

			type += '3fv';

		}else if( 'isMat4' in value ){

			type += 'Matrix4fv';

			input = value.element;

		}else if( 'isTexture' in value || 'isFrameBuffer' in value ){

			let tex: Texture;
			
			if( 'isFrameBuffer' in value ){

				tex = value.texture;
				
			}else{
				
				tex = value;

				if( tex.needUpdate == true ){

					this.createTexture( tex );

					tex.needUpdate = false;
					
				}
				
			}
			
			tex.unitID = this.textureCnt;

			this.gl.activeTexture( this.gl.TEXTURE0 + this.textureCnt++ );
			
			this.gl.bindTexture( this.gl.TEXTURE_2D, tex.webglTex );

			input = tex.unitID;

			type += '1i';

		}

		if( type ){

			if( type == 'uniformMatrix4fv' ){

				this.gl[type]( location, false, input );

			}else{
				
				this.gl[type]( location, input );
				
			}

		}

	}

	protected createTexture( texture: Texture ){

		let tex = this.gl.createTexture();
		
		this.gl.bindTexture( this.gl.TEXTURE_2D, tex );

		if( texture.image != null ){
			
			this.gl.texImage2D( this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, texture.image );
			this.gl.generateMipmap( this.gl.TEXTURE_2D );

		}else{

			this.gl.texImage2D( this.gl.TEXTURE_2D, 0, this.gl.RGBA, texture.width, texture.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null );
			
		}
		
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, texture.minFilter || this.gl.LINEAR );
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, texture.magFilter || this.gl.LINEAR );
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, texture.wrapS || this.gl.CLAMP_TO_EDGE );
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, texture.wrapT || this.gl.CLAMP_TO_EDGE );

		this.gl.bindTexture( this.gl.TEXTURE_2D, null );

		texture.webglTex = tex;
		
	}

	protected renderObject( obj: RenderingObject, camera: Camera ){

		let mat = obj.material;
		let geo = obj.geometry;

		obj.updateMatrix();

		obj.modelViewMatrix.copy( camera.modelMatrixInverse.clone().multiply( obj.modelMatrix ) );

		obj.IndividualUniforms.projectionMatrix.value = camera.projectionMatrix;

		if( !obj.program ){

			this.createProgram( obj );

			this.createUniforms( obj.program, mat.uniforms );

			this.createUniforms( obj.program, obj.IndividualUniforms );

			this.createAttributes( obj );

		}

		// curring

		if( mat.culling ){

			this.gl.enable( this.gl.CULL_FACE );

			this.gl.frontFace( mat.culling );
			
		}else{

			this.gl.disable( this.gl.CULL_FACE );
			
		}


		// blend

		this.gl.blendFunc( mat.blendSrc || this.gl.SRC_ALPHA, mat.blendDst || this.gl.ONE_MINUS_SRC_ALPHA );

		this.gl.useProgram( obj.program );

		this.applyUniforms( mat.uniforms );

		this.applyUniforms( obj.IndividualUniforms );

		this.setAttributes( geo );

		this.gl.drawElements( obj.drawType != null ? obj.drawType : this.gl.TRIANGLES, geo.attributes.index.vertices.length, this.gl.UNSIGNED_SHORT, 0 );

	}

	public setFrameBuffer( frameBuffer: FrameBuffer ){

		this.renderTarget = frameBuffer;
		
		if( frameBuffer && !frameBuffer.buffer ){

			this.createFrameBuffer( frameBuffer );
			
		}
			
		this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, frameBuffer ? frameBuffer.buffer : null );
		
	}

	protected createFrameBuffer( frameBuffer: FrameBuffer ){
		
		let buffer = this.gl.createFramebuffer();

		this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, buffer );

		let depthBuffer = this.gl.createRenderbuffer();
		this.gl.bindRenderbuffer( this.gl.RENDERBUFFER, depthBuffer );
		this.gl.renderbufferStorage( this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, frameBuffer.texture.width, frameBuffer.texture.height );
		this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, depthBuffer);

		if( frameBuffer.texture.webglTex == null ){

			this.createTexture( frameBuffer.texture );
			
		}

		this.gl.framebufferTexture2D( this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, frameBuffer.texture.webglTex, 0 );

		this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );
		this.gl.bindRenderbuffer( this.gl.RENDERBUFFER, null );

		frameBuffer.buffer = buffer;
		
	}
	
	public render( scene: Scene, camera: Camera ){

		camera.updateMatrix();
		
		this.textureCnt = 0;
		
		this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
		this.gl.clearDepth( 1.0 );
		this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );

		if( this.renderTarget ){

			this.gl.viewport( 0, 0, this.renderTarget.texture.width, this.renderTarget.texture.height );

		}else{

			this.gl.viewport( 0, 0, this.gl.canvas.width, this.gl.canvas.height );

		}

		for( let i = 0; i < scene.children.length; i++ ){

			let obj = scene.children[i];
			
			if( ( obj as RenderingObject ).isRenderingObject ){

				this.renderObject( obj as RenderingObject, camera );

			}

		}

		
		this.gl.flush();

	}

}