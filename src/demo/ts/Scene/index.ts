import * as GLP from 'glpower';

import { RenderSystem } from './Systems/RenderSystem';
import { TransformSystem } from './Systems/TransformSystem';

import { BLidgeSystem } from './Systems/BLidgeSystem';
import { MoveSystem } from './Systems/MoveSystem';

export class Scene {

	private power: GLP.Power;

	private ecs: GLP.ECS;
	private world: GLP.World;

	constructor( power: GLP.Power ) {

		// glp

		this.power = power;

		/*-------------------------------
			ECS
		-------------------------------*/

		this.ecs = new GLP.ECS();
		this.world = this.ecs.createWorld();

		/*-------------------------------
			System
		-------------------------------*/

		// blidgeSystem

		const blidgeSystem = new BLidgeSystem( this.power, this.ecs, this.world );

		blidgeSystem.onCreateCamera = ( camera ) => {

			renderSystem.setCamera( camera );

		};

		// renderSystem

		const renderSystem = new RenderSystem( this.power );

		// adddd
		// this.ecs.addSystem( this.world, 'move', new MoveSystem() );0

		this.ecs.addSystem( this.world, 'blidge', blidgeSystem );
		this.ecs.addSystem( this.world, 'transform', new TransformSystem( blidgeSystem.sceneGraph ) );
		this.ecs.addSystem( this.world, 'render', renderSystem );

	}

	public update() {

		this.ecs.update( this.world );

	}

}
