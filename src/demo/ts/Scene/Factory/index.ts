import * as GLP from 'glpower';

import basicVert from './shaders/basic.vs';

import quadVert from './shaders/quad.vs';
import postProcessFrag from './shaders/postprocess.fs';

import deferredMaterialFrag from './shaders/deferredMaterial.fs';
import deferredShadingFrag from './shaders/deferredShading.fs';

//bloom shader
import bloomBlurFrag from './shaders/bloomBlur.fs';
import bloomBrightFrag from './shaders/bloomBright.fs';

interface EmptyProps {
	position?: GLP.IVector3;
	rotation?: GLP.IVector3;
	scale?: GLP.IVector3;
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
	type?: GLP.BLidgeObjectType
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

	/*-------------------------------
		Empty
	-------------------------------*/

	public empty( props: EmptyProps = {} ) {

		const entity = this.ecs.createEntity( this.world );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, entity, 'position', props.position ?? { x: 0, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, entity, 'rotation', props.rotation ?? { x: 0, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.ComponentVector4>( this.world, entity, 'quaternion', { x: 0, y: 0, z: 0, w: 1 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, entity, 'scale', props.scale ?? { x: 1, y: 1, z: 1 } );
		this.ecs.addComponent<GLP.ComponentTransformMatrix>( this.world, entity, 'matrix', { local: new GLP.Matrix(), world: new GLP.Matrix() } );
		this.ecs.addComponent<GLP.ComponentSceneNode>( this.world, entity, 'sceneNode', { children: [] } );

		return entity;

	}

	/*-------------------------------
		BLidge
	-------------------------------*/

	public appendBlidge( entity: GLP.Entity, props: BLidgeProps ) {

		this.ecs.addComponent<GLP.ComponentBLidge>( this.world, entity, 'blidge', {
			name: props.name,
			type: props.type ?? 'empty',
		} );

		return entity;

	}

	/*-------------------------------
		Mesh
	-------------------------------*/

	public appendMesh( entity: GLP.Entity, props: MeshProps ) {

		this.ecs.addComponent<GLP.ComponentMaterial>( this.world, entity, 'material', props.material ??
		{
		 	vertexShader: basicVert,
		 	fragmentShader: deferredMaterialFrag,
		 	uniforms: {
		 		uColor: {
		 			value: new GLP.Vector( 1.0, 0.0, 0.0 ),
		 			type: '3f'
		 		}
		 	},
			renderType: 'deferred',
		}, );

		this.ecs.addComponent<GLP.ComponentGeometry>( this.world, entity, 'geometry', props.geometry );

		return entity;

	}

	public appendCube( entity: GLP.Entity ) {

		return this.appendMesh( entity, {
			geometry: new GLP.CubeGeometry().getComponent( this.power ),
		} );

	}

	public appendSphere( entity: GLP.Entity ) {

		return this.appendMesh( entity, {
			geometry: new GLP.SphereGeometry().getComponent( this.power ),
		} );

	}

	public appendPlane( entity: GLP.Entity ) {

		return this.appendMesh( entity, {
			geometry: new GLP.PlaneGeometry().getComponent( this.power ),
		} );

	}

	/*-------------------------------
		Camera
	-------------------------------*/

	public camera( props: CameraProps, rt: {
		forwardRenderTarget: GLP.GLPowerFrameBuffer,
		deferredRenderTarget: GLP.GLPowerFrameBuffer,
		deferredCompositorRenderTarget: GLP.GLPowerFrameBuffer,
	} ) {

		const entity = this.empty();

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

		this.ecs.addComponent<GLP.ComponentRenderCamera>( this.world, entity, 'renderCameraForward', {
			renderTarget: rt.forwardRenderTarget,
		} );

		const uniformCameraPos = new GLP.Vector();

		this.ecs.addComponent<GLP.ComponentRenderCamera>( this.world, entity, 'renderCameraDeferred',
			{
				renderTarget: rt.deferredRenderTarget,
				postprocess: [ {
					input: rt.deferredRenderTarget.textures,
					vertexShader: quadVert,
					fragmentShader: deferredShadingFrag,
					renderTarget: rt.deferredCompositorRenderTarget,
					uniforms: {
						uColor: {
							value: new GLP.Vector( 1.0, 0.0, 0.0 ),
							type: '3f'
						},
						uCameraPosition: {
							value: uniformCameraPos,
							type: '3f'
						}
					},
				} ],
			},
		);

		// event

		const componentPosition = this.ecs.getComponent<GLP.ComponentVector3>( this.world, entity, 'position' )!;

		this.ecs.addComponent<GLP.ComponentEvents>( this.world, entity, 'events',
			{
				onUpdate: ( e ) => {

					uniformCameraPos.copy( componentPosition );

				},
				onResize: ( e ) => {

					rt.forwardRenderTarget.setSize( e.size );
					rt.deferredRenderTarget.setSize( e.size );
					rt.deferredCompositorRenderTarget.setSize( e.size );

				}
			},
		);

		return entity;

	}

	/*-------------------------------
		Light
	-------------------------------*/

	public appendLight( entity: GLP.Entity ) {

		this.ecs.addComponent<GLP.ComponentLightDirection>( this.world, entity, 'directionalLight', {
			color: new GLP.Vector( 1.0, 1.0, 1.0 ).multiply( Math.PI ),
			intensity: Math.PI
		} );

	}

	/*-------------------------------
		PostProcess
	-------------------------------*/

	public postprocess( input: GLP.GLPowerFrameBuffer, out: GLP.GLPowerFrameBuffer | null ) {

		const resolution = new GLP.Vector();
		const bloomRenderCount = 5;

		const entity = this.empty();

		const rt1 = new GLP.GLPowerFrameBuffer( this.gl ).setTexture( [ this.power.createTexture().setting( { magFilter: this.gl.LINEAR, minFilter: this.gl.LINEAR } ) ] );
		const rt2 = new GLP.GLPowerFrameBuffer( this.gl ).setTexture( [ this.power.createTexture().setting( { magFilter: this.gl.LINEAR, minFilter: this.gl.LINEAR } ) ] );
		const rt3 = new GLP.GLPowerFrameBuffer( this.gl ).setTexture( [ this.power.createTexture() ] );

		this.ecs.addComponent<GLP.ComponentPostProcess>( this.world, entity, 'postprocess', [
			{
				input: input.textures,
				renderTarget: rt1,
				vertexShader: quadVert,
				fragmentShader: bloomBrightFrag,
				uniforms: {
					threshold: {
						type: '1f',
						value: 0.5,
					},
				},
				customGeometry: new GLP.MipMapGeometry( bloomRenderCount ).getComponent( this.power )
			},
			{
				input: rt1.textures,
				renderTarget: rt2,
				vertexShader: quadVert,
				fragmentShader: bloomBlurFrag,
				uniforms: {
					uIsVertical: {
						type: '1i',
						value: true
					},
					uWeights: {
						type: '1fv',
						value: this.weight( bloomRenderCount )
					},
					uResolution: {
						type: '2fv',
						value: resolution,
					}
				},
				defines: {
					GAUSS_WEIGHTS: bloomRenderCount.toString()
				}
			},
			{
				input: rt2.textures,
				renderTarget: rt1,
				vertexShader: quadVert,
				fragmentShader: bloomBlurFrag,
				uniforms: {
					uIsVertical: {
						type: '1i',
						value: false
					},
					uWeights: {
						type: '1fv',
						value: this.weight( bloomRenderCount )
					},
					uResolution: {
						type: '2fv',
						value: resolution,
					}
				},
				defines: {
					GAUSS_WEIGHTS: bloomRenderCount.toString()
				}
			},
			{
				input: [
					input.textures[ 0 ],
					rt1.textures[ 0 ],
				],
				renderTarget: out,
				vertexShader: quadVert,
				fragmentShader: postProcessFrag,
				uniforms: {
				},
				defines: {
					BLOOM_COUNT: bloomRenderCount.toString()
				}
			},
		] );

		this.ecs.addComponent<GLP.ComponentEvents>( this.world, entity, 'events', {
			onResize: ( e ) => {

				resolution.copy( e.size );

				rt1.setSize( e.size );
				rt2.setSize( e.size );
				rt3.setSize( e.size );

			}
		} );

	}

	private weight( num: number ) {

		const weight = new Array( num );

		// https://wgld.org/d/webgl/w057.html
		let t = 0.0;
		const d = 100;
		for ( let i = 0; i < weight.length; i ++ ) {

			const r = 1.0 + 2.0 * i;
			let w = Math.exp( - 0.5 * ( r * r ) / d );
			weight[ i ] = w;

			if ( i > 0 ) {

				w *= 2.0;

			}

			t += w;

		}

		for ( let i = 0; i < weight.length; i ++ ) {

			weight[ i ] /= t;

		}

		return weight;

	}

}
