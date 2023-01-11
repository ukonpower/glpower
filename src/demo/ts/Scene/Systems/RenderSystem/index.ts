import * as GLP from 'glpower';
import { Entity, Uniformable } from 'glpower';
import { ProgramManager } from './ProgramManager';

type CameraMatrix = {
	modelMatrix?: GLP.Matrix,
	viewMatrix: GLP.Matrix,
	projectionMatrix: GLP.Matrix
}

export type Lights = {
	needsUpdate: boolean
	directionalLight: {direction: GLP.Vector, color: GLP.Vector}[],
	pointLight: {position: GLP.Vector, color: GLP.Vector}[]
}

export class RenderSystem extends GLP.System {

	private gl: WebGL2RenderingContext;
	private power: GLP.Power;

	// program

	private programManager: ProgramManager;

	// matrix

	private modelViewMatrix: GLP.Matrix;
	private normalMatrix: GLP.Matrix;

	// tmp

	private lightPosition: GLP.Vector;
	private lightDirection: GLP.Vector;

	// quad

	private quad: GLP.ComponentGeometry;

	// lights

	private lights: Lights;

	constructor( ecs: GLP.ECS, core: GLP.Power ) {

		super( ecs, {
			"directionalLight": [ 'directionalLight', 'position' ],
			"pointLight": [ 'pointLight', 'position' ],
			"shadowMap": [ 'camera', 'renderCameraShadowMap' ],
			"deferred": [ "camera", "renderCameraDeferred" ],
			"forward": [ "camera", "renderCameraForward" ],
			"postprocess": [ 'postprocess' ]
		} );

		this.power = core;
		this.gl = this.power.gl;
		this.ecs = ecs;

		// program

		this.programManager = new ProgramManager( core );

		// matrix

		this.modelViewMatrix = new GLP.Matrix();
		this.normalMatrix = new GLP.Matrix();

		// tmp

		this.lightPosition = new GLP.Vector();
		this.lightDirection = new GLP.Vector();

		// quad

		this.quad = new GLP.PlaneGeometry( 2.0, 2.0 ).getComponent( this.power );

		// light

		this.lights = {
			needsUpdate: false,
			directionalLight: [],
			pointLight: []
		};

	}

	protected beforeUpdateImpl( phase: string, event: GLP.SystemUpdateEvent, entities: Entity[] ): void {

		this.lights.needsUpdate = false;

		if ( phase == 'directionalLight' ) {

			if ( this.lights.directionalLight.length != entities.length ) this.lights.needsUpdate = true;

			this.lights.directionalLight.length = 0;

		} else if ( phase == 'pointLight' ) {

			if ( this.lights.pointLight.length != entities.length ) this.lights.needsUpdate = true;

			this.lights.pointLight.length = 0;

		}

	}

	protected updateImpl( phase: string, entity: GLP.Entity, event: GLP.SystemUpdateEvent ): void {

		if ( phase == 'directionalLight' ) {

			this.collectLight( entity, event, 'directional' );

		} else if ( phase == 'pointLight' ) {

			this.collectLight( entity, event, 'point' );

		} else if ( phase == 'postprocess' ) {

			this.renderPostProcess( entity + '_postprocess', this.ecs.getComponent<GLP.ComponentPostProcess>( event.world, entity, 'postprocess' )!, event );

		} else {

			this.renderCamera( phase, entity, event );

		}

	}

	protected afterUpdateImpl( phase: string, event: GLP.SystemUpdateEvent ): void {
	}

	private collectLight( entity: GLP.Entity, event: GLP.SystemUpdateEvent, type: string ) {

		if ( type == 'directional' ) {

			const light = event.ecs.getComponent<GLP.ComponentLightDirection>( event.world, entity, 'directionalLight' )!;
			const quaternion = event.ecs.getComponent<GLP.ComponentVector4>( event.world, entity, 'quaternion' )!;

			this.lights.directionalLight.push( {
				direction: new GLP.Vector( 0.0, 1.0, 0.0 ).applyMatrix4( new GLP.Matrix().applyQuaternion( new GLP.Quaternion( quaternion.x, quaternion.y, quaternion.z, quaternion.w ) ) ),
				color: new GLP.Vector( light.color.x, light.color.y, light.color.z )
			} );

		}

	}

