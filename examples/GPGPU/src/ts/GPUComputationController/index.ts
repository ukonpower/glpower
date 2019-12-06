import * as GLP from '../../../../../src';

import passThroughVert from './shaders/passThrough.vs';
import passThroughFrag from './shaders/passThrough.fs';

export interface GPUComputationKernel{
    material: GLP.Material,
    uniforms: GLP.Uniforms,
}

export interface GPUcomputationData{
    buffer: GLP.FrameBuffer 
}

export class GPUComputationController {

    private gl: WebGLRenderingContext;
    
    private renderer: GLP.Renderer;
    private resolution: GLP.Vec2

    private scene: GLP.Scene;
    private camera: GLP.Camera;

    private mesh: GLP.RenderingObject;
    private materials: GLP.Material[];

    private tempDataLinear: GPUcomputationData;
    private tempDataNear: GPUcomputationData;

    constructor( gl: WebGLRenderingContext, renderer: GLP.Renderer, resolution: GLP.Vec2 ){

        this.gl = gl;
        
        this.renderer = renderer;

        this.resolution = resolution;

        this.tempDataLinear = this.createData({ 
            minFilter: gl.LINEAR,
            magFilter: gl.LINEAR
        });

        this.tempDataNear = this.createData({ 
            minFilter: gl.NEAREST,
            magFilter: gl.NEAREST
        });

        this.scene = new GLP.Scene();
		this.camera = new GLP.Camera( 50, 0.01, 100, 1 );
        this.camera.position.z = 1;
        
        this.materials = [];
        this.mesh = new GLP.RenderingObject({
            geo: new GLP.PlaneGeometry( 2, 2 )
        });

		this.scene.add( this.mesh );

    }

    public createData( textureParam?: GLP.FrameBufferParam ): GPUcomputationData{

        if( !textureParam ){

            textureParam = {};
            
        }
        
        let buf = new GLP.FrameBuffer({
            width: this.resolution.x,
            height: this.resolution.y,
            wrapS: textureParam.wrapS || this.gl.CLAMP_TO_EDGE,
            wrapT: textureParam.wrapT || this.gl.CLAMP_TO_EDGE,
            minFilter: textureParam.minFilter || this.gl.NEAREST,
            magFilter: textureParam.magFilter || this.gl.NEAREST,
            texType: this.gl.FLOAT
        });

        let data = { buffer: buf };

        return data;

    }

    public createKernel( shader: string ): GPUComputationKernel{
        
        let uniforms: GLP.Uniforms = {
            resolution: {
                value: this.resolution
            }
        };

        let mat = new GLP.Material({
            vert: passThroughVert,
            frag: shader,
            uniforms: uniforms
        });

        this.materials.push(mat);

        let kernel: GPUComputationKernel = {
            material: mat,
            uniforms: uniforms
        }

        return kernel;

    }

    public compute( kernel: GPUComputationKernel, variable: GPUcomputationData ){

        let temp: GPUcomputationData;

        if( variable.buffer.tex.magFilter == this.gl.LINEAR ){
            
            temp = this.tempDataLinear;

        }else{

            temp = this.tempDataNear;
            
        }

        this.mesh.material = kernel.material;

        this.renderer.setFrameBuffer( temp.buffer );

        this.renderer.render( this.scene, this.camera );
        
        this.swapBuffers( variable, temp );

        this.renderer.setFrameBuffer( null );
        
    }

    private swapBuffers( b1: GPUcomputationData, b2: GPUcomputationData ){

        let tmp = b1.buffer;
        b1.buffer = b2.buffer;
        b2.buffer = tmp;

    }
    
}