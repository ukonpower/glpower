import * as GLP from 'glpower';
import { ProgramPool } from './ProgramPool';

export class RenderSystem extends GLP.System {

	private gl: WebGL2RenderingContext;
	private core: GLP.Core;

	// program

	private programPool: ProgramPool;

	// camera

	private camera: GLP.Entity;

	// matrix

	private projectionMatrix: GLP.Matrix4;
	private viewMatrix: GLP.Matrix4;
	private modelMatrix: GLP.Matrix4;
	private modelViewMatrix: GLP.Matrix4;

	constructor( core: GLP.Core, camera: GLP.Entity ) {

		super( {
			'': [
				'matrix',
			]
		} );

		this.core = core;
		this.gl = this.core.gl;

		// program

		this.programPool = new ProgramPool( core );

		// camera

		this.camera = camera;

		// matrix

		this.projectionMatrix = new GLP.Matrix4();
		this.viewMatrix = new GLP.Matrix4();
		this.modelMatrix = new GLP.Matrix4();
		this.modelViewMatrix = new GLP.Matrix4();

	}

	protected beforeUpdateImpl( _: string, event: GLP.SystemUpdateEvent ): void {

		this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
		this.gl.clearDepth( 1.0 );
		this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );

		this.gl.enable( this.gl.DEPTH_TEST );

		const cameraPerspective = event.ecs.getComponent<GLP.ComponentPerspectiveCamera>( event.world, this.camera, 'perspectiveCamera' );

		if ( cameraPerspective ) {

			this.projectionMatrix.perspective( cameraPerspective.fov, cameraPerspective.aspectRatio, cameraPerspective.near, cameraPerspective.far );

		}

		const cameraTransform = event.ecs.getComponent<GLP.ComponentsTransformMatrix>( event.world, this.camera, 'matrix' );

		if ( cameraTransform ) {

			this.viewMatrix.set( cameraTransform.world ).inverse();

		}

	}

	protected updateImpl( _: string, entity: number, event: GLP.SystemUpdateEvent ): void {

		const matrix = event.ecs.getComponent<GLP.ComponentsTransformMatrix>( event.world, entity, 'matrix' );
		const material = event.ecs.getComponent<GLP.ComponentMaterial>( event.world, entity, 'material' );
		const geometry = event.ecs.getComponent<GLP.ComponentGeometry>( event.world, entity, 'geometry' );

		if ( matrix && material && geometry ) {

			const program = this.programPool.create( material.vertexShader, material.fragmentShader );

			// update uniforms

			this.modelMatrix.set( matrix.world );
			this.modelViewMatrix.copy( this.modelMatrix ).preMultiply( this.viewMatrix );

			program.setUniform( 'modelViewMatrix', 'Matrix4fv', this.modelViewMatrix.elm );
			program.setUniform( 'projectionMatrix', 'Matrix4fv', this.projectionMatrix.elm );

			if ( material.uniforms ) {

				const keys = Object.keys( material.uniforms );

				for ( let i = 0; i < keys.length; i ++ ) {

					const uni = material.uniforms[ keys[ i ] ];

					program.setUniform( keys[ i ], uni.type, uni.value );

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

					geometry.needsUpdate = false;

				}

			}

			// draw

			program.use();

			program.uploadUniforms();

			if ( vao ) {

				this.gl.bindVertexArray( vao.getVAO() );

				this.gl.drawElements( this.gl.TRIANGLES, geometry.index.count, this.gl.UNSIGNED_SHORT, 0 );

				this.gl.bindVertexArray( null );

			}

			program.clean();

		}

	}

	protected afterUpdateImpl( _: string, event: GLP.SystemUpdateEvent ): void {

		this.gl.flush();

	}

}
