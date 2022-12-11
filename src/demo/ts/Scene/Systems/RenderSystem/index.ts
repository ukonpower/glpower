import * as GLP from 'glpower';
import { Uniformable } from 'glpower';
import { ProgramPool } from './ProgramPool';

export class RenderSystem extends GLP.System {

	private gl: WebGL2RenderingContext;
	private core: GLP.Power;

	// program

	private programPool: ProgramPool;

	// matrix

	private modelViewMatrix: GLP.Matrix4;

	constructor( ecs: GLP.ECS, core: GLP.Power ) {

		super( ecs, {
			"renderCamera": [ "camera", "perspective" ],
			"renderPostProcess": [ 'postprocess', 'material', 'geometry' ]
		} );

		this.core = core;
		this.gl = this.core.gl;
		this.ecs = ecs;

		// program

		this.programPool = new ProgramPool( core );

		// matrix

		this.modelViewMatrix = new GLP.Matrix4();

	}

	protected updateImpl( _: string, camera: GLP.Entity, event: GLP.SystemUpdateEvent ): void {

		const cameraComponent = event.ecs.getComponent<GLP.ComponentCamera>( event.world, camera, 'camera' )!;

		if ( ! cameraComponent.renderPhases ) return;

		for ( let i = 0; i < cameraComponent.renderPhases.length; i ++ ) {

			const { type, renderTarget } = cameraComponent.renderPhases[ i ];

			if ( renderTarget ) {

				this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, renderTarget.getFrameBuffer() );
				this.gl.drawBuffers( renderTarget.textureAttachmentList );

			} else {

				this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );

			}

			this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
			this.gl.clearDepth( 1.0 );
			this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );
			this.gl.enable( this.gl.DEPTH_TEST );

			const meshes = event.ecs.getEntities( event.world, [ 'material', 'material', 'geometry' ] );

			for ( let i = 0; i < meshes.length; i ++ ) {

				const mesh = meshes[ i ];

				const material = event.ecs.getComponent<GLP.ComponentMaterial>( event.world, mesh, 'material' );
				const geometry = event.ecs.getComponent<GLP.ComponentGeometry>( event.world, mesh, 'geometry' );
				const matrix = event.ecs.getComponent<GLP.ComponentsTransformMatrix>( event.world, mesh, 'matrix' );

				if ( material && geometry && matrix ) {

					if ( material.renderType == type ) {

						this.draw( meshes[ i ], geometry, material, event, { modelMatrix: matrix.world, viewMatrix: cameraComponent.viewMatrix, projectionMatrix: cameraComponent.projectionMatrix } );

					}

				}

			}

		}

	}

	private draw( entity: number, geometry: GLP.ComponentGeometry, material: GLP.ComponentMaterial, event: GLP.SystemUpdateEvent, matrix?: {modelMatrix: GLP.Matrix4, viewMatrix: GLP.Matrix4, projectionMatrix: GLP.Matrix4} ) {

		const program = this.programPool.create( material.vertexShader, material.fragmentShader );

		// update uniforms

		if ( matrix ) {

			this.modelViewMatrix.copy( matrix.modelMatrix ).preMultiply( matrix.viewMatrix );

			program.setUniform( 'modelViewMatrix', 'Matrix4fv', this.modelViewMatrix.elm );
			program.setUniform( 'projectionMatrix', 'Matrix4fv', matrix.projectionMatrix.elm );

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

					} else {

						arrayValue.push( ...v.elm );

					}

				};

				if ( Array.isArray( value ) ) {

					for ( let j = 0; j < value.length; j ++ ) {

						_( value[ i ] );

					}

				} else {

					_( value );

				}

				program.setUniform( keys[ i ], type, arrayValue );

			}

		}

		// update attributes

		const vao = program.getVAO( entity.toString() );

		if ( vao ) {

			if ( geometry.needsUpdate === undefined || geometry.needsUpdate === true ) {

				for ( let i = 0; i < geometry.attributes.length; i ++ ) {

					const attr = geometry.attributes[ i ];

					vao.setAttribute( attr.name, attr.buffer, attr.size, attr.count );

				}

				vao.setIndex( geometry.index.buffer );

				vao.updateAttributes( true );

				geometry.needsUpdate = false;

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

	protected afterUpdateImpl( _: string, event: GLP.SystemUpdateEvent ): void {

		this.gl.flush();

	}

}
