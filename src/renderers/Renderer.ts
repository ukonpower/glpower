import { Material, MaterialParam, Uniforms } from "./Material";
import { Scene } from "../objects/Scene";
import { Camera } from "./Camera";
import { Mesh } from "../objects/Mesh";
import { Geometry } from "../geometries/Geometry";
import { Vec2 } from "../math/Vec2";
import { Vec3 } from "../math/Vec3";
import { Mat4 } from "../math/Mat4";
import { Points } from "../objects/Points";
import { RenderingObject } from "../objects/RenderingObject";
import { SideFront, SideDouble, SideBack } from "../Constants";
import { Texture } from "../textures/Texture";

export declare interface RendererParam{
	canvas: HTMLCanvasElement;
	retina?: boolean;
}

export type Uniformable = number | Vec2 | Vec3 | Mat4 | Texture;

export class Renderer{

	protected _gl: WebGLRenderingContext;

	protected _canvas: HTMLCanvasElement;

	protected pixelRatio: number;

	protected isRetina: boolean;

	protected attributeCnt: number = 0;

	protected textureCnt: number = 0;

	constructor( param: RendererParam ){


		this.initContext( param.canvas );

		this.isRetina = param.retina || false;

	}

	protected initContext( canvas: HTMLCanvasElement ){

		this._canvas = canvas;

		this._gl = this._canvas.getContext( 'webgl' );

		this._gl.enable( this._gl.DEPTH_TEST );
		
	}

	public setSize( width: number, height: number ){

		this._canvas.width = width * ( this.isRetina ? window.devicePixelRatio : 1 );
		this._canvas.height = height * ( this.isRetina ? window.devicePixelRatio : 1 );

		this._gl.viewport(0, 0, this._gl.canvas.width, this._gl.canvas.height);

	}

	protected createProgram( obj: RenderingObject ){

		let mat = obj.material;

		let prg = this._gl.createProgram();

		let vs = this.createShader( mat.vert, this._gl.VERTEX_SHADER );
		let fs = this.createShader( mat.frag, this._gl.FRAGMENT_SHADER );

		this._gl.attachShader( prg, vs );
		this._gl.attachShader( prg, fs );
		this._gl.linkProgram( prg );

		obj.program = prg;

	}

	protected createShader( src: string, type: number ){
		
		let shader = this._gl.createShader( type );

		this._gl.shaderSource( shader, src );
		this._gl.compileShader( shader );

		if (this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {

			return shader;
			
        } else {

			
			return null;
			
        }

	}

	protected createAttributes( obj: RenderingObject ){

		let mat = obj.material;
		let geo = obj.geometry;

		let prg = obj.program;

		let keys = Object.keys( geo.attributes );

		for ( let i = 0; i < keys.length; i++ ){

			let key = keys[i];
			let attr = geo.attributes[key];

			if( key == 'index' ){

				attr.vbo = this.createBufferObject( attr.vertices, true );

			}else{

				attr.location = this._gl.getAttribLocation( prg, key.toString() );
				attr.vbo = this.createBufferObject( attr.vertices, false );
				
			}
			
		}
		
	}

	protected createBufferObject( vertices: number[], isIndex: boolean = false ){

		let vbo = this._gl.createBuffer();
		
		let target = isIndex ? this._gl.ELEMENT_ARRAY_BUFFER : this._gl.ARRAY_BUFFER;

		let array = isIndex ? new Int16Array( vertices ) : new Float32Array( vertices );

		this._gl.bindBuffer( target, vbo );
		this._gl.bufferData( target, array, this._gl.STATIC_DRAW );

		this._gl.bindBuffer( target, null );

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

				this._gl.bindBuffer( this._gl.ELEMENT_ARRAY_BUFFER, attr.vbo );

			}else{

				if( attr.location !== -1 ){
				
					this._gl.bindBuffer( this._gl.ARRAY_BUFFER, attr.vbo );
					this._gl.enableVertexAttribArray( attr.location );
					this._gl.vertexAttribPointer( attr.location, attr.stride, this._gl.FLOAT, false, 0, 0 );

				}
				
			}

		}

	}

	protected clearAttributes(){

		for ( let i = 0; i < this.attributeCnt; i++ ) {
			
			this._gl.disableVertexAttribArray( i );
			
		}

	}

	protected createUniforms( program: WebGLProgram, uniforms: Uniforms ){

		if( !uniforms ) return;
		
		let matUniKeys = Object.keys( uniforms );

		for ( let i = 0; i < matUniKeys.length; i++ ) {

			const key = matUniKeys[i];

			let uni = uniforms[key];
			
			uni.location = this._gl.getUniformLocation( program, key.toString() );			

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
		
		let type: string;
		let isMat: boolean = false;
		let input: any;

		input = value;

		if( typeof( value ) == 'number' ){

			type = 'uniform1f';
			
		}else if( 'isVec2' in value ){

			type = 'uniform2fv';

		}else if( 'isVec3' in value ){

			type = 'uniform3fv';

		}else if( 'isMat4' in value ){

			type = 'uniformMatrix4fv';

			input = value.element;

			isMat = true;

		}else if( 'isTexture' in value ){
			
			if( value.webglTex == null ){

				let texInfo = this.createTexture( value );
				
				value.webglTex = texInfo.texture;
				
				value.unitID = texInfo.unitID;
				
			}
			
			this._gl.activeTexture( this._gl.TEXTURE0 + value.unitID );
			this._gl.bindTexture( this._gl.TEXTURE_2D, value.webglTex );
			
			input = value.unitID;
			
			type = 'uniform1i';
			
		}

		if( type ){

			if( isMat ){

				this._gl[type]( location, false, input );

			}else{
				
				this._gl[type]( location, input );
				
			}

		}

	}

	protected createTexture( texture: Texture ){

		let tex = this._gl.createTexture();
		
		this._gl.bindTexture( this._gl.TEXTURE_2D, tex );
		this._gl.texImage2D( this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, texture.image );
		this._gl.generateMipmap( this._gl.TEXTURE_2D );

		this._gl.bindTexture( this._gl.TEXTURE_2D, null );

		return { texture: tex, unitID: this.textureCnt++ };
		
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

		if( mat.side == SideDouble ){

			this._gl.disable( this._gl.CULL_FACE );
			
		}else if( mat.side == SideFront ){

			this._gl.frontFace( this._gl.CCW );

			this._gl.enable( this._gl.CULL_FACE );

		}else if( mat.side == SideBack ){

			this._gl.frontFace( this._gl.CW );

			this._gl.enable( this._gl.CULL_FACE );

		}else{

			
		}
		
		this._gl.useProgram( obj.program );

		this.applyUniforms( mat.uniforms );

		this.applyUniforms( obj.IndividualUniforms );

		this.setAttributes( geo );

		if( ( obj as Mesh ).isMesh ){

			this._gl.drawElements( this._gl.TRIANGLES, geo.attributes.index.vertices.length, this._gl.UNSIGNED_SHORT, 0 );

		}else if( ( obj as Points ).isPoints ){

			this._gl.drawArrays( this._gl.POINTS, 0, geo.attributes.position.vertices.length / 3 );

		}



	}

	public render( scene: Scene, camera: Camera ){

		camera.updateMatrix();		

		this._gl.clear( this._gl.COLOR_BUFFER_BIT );
		
		for( let i = 0; i < scene.children.length; i++ ){

			let obj = scene.children[i];
			
			if( ( obj as RenderingObject ).isRenderingObject ){

				this.renderObject( obj as RenderingObject, camera );

			}

		}
		
		this._gl.flush();

	}

}