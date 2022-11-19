import * as GLP from 'glpower';
import { MoveSystem } from './Systems/MoveSystem';
import { RenderSystem } from './Systems/RenderSystem';
import { TransformSystem } from './Systems/TransformSystem';

import { Factory } from './Factory';
import { SceneGraph } from 'glpower';

import basicVert from './shaders/basic.vs';
import basicFrag from './shaders/basic.fs';

export class Scene {

	private core: GLP.Core;

	private ecs: GLP.ECS;
	private world: GLP.World;
	private factory: Factory;
	private sceneGraph: SceneGraph;

	constructor( core: GLP.Core ) {

		// glp

		this.core = core;

		// esc

		this.ecs = new GLP.ECS();
		this.world = this.ecs.createWorld();
		this.factory = new Factory( this.ecs, this.world );

		/*-------------------------------
			Entities
		-------------------------------*/

		// scene

		const scene = this.factory.empty( {} );

		// cube

		const cube = this.factory.mesh( {
			position: new GLP.Vector3( 0.0, 0.0, 0.0 ),
			material: { vertexShader: basicVert, fragmentShader: basicFrag },
			geometry: new GLP.CubeGeometry().getComponent( this.core )
		} );

		// sphere

		const sphere = this.factory.mesh( {
			position: new GLP.Vector3( 1.0, 0.0, 0.0 ),
			material: { vertexShader: basicVert, fragmentShader: basicFrag },
			geometry: new GLP.SphereGeometry().getComponent( this.core )
		} );

		// plane

		const plane = this.factory.mesh( {
			position: new GLP.Vector3( 1.0, 0.0, 0.0 ),
			material: { vertexShader: basicVert, fragmentShader: basicFrag },
			geometry: new GLP.PlaneGeometry().getComponent( this.core )
		} );

		// camera

		const camera = this.factory.perspectiveCamera( {
			position: new GLP.Vector3( 0.0, 0.0, 5.0 ),
		} );

		/*-------------------------------
			Scene
		-------------------------------*/

		this.sceneGraph = new SceneGraph( this.ecs, this.world );
		this.sceneGraph.add( scene, cube );
		this.sceneGraph.add( cube, sphere );
		this.sceneGraph.add( sphere, plane );

		this.sceneGraph.add( scene, camera );

		/*-------------------------------
			System
		-------------------------------*/

		this.ecs.addSystem( this.world, 'move', new MoveSystem() );
		this.ecs.addSystem( this.world, 'transform', new TransformSystem( this.sceneGraph ) );
		this.ecs.addSystem( this.world, 'render', new RenderSystem( this.core, camera ) );

	}

	public update() {

		this.sceneGraph.getTransformUpdateOrder();

		this.ecs.update( this.world );

	}

}
