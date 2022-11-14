import * as GLP from 'glpower';

export class MoveSystem extends GLP.System {

	constructor() {

		super( {
			move: [ 'position', 'rotation' ]
		} );

	}

	protected updateImpl( logicName: string, entity: number, event: GLP.SystemUpdateEvent ): void {

		const pos = event.ecs.getComponent( event.world, entity, 'position' );
		const rot = event.ecs.getComponent( event.world, entity, 'rotation' );

		if ( pos && rot ) {

			if ( entity != 3 ) { // カメラを一旦避ける

				rot.z += 0.01;
				rot.y += 0.01;

			}

		}

	}

}
