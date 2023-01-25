import * as GLP from 'glpower';
import { ComponentEvents } from '../../Component';

export class EventSystem extends GLP.System {

	private size: GLP.Vector;

	constructor( ecs: GLP.ECS ) {

		super( ecs, {
			"": [ 'events' ]
		} );

		this.size = new GLP.Vector();

	}

	protected updateImpl( logicName: string, entity: number, event: GLP.SystemUpdateEvent ): void {

		const events = event.ecs.getComponent<ComponentEvents>( event.world, entity, 'events' );

		if ( events ) {

			if ( ! events.inited ) {

				this.resize( event.world, this.size );

				events.inited = true;

			}

			if ( events.onUpdate ) events.onUpdate( event );

		}

	}

	public resize( world: GLP.World, size: GLP.Vector ) {

		this.size.copy( size );

		const entities = this.ecs.getEntities( world, [ 'events' ] );

		entities.forEach( entity => {

			const events = this.ecs.getComponent<ComponentEvents>( world, entity, 'events' );

			if ( events && events.onResize ) {

				events.onResize( { size } );

			}

		} );

	}

}
