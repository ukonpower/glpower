import { ECS, ECSUpdateEvent } from "..";

export type ECSGroup = string[]

export interface SystemUpdateEvent extends ECSUpdateEvent {
	ecs: ECS
}

export class System {

	protected groupList: {name: string, group: ECSGroup}[];

	constructor( groupList: {[key: string]:ECSGroup} ) {

		this.groupList = [];

		const keys = Object.keys( groupList );

		for ( let i = 0; i < keys.length; i ++ ) {

			const name = keys[ i ];

			this.groupList.push( { name, group: groupList[ name ] } );

		}

	}

	public update( event: SystemUpdateEvent ): void {

		for ( let i = 0; i < this.groupList.length; i ++ ) {

			const g = this.groupList[ i ];

			const entities = event.ecs.getEntities( event.world, g.group );

		}

	}

	public updateImpl( name: string, event: SystemUpdateEvent ) { // eslint-disable-line
	}

}
