import { Material, MaterialParam } from "./Material";
import { Scene } from "../objects/Scene";
import { Camera } from "./Camera";
import { Mesh } from "../objects/Mesh";
import { Geometry } from "../geometries/Geometry";
import { Vec2 } from "../math/Vec2";
import { Vec3 } from "../math/Vec3";

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

		console.log( 'GLパワーをみせつけろ' );

		this._canvas = param.canvas;

		this._gl = this._canvas.getContext( 'webgl' );

		this.isRetina = param.retina || false;

	}

	public setSize( width: number, height: number ){

		this._canvas.width = width * ( this.isRetina ? window.devicePixelRatio : 1 );
		this._canvas.height = height * ( this.isRetina ? window.devicePixelRatio : 1 );

		this._gl.viewport(0, 0, this._gl.canvas.width, this._gl.canvas.height);

	}

	protected createProgram( mat: Material ){

		let prg = this._gl.createProgram();

		let vs = this.createShader( mat.vert, this._gl.VERTEX_SHADER );
		let fs = this.createShader( mat.frag, this._gl.FRAGMENT_SHADER );

		this._gl.attachShader( prg, vs );
		this._gl.attachShader( prg, fs );
		this._gl.linkProgram( prg );

		mat.program = prg;

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

	protected createAttributes( mat: Material, geo: Geometry ){

		let prg = mat.program;

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

	protected createUniforms( mat: Material ){

		let keys = Object.keys( mat.uniforms );

		for ( let i = 0; i < keys.length; i++ ) {

			const key = keys[i];

			let uni = mat.uniforms[key];
			
			uni.location = this._gl.getUniformLocation( mat.program, key.toString() );

		}

	}

	protected setUniforms( mat: Material ){

		let keys = Object.keys( mat.uniforms );

		for ( let i = 0; i < keys.length; i++ ) {

			const key = keys[i];

			let uni = mat.uniforms[key];

			let value = uni.value;

			let type = '';

			if( typeof( value ) == 'number' ){

				type = 'uniform1f';
				
			}else if( ( value as Vec2 ).isVec2 ){

				type = 'uniform2fv';

			}else if( ( value as Vec3 ).isVec3 ){

				type = 'uniform3fv';

			}

			this._gl[type]( uni.location, value );

		}

	}

	protected drawMesh( obj: Mesh ){

		let mat = obj.material;
		let geo = obj.geometry;
		
		if( !mat.program ){

			this.createProgram( mat );

			this.createAttributes( mat, geo );

			this.createUniforms( mat );

		}

		this._gl.useProgram( mat.program );

		this.setAttributes( geo );
		this.setUniforms( mat );

		this._gl.clear( this._gl.COLOR_BUFFER_BIT );

		this._gl.drawElements( this._gl.TRIANGLES, geo.attributes.index.vertices.length, this._gl.UNSIGNED_SHORT, 0 );

		this._gl.flush();

	}

	public render( scene: Scene, cmaera: Camera ){

		for( let i = 0; i < scene.children.length; i++ ){

			let obj = scene.children[i];

			if( ( obj as Mesh ).isMesh ){

				this.drawMesh( obj as Mesh );
				
			}

		}

	}

}