import * as GLP from 'glpower';
import { MoveSystem } from './Systems/MoveSystem';
import { RenderSystem } from './Systems/RenderSystem';
import { TransformSystem } from './Systems/TransformSystem';

export class Scene {

	private ecs: GLP.ECS;
	private world: GLP.World;

	constructor() {

		this.ecs = new GLP.ECS();

		this.world = this.ecs.createWorld();

		// entities

		const obj1 = this.ecs.createEntity( this.world );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, obj1, 'position', { x: 0, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, obj1, 'rotation', { x: 0, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, obj1, 'scale', { x: 1, y: 1, z: 1 } );
		this.ecs.addComponent<GLP.ComponentMatrix>( this.world, obj1, 'matrix', { local: [], world: [] } );

		const obj2 = this.ecs.createEntity( this.world );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, obj2, 'position', { x: 1, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, obj2, 'rotation', { x: 0, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, obj2, 'scale', { x: 1, y: 1, z: 1 } );
		this.ecs.addComponent<GLP.ComponentMatrix>( this.world, obj2, 'matrix', { local: [], world: [] } );

		const obj3 = this.ecs.createEntity( this.world );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, obj3, 'position', { x: 1, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, obj3, 'rotation', { x: 0, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, obj3, 'scale', { x: 1, y: 1, z: 1 } );
		this.ecs.addComponent<GLP.ComponentMatrix>( this.world, obj3, 'matrix', { local: [], world: [] } );

		// scene

		this.ecs.addComponent<GLP.ComponentSceneNode>( this.world, obj1, 'sceneNode', { children: [ obj2 ] } );
		this.ecs.addComponent<GLP.ComponentSceneNode>( this.world, obj2, 'sceneNode', { parent: obj1, children: [ obj3 ] } );
		this.ecs.addComponent<GLP.ComponentSceneNode>( this.world, obj3, 'sceneNode', { parent: obj2, children: [] } );

		// system

		this.ecs.addSystem( this.world, 'move', new MoveSystem() );
		this.ecs.addSystem( this.world, 'transform', new TransformSystem() );
		this.ecs.addSystem( this.world, 'render', new RenderSystem() );

	}

	public update() {

		this.ecs.update( this.world );

	}

}
