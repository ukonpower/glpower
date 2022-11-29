import * as GLP from 'glpower';
import { Uniformable } from 'glpower';
import { ProgramPool } from './ProgramPool';

export class RenderSystem extends GLP.System {

	private gl: WebGL2RenderingContext;
	private core: GLP.Power;

	// ecs

	private ecs: GLP.ECS;
	private world: GLP.World;

	// program

	private programPool: ProgramPool;

	// render

	private width: number;
	private height: number;

	// camera

	private camera: GLP.Entity | null;

	// matrix

	private projectionMatrix: GLP.Matrix4;
	private viewMatrix: GLP.Matrix4;
	private modelMatrix: GLP.Matrix4;
	private modelViewMatrix: GLP.Matrix4;

	constructor( core: GLP.Power, ecs: GLP.ECS, world: GLP.World ) {

		super( {
			'': [
				'matrix',
			]
		} );

		this.core = core;
		this.gl = this.core.gl;
		this.ecs = ecs;
		this.world = world;

		// program

		this.programPool = new ProgramPool( core );

		// render

		this.width = 1;
		this.height = 1;

		// camera

		this.camera = null;

		// matrix

		this.projectionMatrix = new GLP.Matrix4();
		this.viewMatrix = new GLP.Matrix4();
		this.modelMatrix = new GLP.Matrix4();
		this.modelViewMatrix = new GLP.Matrix4();

	}

	protected beforeUpdateImpl( _: string, event: GLP.SystemUpdateEvent ): void {

		if ( this.camera === null ) return;

		this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
		this.gl.clearDepth( 1.0 );
		this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );

		this.gl.enable( this.gl.DEPTH_TEST );

		const cameraPerspective = event.ecs.getComponent<GLP.ComponentPerspectiveCamera>( event.world, this.camera, 'perspectiveCamera' );

		if ( cameraPerspective && cameraPerspective.needsUpdate ) {

			this.projectionMatrix.perspective( cameraPerspective.fov, cameraPerspective.aspectRatio, cameraPerspective.near, cameraPerspective.far );

		}

		const cameraTransform = event.ecs.getComponent<GLP.ComponentsTransformMatrix>( event.world, this.camera, 'matrix' );

		if ( cameraTransform ) {

			this.viewMatrix.set( cameraTransform.world ).inverse();

		}

	}

	protected updateImpl( _: string, entity: number, event: GLP.SystemUpdateEvent ): void {

		if ( this.camera === null ) return;

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

	}

	protected afterUpdateImpl( _: string, event: GLP.SystemUpdateEvent ): void {

		if ( this.camera === null ) return;

		this.gl.flush();

	}

	public setCamera( camera: GLP.Entity | null ) {

		this.camera = camera;

		this.resize( this.width, this.height );

	}

	public resize( width: number, height: number ) {

		this.width = width;
		this.height = height;

		if ( this.camera ) {

			const perspective = this.ecs.getComponent<GLP.ComponentPerspectiveCamera>( this.world, this.camera, 'perspectiveCamera' );

			if ( perspective ) {

				perspective.aspectRatio = width / height;
				perspective.needsUpdate = true;

			}

		}

	}

}
