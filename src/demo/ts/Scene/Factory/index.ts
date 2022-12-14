import * as GLP from 'glpower';

import basicVert from './shaders/basic.vs';
import basicFrag from './shaders/basic.fs';

import quadVert from './shaders/quad.vs';
import postProcessFrag from './shaders/postprocess.fs';

import deferredMaterialFrag from './shaders/deferredMaterial.fs';
import deferredShadingFrag from './shaders/deferredShading.fs';

import { BLidgeObjectType, Entity } from 'glpower';

interface EmptyProps {
	position?: GLP.ComponentVector3;
	rotation?: GLP.ComponentVector3;
	scale?: GLP.ComponentVector3;
}

interface MeshProps extends EmptyProps{
	material?: GLP.ComponentMaterial
	geometry: GLP.ComponentGeometry
}

interface CameraProps extends EmptyProps {
	near?: number;
	far?: number;
	fov?: number;
}

interface BLidgeProps extends EmptyProps {
	name: string,
	type?: BLidgeObjectType
}

export class Factory {

	private power: GLP.Power;
	private gl: WebGL2RenderingContext;
	private ecs: GLP.ECS;
	private world: GLP.World;


	constructor( power: GLP.Power, ecs: GLP.ECS, world: GLP.World ) {

		this.power = power;
		this.gl = this.power.gl;
		this.ecs = ecs;
		this.world = world;

	}

	public empty( props: EmptyProps = {} ) {

		const entity = this.ecs.createEntity( this.world );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, entity, 'position', props.position ?? { x: 0, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, entity, 'rotation', props.rotation ?? { x: 0, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.ComponentVector4>( this.world, entity, 'quaternion', { x: 0, y: 0, z: 0, w: 1 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, entity, 'scale', props.scale ?? { x: 1, y: 1, z: 1 } );
		this.ecs.addComponent<GLP.ComponentsTransformMatrix>( this.world, entity, 'matrix', { local: new GLP.Matrix(), world: new GLP.Matrix() } );
		this.ecs.addComponent<GLP.ComponentSceneNode>( this.world, entity, 'sceneNode', { children: [] } );

		return entity;

	}

	public blidge( props: BLidgeProps ) {

		const entity = this.empty( props );

		this.ecs.addComponent<GLP.ComponentBLidge>( this.world, entity, 'blidge', {
			name: props.name,
			type: props.type ?? 'empty',
		} );

		return entity;

	}

	public appendMesh( entity: Entity, props: MeshProps ) {

		this.ecs.addComponent<GLP.ComponentMaterial>( this.world, entity, 'material', props.material ??
		{
		 	vertexShader: basicVert,
		 	fragmentShader: deferredMaterialFrag,
		 	uniforms: {
		 		uColor: {
		 			value: new GLP.Vector3( 1.0, 0.0, 0.0 ),
		 			type: '3f'
		 		}
		 	},
			renderType: 'deferred',
		}, );

		this.ecs.addComponent<GLP.ComponentGeometry>( this.world, entity, 'geometry', props.geometry );

		return entity;

	}

	public appendCube( entity: Entity ) {

		return this.appendMesh( entity, {
			geometry: new GLP.CubeGeometry().getComponent( this.power ),
		} );

	}

	public appendSphere( entity: Entity ) {

		return this.appendMesh( entity, {
			geometry: new GLP.SphereGeometry().getComponent( this.power ),
		} );

	}

	public appendPlane( entity: Entity ) {

		return this.appendMesh( entity, {
			geometry: new GLP.PlaneGeometry().getComponent( this.power ),
		} );

	}

	public appendPerspectiveCamera( entity: number, props: CameraProps ) {

		// -------- render target

		// deferred

		const deferredRenderTarget = this.power.createFrameBuffer();

		deferredRenderTarget.setTexture( [
			this.power.createTexture().setting( { type: this.gl.FLOAT, internalFormat: this.gl.RGBA32F, format: this.gl.RGBA } ),
			this.power.createTexture(),
			this.power.createTexture()
		] );

		deferredRenderTarget.textures.forEach( ( f, i ) => {

			f.activate( i );

		} );

		const deferredCompositorRenderTarget = this.power.createFrameBuffer();

		deferredCompositorRenderTarget.setTexture( [ this.power.createTexture() ] );

		deferredCompositorRenderTarget.textures.forEach( ( f, i ) => {

			f.activate( i );

		} );

		// forward

		const forwardRenderTarget = this.power.createFrameBuffer();

		forwardRenderTarget.setTexture( [
			this.power.createTexture(),
		] );

		forwardRenderTarget.textures.forEach( ( f, i ) => {

			f.activate( i );

		} );

		// -------- component

		this.ecs.addComponent<GLP.ComponentCamera>( this.world, entity, 'camera', {
			near: props.near ?? 0.001,
			far: props.far ?? 1000,
			aspectRatio: window.innerWidth / window.innerHeight,
			projectionMatrix: new GLP.Matrix(),
			viewMatrix: new GLP.Matrix(),
		} );

		this.ecs.addComponent<GLP.ComponentCameraPerspective>( this.world, entity, 'perspective', {
			fov: props.fov ?? 50,
		} );

		this.ecs.addComponent<GLP.ComponentRenderCamera>( this.world, entity, 'renderCameraForward',
			{
				renderTarget: forwardRenderTarget,
				onResize: ( size, c ) => {

					if ( c.renderTarget ) c.renderTarget.setSize( size );

				},
			}
		);

		this.ecs.addComponent<GLP.ComponentRenderCamera>( this.world, entity, 'renderCameraDeferred',
			{
				renderTarget: deferredRenderTarget,
				postprocess: {
					vertexShader: quadVert,
					fragmentShader: deferredShadingFrag,
					renderTarget: deferredCompositorRenderTarget,
					uniforms: {
						uColor: {
							value: new GLP.Vector3( 1.0, 0.0, 0.0 ),
							type: '3f'
						}
					},
				},
				onResize: ( size, c ) => {

					if ( c.renderTarget ) c.renderTarget.setSize( size );
					if ( c.postprocess && c.postprocess.renderTarget ) c.postprocess.renderTarget.setSize( size );

				},
			},
		);

		// postprocess

		this.appendPostProcess( entity, deferredCompositorRenderTarget.textures, null );

	}

	public appendPostProcess( entity: GLP.Entity, input: GLP.GLPowerTexture[], target: GLP.GLPowerFrameBuffer | null ) {

		this.ecs.addComponent<GLP.ComponentPostProcess>( this.world, entity, 'postprocess', {
			input,
			renderTarget: target,
			vertexShader: quadVert,
		 	fragmentShader: postProcessFrag,
		 	uniforms: {
		 		uColor: {
		 			value: new GLP.Vector3( 1.0, 0.0, 0.0 ),
		 			type: '3f'
		 		}
		 	},
		} );

		return entity;

	}

}
