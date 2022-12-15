import * as GLP from 'glpower';

import { RenderSystem } from './Systems/RenderSystem';
import { TransformSystem } from './Systems/TransformSystem';

import { BLidgeSystem } from './Systems/BLidgeSystem';
import EventEmitter from 'wolfy87-eventemitter';
import { CameraSystem } from './Systems/CameraSystem';
import { UpdateSystem } from './Systems/UpdateSystem';

export class Scene extends EventEmitter {

	private power: GLP.Power;

	private ecs: GLP.ECS;
	private world: GLP.World;

	private blidgeSystem: BLidgeSystem;
	private renderSystem:RenderSystem;
	private cameraSystem:CameraSystem;

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

		this.cameraSystem = new CameraSystem( this.ecs );
		this.renderSystem = new RenderSystem( this.ecs, this.power );
		this.blidgeSystem = new BLidgeSystem( this.ecs, this.power, this.world );

		// adddd
		this.ecs.addSystem( this.world, 'blidge', this.blidgeSystem );
		this.ecs.addSystem( this.world, 'transform', new TransformSystem( this.ecs, this.blidgeSystem.sceneGraph ) );
		this.ecs.addSystem( this.world, 'camera', this.cameraSystem );
		this.ecs.addSystem( this.world, 'update', new UpdateSystem( this.ecs ) );
		this.ecs.addSystem( this.world, 'render', this.renderSystem );

		/*-------------------------------
			Events
		-------------------------------*/

		// resize

		this.onResize();

		const onResize = this.onResize.bind( this );
		window.addEventListener( 'resize', onResize );

		// dispose

		this.addOnceListener( "dispose", () => {

			window.removeEventListener( 'resize', onResize );

		} );

	}

	public update() {

		this.ecs.update( this.world );

	}

	public onResize() {

		const size = new GLP.Vector2( window.innerWidth, window.innerHeight );
		this.cameraSystem.resize( this.world, size );

	}

	public dispose() {

	}

}
