import { Material, MaterialParam, Uniforms } from "./Material";
import { Scene } from "../objects/Scene";
import { Camera } from "./Camera";
import { Mesh } from "../objects/Mesh";
import { Geometry } from "../geometries/Geometry";
import { Vec2 } from "../math/Vec2";
import { Vec3 } from "../math/Vec3";
import { Mat4 } from "../math/Mat4";

export declare interface RendererParam{
	canvas: HTMLCanvasElement;
	retina?: boolean;
}

export class Renderer{

	protected _gl: WebGLRenderingContext;

	protected _canvas: HTMLCanvasElement;

	protected pixelRatio: number;

	protected isRetina: boolean;

	constructor( param: RendererParam ){

		console.log( "%c- GLパワーをみせつけろ "  + " -", 'padding: 5px 10px ;background-color: black; color: white;font-size:11px' );


		this._canvas = param.canvas;

		this._gl = this._canvas.getContext( 'webgl' );

		this.isRetina = param.retina || false;

	}

	public setSize( width: number, height: number ){

		this._canvas.width = width * ( this.isRetina ? window.devicePixelRatio : 1 );
		this._canvas.height = height * ( this.isRetina ? window.devicePixelRatio : 1 );

		this._gl.viewport(0, 0, this._gl.canvas.width, this._gl.canvas.height);

	}

	protected createProgram( obj: Mesh ){

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

			console.warn(this._gl.getShaderInfoLog(shader));
			
			return null;
			
        }

	}

	protected createAttributes( obj: Mesh ){

		let mat = obj.material;
		let geo = obj.geometry;

		let prg = obj.program;

		let keys = Object.keys( geo.attributes );

		for ( let i = 0; i < keys.length; i++ ){

			let key = keys[i];
			let attr = geo.attributes[key];

			attr.location = this._gl.getAttribLocation( prg, key.toString() );
			
			attr.vbo = this.createBufferObject( attr.vertices, key == 'index' );
			
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

		let keys = Object.keys( geo.attributes );

		for ( let i = 0; i < keys.length; i++ ){

			let key = keys[i];
			let attr = geo.attributes[key];

			if( key == 'index' ){

				this._gl.bindBuffer( this._gl.ELEMENT_ARRAY_BUFFER, attr.vbo );

			}else{

				this._gl.bindBuffer( this._gl.ARRAY_BUFFER, attr.vbo );
				this._gl.enableVertexAttribArray( attr.location );
				this._gl.vertexAttribPointer( attr.location, attr.stride, this._gl.FLOAT, false, 0, 0 );

			}

		}

	}

	protected createUniforms( program: WebGLProgram, uniforms: Uniforms ){

		let matUniKeys = Object.keys( uniforms );

		for ( let i = 0; i < matUniKeys.length; i++ ) {

			const key = matUniKeys[i];

			let uni = uniforms[key];
			
			uni.location = this._gl.getUniformLocation( program, key.toString() );

		}

	}
	
	protected applyUniforms( uniforms: Uniforms ){

		let keys = Object.keys( uniforms );

		for ( let i = 0; i < keys.length; i++ ) {

			const key = keys[i];

			let uni = uniforms[key];

			if( !uni.value ) continue;

			this.setUniform( uni.location, uni.value );

		}

	}

	
	protected setUniform( location: WebGLUniformLocation, value: any ){

		let type: string;
		let isMat: boolean = false;

		if( typeof( value ) == 'number' ){

			type = 'uniform1f';
			
		}else if( ( value as Vec2 ).isVec2 ){

			type = 'uniform2fv';

		}else if( ( value as Vec3 ).isVec3 ){

			type = 'uniform3fv';

		}else if( ( value as Mat4 ).isMat4 ){

			type = 'uniformMatrix4fv';

			value = value.element;

			isMat = true;

		}

		if( type ){

			if( isMat ){

				this._gl[type]( location, false, value );

			}else{
			
				this._gl[type]( location, value );
				
			}

		}

	}

	protected renderObject( obj: Mesh, camera: Camera ){

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
			
			this.setAttributes( geo );

		}

		this._gl.useProgram( obj.program );

		this.applyUniforms( mat.uniforms );

		this.applyUniforms( obj.IndividualUniforms );

		this._gl.drawElements( this._gl.TRIANGLES, geo.attributes.index.vertices.length, this._gl.UNSIGNED_SHORT, 0 );


	}

	public render( scene: Scene, camera: Camera ){

		camera.updateMatrix();		

		this._gl.clear( this._gl.COLOR_BUFFER_BIT );
		
		for( let i = 0; i < scene.children.length; i++ ){

			let obj = scene.children[i];

			if( ( obj as Mesh ).isMesh ){

				this.renderObject( obj as Mesh, camera );
				
			}

		}
		
		this._gl.flush();

	}

}