	private renderCamera( renderPhase: string, entity: GLP.Entity, event: GLP.SystemUpdateEvent ) {

		const { viewMatrix, projectionMatrix } = event.ecs.getComponent<GLP.ComponentCamera>( event.world, entity, 'camera' )!;

		let renderCameraType = 'renderCameraForward';

		if ( renderPhase == 'deferred' ) {

			renderCameraType = 'renderCameraDeferred';

		} else if ( renderPhase == 'shadowMap' ) {

			renderCameraType = 'renderCameraShadowMap';

		}

		const { renderTarget, postprocess } = event.ecs.getComponent<GLP.ComponentRenderCamera & GLP.ComponentShadowmapCamera>( event.world, entity, renderCameraType )!;

		if ( renderTarget ) {

			this.gl.viewport( 0, 0, renderTarget.size.x, renderTarget.size.y );
			this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, renderTarget.getFrameBuffer() );
			this.gl.drawBuffers( renderTarget.textureAttachmentList );

		} else {

			this.gl.viewport( 0, 0, window.innerWidth, window.innerHeight ); //DEBUG
			this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );

		}

		this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
		this.gl.clearDepth( 1.0 );
		this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );
		this.gl.enable( this.gl.DEPTH_TEST );

		let materialType = 'material';

		if ( renderPhase == 'shadowMap' ) materialType = 'materialDepth';

		const meshes = event.ecs.getEntities( event.world, [ materialType, 'geometry' ] );

		for ( let i = 0; i < meshes.length; i ++ ) {

			const mesh = meshes[ i ];

			const material = event.ecs.getComponent<GLP.ComponentMaterial>( event.world, mesh, materialType );
			const geometry = event.ecs.getComponent<GLP.ComponentGeometry>( event.world, mesh, 'geometry' );
			const matrix = event.ecs.getComponent<GLP.ComponentTransformMatrix>( event.world, mesh, 'matrix' );

			if ( material && geometry && matrix ) {

				if ( material.renderType == renderPhase ) {

					this.draw( meshes[ i ] + renderPhase, geometry, material, event, { modelMatrix: matrix.world, viewMatrix: viewMatrix, projectionMatrix: projectionMatrix } );

				}

			}

		}

		if ( postprocess ) {

			this.renderPostProcess( entity + '_cameraPostProcess', postprocess, event, { viewMatrix: viewMatrix, projectionMatrix: projectionMatrix } );

		}

	}

	public renderPostProcess( entityId: string, postprocess: GLP.ComponentPostProcess, event: GLP.SystemUpdateEvent, matrix?: CameraMatrix ) {

		for ( let i = 0; i < postprocess.length; i ++ ) {

			const pp = postprocess[ i ];

			if ( pp.renderTarget ) {

				this.gl.viewport( 0, 0, pp.renderTarget.size.x, pp.renderTarget.size.y );
				this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, pp.renderTarget.getFrameBuffer() );
				this.gl.drawBuffers( pp.renderTarget.textureAttachmentList );

			} else {

				this.gl.viewport( 0, 0, window.innerWidth, window.innerHeight ); //DEBUG
				this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );

			}

			this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
			this.gl.clearDepth( 1.0 );
			this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );
			this.gl.enable( this.gl.DEPTH_TEST );

			if ( pp.input && pp.uniforms ) {

				for ( let i = 0; i < pp.input.length; i ++ ) {

					pp.input[ i ].activate( i );

					pp.uniforms[ 'sampler' + i ] = {
						type: '1i',
						value: pp.input[ i ].unit
					};

				}

			}

			this.draw( entityId + i, pp.customGeometry || this.quad, pp, event, matrix );

		}

	}

	private draw( entityId: string, geometry: GLP.ComponentGeometry, material: GLP.ComponentMaterial, event: GLP.SystemUpdateEvent, matrix?: CameraMatrix ) {

		// program

		if ( material.__program === undefined || material.needsUpdate !== false || this.lights.needsUpdate ) {

			material.__program = this.programManager.get( material, this.lights );

			material.needsUpdate = false;

		}

		const program = material.__program;

		// update uniforms

		if ( matrix ) {

			if ( matrix.modelMatrix && matrix.viewMatrix ) {

				this.modelViewMatrix.copy( matrix.modelMatrix ).preMultiply( matrix.viewMatrix );
				this.normalMatrix.copy( this.modelViewMatrix );
				this.normalMatrix.inverse();
				this.normalMatrix.transpose();

				program.setUniform( 'normalMatrix', 'Matrix4fv', this.normalMatrix.elm );
				program.setUniform( 'modelViewMatrix', 'Matrix4fv', this.modelViewMatrix.elm );

			}

			if ( matrix.modelMatrix ) program.setUniform( 'modelMatrix', 'Matrix4fv', matrix.modelMatrix.elm );

			program.setUniform( 'viewMatrix', 'Matrix4fv', matrix.viewMatrix.elm );
			program.setUniform( 'projectionMatrix', 'Matrix4fv', matrix.projectionMatrix.elm );

			for ( let i = 0; i < this.lights.directionalLight.length; i ++ ) {

				const dLight = this.lights.directionalLight[ i ];

				this.lightDirection.copy( dLight.direction ).applyMatrix3( matrix.viewMatrix );

				program.setUniform( 'directionalLight[' + i + '].direction', '3fv', this.lightDirection.getElm( 'vec3' ) );
				program.setUniform( 'directionalLight[' + i + '].color', '3fv', dLight.color.getElm( 'vec3' ) );

			}

		}

		if ( material.uniforms ) {

			const keys = Object.keys( material.uniforms );

			for ( let i = 0; i < keys.length; i ++ ) {

				const name = keys[ i ];
				const uni = material.uniforms[ name ];
				const type = uni.type;
				const value = uni.value;

				const arrayValue: ( number | boolean )[] = [];

				const _ = ( v: Uniformable ) => {

					if ( typeof v == 'number' || typeof v == 'boolean' ) {

						arrayValue.push( v );

					} else if ( 'isVector' in v ) {

						arrayValue.push( ...v.getElm( ( 'vec' + type.charAt( 0 ) ) as any ) );

					} else {

						arrayValue.push( ...v.elm );

					}

				};

				if ( Array.isArray( value ) ) {

					for ( let j = 0; j < value.length; j ++ ) {

						_( value[ j ] );

					}

				} else {

					_( value );

				}

				program.setUniform( name, type, arrayValue );

			}

		}

		// update attributes

		const vao = program.getVAO( entityId.toString() );

		if ( vao ) {

			if ( geometry.needsUpdate === undefined ) {

				geometry.needsUpdate = {};

			}

			if ( geometry.needsUpdate[ entityId ] !== false ) {

				for ( let i = 0; i < geometry.attributes.length; i ++ ) {

					const attr = geometry.attributes[ i ];

					vao.setAttribute( attr.name, attr.buffer, attr.size, attr.count );

				}

				vao.setIndex( geometry.index.buffer );

				vao.updateAttributes( true );

				geometry.needsUpdate[ entityId ] = false;

			}

		}

		// draw

		program.use();

		program.uploadUniforms();

		if ( vao ) {

			this.gl.bindVertexArray( vao.getVAO() );

			this.gl.drawElements( this.gl.TRIANGLES, vao.indexCount, this.gl.UNSIGNED_SHORT, 0 );

			this.gl.bindVertexArray( null );

		}

		program.clean();

	}

}
