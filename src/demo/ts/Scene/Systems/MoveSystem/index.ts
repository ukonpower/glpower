import * as GLP from 'glpower';

export class MoveSystem extends GLP.System {

	constructor() {

		super( {
			move: [ 'position' ]
		} );

	}

	protected updateImpl( logicName: string, entity: number, event: GLP.SystemUpdateEvent ): void {

		const pos = event.ecs.getComponent( event.world, entity, 'position' );

		if ( pos ) {

			pos.x = Math.sin( event.time + entity * 0.2 );

		}

	}

}
