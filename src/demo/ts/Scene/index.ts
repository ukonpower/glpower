import * as GLP from 'glpower';

import { RenderSystem } from './Systems/RenderSystem';
import { TransformSystem } from './Systems/TransformSystem';

import { BLidgeSystem } from './Systems/BLidgeSystem';
import { MoveSystem } from './Systems/MoveSystem';
import EventEmitter from 'wolfy87-eventemitter';

export class Scene extends EventEmitter {

	private power: GLP.Power;

	private ecs: GLP.ECS;
	private world: GLP.World;

	private renderSystem:RenderSystem;

	constructor( power: GLP.Power ) {

		super();

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

			this.renderSystem.setCamera( camera );

		};

		// renderSystem

		this.renderSystem = new RenderSystem( this.power, this.ecs, this.world );

		// adddd
		this.ecs.addSystem( this.world, 'blidge', blidgeSystem );
		this.ecs.addSystem( this.world, 'transform', new TransformSystem( blidgeSystem.sceneGraph ) );
		this.ecs.addSystem( this.world, 'render', this.renderSystem );

		/*-------------------------------
			Events
		-------------------------------*/

		// resize

		const onResize = this.onResize.bind( this );

		window.addEventListener( 'resize', onResize );

		this.onResize();

		// dispose

		this.addOnceListener( "dispose", () => {

			window.removeEventListener( 'resize', onResize );

		} );

	}

	public update() {

		this.ecs.update( this.world );

	}

	public onResize() {

		this.renderSystem.resize( window.innerWidth, window.innerHeight );

	}

	public dispose() {

	}

}
