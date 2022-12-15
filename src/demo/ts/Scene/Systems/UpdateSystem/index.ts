import * as GLP from 'glpower';

export class UpdateSystem extends GLP.System {

	constructor( ecs: GLP.ECS ) {

		super( ecs, {
			"": [ 'event' ]
		} );

	}

	protected updateImpl( logicName: string, entity: number, event: GLP.SystemUpdateEvent ): void {

		const eventComponent = event.ecs.getComponent<GLP.ComponentEvent>( event.world, entity, 'event' );

		if ( eventComponent ) {

			if ( eventComponent.onUpdate ) eventComponent.onUpdate( event );

		}

	}

}
