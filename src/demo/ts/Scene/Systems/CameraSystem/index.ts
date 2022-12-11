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
		const transform = event.ecs.getComponent<GLP.ComponentsTransformMatrix>( event.world, entity, 'matrix' );

		if ( transform ) {

			camera.viewMatrix.set( transform.world ).inverse();

		}

		if ( camera.needsUpdate === undefined ) {

			this.resizeCamera( camera );

		}

		if ( camera.needsUpdate ) {

			if ( logicName == 'perspectiveCamera' ) {

				const perspective = event.ecs.getComponent<GLP.ComponentCameraPerspective>( event.world, entity, 'perspective' )!;
				camera.projectionMatrix.perspective( perspective.fov, camera.aspectRatio, camera.near, camera.far );

			}

		}

	}

	private resizeCamera( camera: GLP.ComponentCamera ) {

		camera.aspectRatio = this.size.x / this.size.y;
		camera.needsUpdate = true;

		if ( camera.renderPhases ) {

			camera.renderPhases.forEach( setting => {

				if ( setting.onResize ) setting.onResize( this.size, setting.renderTarget, camera );

			} );

		}

	}

	public resize( world: GLP.World, size: GLP.Vector2 ) {

		this.size.copy( size );

		// camera

		const cameraEntities = this.ecs.getEntities( world, [ 'camera' ] );

		cameraEntities.forEach( e => {

			const camera = this.ecs.getComponent<GLP.ComponentCamera>( world, e, 'camera' );

			if ( camera ) this.resizeCamera( camera );

		} );


	}

}
