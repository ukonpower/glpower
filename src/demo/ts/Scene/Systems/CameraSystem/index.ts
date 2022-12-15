import * as GLP from 'glpower';

export class CameraSystem extends GLP.System {

	private size: GLP.Vector2;

	constructor( ecs: GLP.ECS ) {

		super( ecs, {
			perspectiveCamera: [ "camera", "perspective" ]
		} );

		this.size = new GLP.Vector2();

	}

	protected updateImpl( logicName: string, entity: number, event: GLP.SystemUpdateEvent ): void {

		const camera = event.ecs.getComponent<GLP.ComponentCamera>( event.world, entity, 'camera' )!;
		const transform = event.ecs.getComponent<GLP.ComponentTransformMatrix>( event.world, entity, 'matrix' );

		if ( transform ) {

			camera.viewMatrix.copy( transform.world ).inverse();

		}

		if ( camera.needsUpdate === undefined ) {

			this.resizeCamera( entity, event.world );

		}

		if ( camera.needsUpdate ) {

			if ( logicName == 'perspectiveCamera' ) {

				const perspective = event.ecs.getComponent<GLP.ComponentCameraPerspective>( event.world, entity, 'perspective' )!;
				camera.projectionMatrix.perspective( perspective.fov, camera.aspectRatio, camera.near, camera.far );

			}

		}

	}

	private resizeCamera( cameraEntity: GLP.Entity, world: GLP.World ) {

		const camera = this.ecs.getComponent<GLP.ComponentCamera>( world, cameraEntity, 'camera' );
		const renderCameraDeferred = this.ecs.getComponent<GLP.ComponentRenderCamera>( world, cameraEntity, 'renderCameraDeferred' );
		const renderCameraForward = this.ecs.getComponent<GLP.ComponentRenderCamera>( world, cameraEntity, 'renderCameraForward' );

		if ( camera ) {

			camera.aspectRatio = this.size.x / this.size.y;
			camera.needsUpdate = true;

		}

		if ( renderCameraDeferred && renderCameraDeferred.onResize ) renderCameraDeferred.onResize( this.size, renderCameraDeferred );
		if ( renderCameraForward && renderCameraForward.onResize ) renderCameraForward.onResize( this.size, renderCameraForward );

	}

	public resize( world: GLP.World, size: GLP.Vector2 ) {

		this.size.copy( size );

		// camera

		const cameraEntities = this.ecs.getEntities( world, [ 'camera' ] );

		cameraEntities.forEach( camera => {

			this.resizeCamera( camera, world );

		} );


	}

}
