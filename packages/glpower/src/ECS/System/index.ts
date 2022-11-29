import EventEmitter from "wolfy87-eventemitter";
import { ECS, ECSUpdateEvent } from "..";
import { ComponentName } from "../Component";
import { Entity } from "../Entity";

export type EntityQuery = ComponentName[]

export interface SystemUpdateEvent extends ECSUpdateEvent {
	ecs: ECS
}

export class System extends EventEmitter {

	protected queries: {name: string, query: EntityQuery}[];

	constructor( queries: {[key: string]:EntityQuery} ) {

		super();

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

			this.beforeUpdateImpl( q.name, event );

			for ( let j = 0; j < entities.length; j ++ ) {

				this.updateImpl( q.name, entities[ j ], event );

			}

			this.afterUpdateImpl( q.name, event );

		}

	}

	protected beforeUpdateImpl( logicName: string, event: SystemUpdateEvent ) { // eslint-disable-line
	}

	protected updateImpl( logicName: string, entity: Entity, event: SystemUpdateEvent ) { // eslint-disable-line
	}

	protected afterUpdateImpl( logicName: string, event: SystemUpdateEvent ) { // eslint-disable-line
	}

	public dispose() {

		this.emitEvent( 'dispose' );

	}

}
