import { ECS } from '../ECS';
import { ComponentSceneNode } from '../ECS/Component';
import { Entity } from '../ECS/Entity';
import { World } from '../ECS/World';

export class SceneGraph {

	private ecs: ECS;
	private world: World;

	private entities: Entity[];

	private cacheTransformUpdateOrder: Entity[] | null;
	private cacheRenderOrder: Entity[] | null;

	constructor( ecs: ECS, world: World ) {

		this.ecs = ecs;
		this.world = world;

		this.entities = [];

		this.cacheTransformUpdateOrder = null;
		this.cacheRenderOrder = null;

	}

	public add( parent: Entity, child: Entity ) {

		const parentNode = this.ecs.getComponent<ComponentSceneNode>( this.world, parent, 'sceneNode' );

		if ( parentNode === null ) {

			console.log( 'parent not exists.' );

			return;

		}

		const childNode = this.ecs.getComponent<ComponentSceneNode>( this.world, child, 'sceneNode' );

		if ( childNode === null ) {

			console.log( 'children not exists.' );

			return;

		}

		if ( childNode.parent !== undefined ) {

			this.remove( childNode.parent, child );

		}

		parentNode.children.push( child );
		childNode.parent = parent;

		this.entities = Array.from( new Set( [ parent, child, ...this.entities ] ) );

		this.cacheTransformUpdateOrder = null;

	}

	public remove( parent: Entity, child: Entity ) {

		const parentNode = this.ecs.getComponent<ComponentSceneNode>( this.world, parent, 'sceneNode' );

		if ( parentNode === null ) {

			console.log( 'parent not exists.' );

			return;

		}

		const childNode = this.ecs.getComponent<ComponentSceneNode>( this.world, child, 'sceneNode' );

		if ( childNode === null ) {

			console.log( 'children not exists.' );

			return;

		}

		// remove from parent

		let i = parentNode.children.findIndex( entity => entity == child );

		if ( i > - 1 ) {

			parentNode.children.splice( i, 1 );

		}

		childNode.parent = undefined;

		// remove from entity array

		i = this.entities.findIndex( entity => entity === child );

		if ( i > - 1 ) {

			this.entities.splice( i, 1 );

		}

		this.cacheTransformUpdateOrder = null;

	}

	public getTransformUpdateOrder() {

		if ( this.cacheTransformUpdateOrder ) return this.cacheTransformUpdateOrder;

		const updateOrder: Entity[] = [];

		const _ = ( entity: Entity ) => {

			updateOrder.push( entity );

			const sceneNode = this.ecs.getComponent<ComponentSceneNode>( this.world, entity, 'sceneNode' );

			if ( sceneNode ) {

				for ( let i = 0; i < sceneNode.children.length; i ++ ) {

					_( sceneNode.children[ i ] );

				}

			}

		};

		for ( let i = 0; i < this.entities.length; i ++ ) {

			const entity = this.entities[ i ];

			const sceneNode = this.ecs.getComponent<ComponentSceneNode>( this.world, entity, 'sceneNode' );

			if ( sceneNode && sceneNode.parent === undefined ) {

				_( entity );

			}


		}

		this.cacheTransformUpdateOrder = updateOrder;

		return updateOrder;

	}


}
