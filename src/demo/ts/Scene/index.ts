import * as GLP from 'glpower';
import { MoveSystem } from './Systems/MoveSystem';

export class Scene {

	private ecs: GLP.ECS;
	private world: GLP.World;

	constructor() {

		this.ecs = new GLP.ECS();

		this.world = this.ecs.createWorld();

		const obj1 = this.ecs.createEntity( this.world );
		this.ecs.addComponent<GLP.Vector3Raw>( this.world, obj1, 'position', { x: 0, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.Vector3Raw>( this.world, obj1, 'rotation', { x: 0, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.Vector3Raw>( this.world, obj1, 'scale', { x: 1, y: 1, z: 1 } );

		this.ecs.addSystem( this.world, 'move', new MoveSystem() );

	}

	public update() {

		this.ecs.update();

	}

}
