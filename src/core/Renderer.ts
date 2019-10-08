import { Material } from "./Material";

export declare interface RendererParam{
	canvas: HTMLCanvasElement;
	retina?: boolean;
}

export class Renderer{

	protected _gl: WebGLRenderingContext;

	protected _canvas: HTMLCanvasElement;

	constructor( param: RendererParam ){

		console.log( 'glpower' );

		this._canvas = param.canvas;

		this._gl = this._canvas.getContext( 'webgl' );

	}

	protected createProgram( mat: Material ){

		let prg = this._gl.createProgram();

		let vs = this.createShader( mat.vert, this._gl.VERTEX_SHADER );
		let fs = this.createShader( mat.frag, this._gl.FRAGMENT_SHADER );

		this._gl.attachShader( prg, vs );
		this._gl.attachShader( prg, fs );
		this._gl.linkProgram( prg );

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

	public render( ){

	}

}