import { BuiltinComponents, Component, Component, ComponentName } from "./Component";
import { Entity } from "./Entity";
import { EntityQuery, System } from "./System";
import { World } from "./World";

export interface ECSUpdateEvent {
	world: World,
	time: number,
	deltaTime: number,
}

export class ECS {

	// time
	private time: number;
	private lastUpdateTime: number;

	constructor() {

		this.time = 0;
		this.lastUpdateTime = new Date().getTime();

	}

	public createWorld(): World {

		return {
			entitiesTotalCount: 0,
			entities: [],
			components: new Map(),
			systems: new Map()
		};

	}

	// entity

	public createEntity( world: World ): Entity {

		const entity: Entity = world.entitiesTotalCount ++;

		world.entities.push( entity );

		return entity;

	}

	public removeEntity( world: World, entity: Entity ): void {

		const index = world.entities.findIndex( e => e == entity );

		if ( index > - 1 ) {

			world.entities.slice( index, 1 );

		}

	}

	// component

	public addComponent<T extends Component >( world: World, entity: Entity, componentName: ComponentName, component: T ) {

		let componentArray = world.components.get( componentName );

		if ( componentArray === undefined ) {

			componentArray = [];

			world.components.set( componentName, componentArray );

		}

		if ( componentArray.length < entity + 1 ) {

			componentArray.length = entity + 1;

		}

		componentArray[ entity ] = component;

	}

	public removeComponent( world: World, entity: Entity, componentName: ComponentName ) {

		const componentArray = world.components.get( componentName );

		if ( componentArray && componentArray.length > entity ) {

			componentArray[ entity ] = null;

		}

	}

	public getComponent<T extends Component >( world: World, entity: Entity, componentName: ComponentName ): T | null {

		const component = world.components.get( componentName );

		if ( component !== undefined ) {

			return ( component[ entity ] || null ) as T;

		}

		return null;

	}

	// system

	public addSystem<T extends System >( world: World, systemName: string, system: T ) {

		world.systems.set( systemName, system );

	}

	public removeSystem( world: World, componentName: ComponentName ) {

		world.systems.delete( componentName );

	}

	// update

	public update( world: World ) {

		const now = new Date().getTime();
		const deltaTime = ( now - this.lastUpdateTime ) / 1000;
		this.time += deltaTime;

		const systemList = world.systems;

		systemList.forEach( system => {

			system.update( {
				world,
				deltaTime,
				time: this.time,
				ecs: this,
			} );

		} );

	}

	// entities

	public getEntities( world: World, query: EntityQuery ): Entity[] {

		const entities = world.entities.filter( entt => {

			for ( let i = 0; i < query.length; i ++ ) {

				const componentName = query[ i ];

				const component = world.components.get( componentName );

				if ( component === undefined || component[ entt ] === undefined ) {

					return false;

				}

			}

			return true;

		} );

		return entities;

	}

}
