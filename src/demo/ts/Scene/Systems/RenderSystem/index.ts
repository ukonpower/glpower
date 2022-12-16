import * as GLP from 'glpower';
import { Uniformable } from 'glpower';
import { ProgramPool } from './ProgramPool';

type CameraMatrix = {
	modelMatrix?: GLP.Matrix,
	viewMatrix?: GLP.Matrix,
	projectionMatrix?: GLP.Matrix
}

export class RenderSystem extends GLP.System {

	private gl: WebGL2RenderingContext;
	private power: GLP.Power;

	// program

	private programPool: ProgramPool;

	// matrix

	private modelViewMatrix: GLP.Matrix;
	private normalMatrix: GLP.Matrix;

	// quad

	private quad: GLP.ComponentGeometry;

	// lights

	private directionalLight: {position: GLP.Vector, color: GLP.Vector}[];

	constructor( ecs: GLP.ECS, core: GLP.Power ) {

		super( ecs, {
			"light": [ 'light', 'position' ],
			"deferred": [ "camera", "renderCameraDeferred" ],
			"forward": [ "camera", "renderCameraForward" ],
			"postprocess": [ 'postprocess' ]
		} );

		this.power = core;
		this.gl = this.power.gl;
		this.ecs = ecs;

		// program

		this.programPool = new ProgramPool( core );

		// matrix

		this.modelViewMatrix = new GLP.Matrix();
		this.normalMatrix = new GLP.Matrix();

		// quad

		this.quad = new GLP.PlaneGeometry( 2.0, 2.0 ).getComponent( this.power );

		// light

		this.directionalLight = [];

	}

	protected beforeUpdateImpl( phase: string, event: GLP.SystemUpdateEvent ): void {

		if ( phase == 'light' ) {

			this.directionalLight.length = 0;

		}

	}

	protected updateImpl( phase: string, entity: GLP.Entity, event: GLP.SystemUpdateEvent ): void {

		if ( phase == 'light' ) {

			this.collectLight( entity, event );

		} else if ( phase == 'postprocess' ) {

			this.renderPostProcess( entity + 'postprocess', this.ecs.getComponent<GLP.ComponentPostProcess>( event.world, entity, 'postprocess' )!, event );

		} else {

			this.renderCamera( phase, entity, event );

		}

	}

	private collectLight( entity: GLP.Entity, event: GLP.SystemUpdateEvent ) {

		const light = event.ecs.getComponent<GLP.ComponentLight>( event.world, entity, 'light' )!;
		const position = event.ecs.getComponent<GLP.ComponentVector3>( event.world, entity, 'position' )!;

		this.directionalLight.push( {
			position: new GLP.Vector( position.x, position.y, position.z ),
			color: new GLP.Vector( light.color.x, light.color.y, light.color.z )
		} );

	}

	private renderCamera( renderPhase: string, entity: GLP.Entity, event: GLP.SystemUpdateEvent ) {

		const { viewMatrix, projectionMatrix } = event.ecs.getComponent<GLP.ComponentCamera>( event.world, entity, 'camera' )!;
		const { renderTarget, postprocess } = event.ecs.getComponent<GLP.ComponentRenderCamera>( event.world, entity, renderPhase == 'forward' ? 'renderCameraForward' : 'renderCameraDeferred' )!;

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
			const matrix = event.ecs.getComponent<GLP.ComponentTransformMatrix>( event.world, mesh, 'matrix' );

			if ( material && geometry && matrix ) {

				if ( material.renderType == renderPhase ) {

					this.draw( meshes[ i ] + 'camera', geometry, material, event, { modelMatrix: matrix.world, viewMatrix: viewMatrix, projectionMatrix: projectionMatrix } );

				}

			}

		}

		if ( postprocess && renderTarget ) {

			this.renderPostProcess( entity + 'camerPostProcess', { ...postprocess, input: renderTarget.textures }, event, { viewMatrix: viewMatrix, projectionMatrix: projectionMatrix } );

		}

	}

	public renderPostProcess( entityId: string, postprocess: GLP.ComponentPostProcess, event: GLP.SystemUpdateEvent, matrix?: CameraMatrix ) {

		if ( ! postprocess ) return;

		if ( postprocess.renderTarget ) {

			this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, postprocess.renderTarget.getFrameBuffer() );
			this.gl.drawBuffers( postprocess.renderTarget.textureAttachmentList );

		} else {

			this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );

		}

		this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
		this.gl.clearDepth( 1.0 );
		this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );
		this.gl.enable( this.gl.DEPTH_TEST );

		if ( postprocess.input && postprocess.uniforms ) {

			for ( let i = 0; i < postprocess.input.length; i ++ ) {

				postprocess.input[ i ].activate( i );

				postprocess.uniforms[ 'sampler' + i ] = {
					type: '1i',
					value: postprocess.input[ i ].unit
				};

			}

		}

		this.draw( entityId, this.quad, postprocess, event, matrix );

	}

	private draw( entityId: string, geometry: GLP.ComponentGeometry, material: GLP.ComponentMaterial, event: GLP.SystemUpdateEvent, matrix?: CameraMatrix ) {

		const program = this.programPool.create( material.vertexShader, material.fragmentShader );

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

			if ( matrix.modelMatrix )program.setUniform( 'modelMatrix', 'Matrix4fv', matrix.modelMatrix.elm );

			if ( matrix.viewMatrix )program.setUniform( 'viewMatrix', 'Matrix4fv', matrix.viewMatrix.elm );

			if ( matrix.projectionMatrix ) program.setUniform( 'projectionMatrix', 'Matrix4fv', matrix.projectionMatrix.elm );

		}

		for ( let i = 0; i < this.directionalLight.length; i ++ ) {

			const dLight = this.directionalLight[ i ];

			program.setUniform( 'directionalLight[' + i + '].direction', '3fv', dLight.position.clone().normalize().getElm( 'vec3' ) );
			program.setUniform( 'directionalLight[' + i + '].color', '3fv', dLight.color.getElm( 'vec3' ) );

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

						arrayValue.push( ...v.getElm( 'vec3' ) ); //DEBUG

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

		const vao = program.getVAO( entityId.toString() );

		if ( vao ) {

			if ( geometry.updateCache === undefined || ! geometry.updateCache[ entityId ] ) {

				if ( ! geometry.updateCache ) geometry.updateCache = {};

				for ( let i = 0; i < geometry.attributes.length; i ++ ) {

					const attr = geometry.attributes[ i ];

					vao.setAttribute( attr.name, attr.buffer, attr.size, attr.count );

				}

				vao.setIndex( geometry.index.buffer );

				vao.updateAttributes( true );

				geometry.updateCache[ entityId ] = true;


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
