import { ECS, ECSUpdateEvent } from "..";
import { ComponentName } from "../Component";
import { Entity } from "../Entity";

export type EntityQuery = ComponentName[]

export interface SystemUpdateEvent extends ECSUpdateEvent {
	ecs: ECS
}

export class System {

	protected queries: {name: string, query: EntityQuery}[];

	constructor( queries: {[key: string]:EntityQuery} ) {

		this.queries = [];

		const keys = Object.keys( queries );

		for ( let i = 0; i < keys.length; i ++ ) {

			const name = keys[ i ];

			this.queries.push( { name, query: queries[ name ] } );

		}

	}

	public update( event: SystemUpdateEvent ): void {

		for ( let i = 0; i < this.queries.length; i ++ ) {

			const q = this.queries[ i ];

			const entities = event.ecs.getEntities( event.world, q.query );

			for ( let j = 0; j < entities.length; j ++ ) {

				this.updateImpl( q.name, entities[ j ], {
					...event
				} );

			}

		}

	}

	protected updateImpl( logicName: string, entity: Entity, event: SystemUpdateEvent ) { // eslint-disable-line
	}

}
