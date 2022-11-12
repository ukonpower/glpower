import * as GLP from 'glpower';
import { MoveSystem } from './Systems/MoveSystem';
import { RenderSystem } from './Systems/RenderSystem';
import { TransformSystem } from './Systems/TransformSystem';

import basicVert from './shaders/basic.vs';
import basicFrag from './shaders/basic.fs';

export class Scene {

	private core: GLP.Core;

	private ecs: GLP.ECS;
	private world: GLP.World;

	constructor( core: GLP.Core ) {

		this.core = core;

		this.ecs = new GLP.ECS();

		this.world = this.ecs.createWorld();

		/*-------------------------------
			Entities
		-------------------------------*/

		// cube

		const cubeGeometry = new GLP.PlaneGeometry();

		const cube = this.ecs.createEntity( this.world );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, cube, 'position', { x: 0, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, cube, 'rotation', { x: 0, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, cube, 'scale', { x: 1, y: 1, z: 1 } );
		this.ecs.addComponent<GLP.ComponentsTransformMatrix>( this.world, cube, 'matrix', { local: [], world: [] } );

		this.ecs.addComponent<GLP.ComponentMaterial>( this.world, cube, 'material', { vertexShader: basicVert, fragmentShader: basicFrag } );
		this.ecs.addComponent<GLP.ComponentGeometry>( this.world, cube, 'geometry', {
			attributes: [
				{ name: 'position', ...cubeGeometry.getAttributeBuffer( this.core, 'position', Float32Array ) },
				{ name: 'uv', ...cubeGeometry.getAttributeBuffer( this.core, 'uv', Float32Array ) },
				{ name: 'normal', ...cubeGeometry.getAttributeBuffer( this.core, 'normal', Float32Array ) },
			],
			index: cubeGeometry.getAttributeBuffer( this.core, 'index', Uint16Array, 'ibo' )
		} );

		// sphere

		const sphereGeometry = new GLP.PlaneGeometry();

		const sphere = this.ecs.createEntity( this.world );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, sphere, 'position', { x: 1, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, sphere, 'rotation', { x: 0, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, sphere, 'scale', { x: 1, y: 1, z: 1 } );
		this.ecs.addComponent<GLP.ComponentMaterial>( this.world, sphere, 'material', { vertexShader: basicVert, fragmentShader: basicFrag } );
		this.ecs.addComponent<GLP.ComponentsTransformMatrix>( this.world, sphere, 'matrix', { local: [], world: [] } );

		this.ecs.addComponent<GLP.ComponentMaterial>( this.world, sphere, 'material', { vertexShader: basicVert, fragmentShader: basicFrag } );
		this.ecs.addComponent<GLP.ComponentGeometry>( this.world, sphere, 'geometry', {
			attributes: [
				{ name: 'position', ...sphereGeometry.getAttributeBuffer( this.core, 'position', Float32Array ) },
				{ name: 'uv', ...sphereGeometry.getAttributeBuffer( this.core, 'uv', Float32Array ) },
				{ name: 'normal', ...sphereGeometry.getAttributeBuffer( this.core, 'normal', Float32Array ) },
			],
			index: sphereGeometry.getAttributeBuffer( this.core, 'index', Uint16Array, 'ibo' )
		} );

		// plane

		const planeGeometry = new GLP.PlaneGeometry();

		const plane = this.ecs.createEntity( this.world );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, plane, 'position', { x: 1, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, plane, 'rotation', { x: 0, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, plane, 'scale', { x: 1, y: 1, z: 1 } );
		this.ecs.addComponent<GLP.ComponentMaterial>( this.world, plane, 'material', { vertexShader: basicVert, fragmentShader: basicFrag } );
		this.ecs.addComponent<GLP.ComponentsTransformMatrix>( this.world, plane, 'matrix', { local: [], world: [] } );

		this.ecs.addComponent<GLP.ComponentMaterial>( this.world, plane, 'material', { vertexShader: basicVert, fragmentShader: basicFrag } );
		this.ecs.addComponent<GLP.ComponentGeometry>( this.world, plane, 'geometry', {
			attributes: [
				{ name: 'position', ...planeGeometry.getAttributeBuffer( this.core, 'position', Float32Array ) },
				{ name: 'uv', ...planeGeometry.getAttributeBuffer( this.core, 'uv', Float32Array ) },
				{ name: 'normal', ...planeGeometry.getAttributeBuffer( this.core, 'normal', Float32Array ) },
			],
			index: planeGeometry.getAttributeBuffer( this.core, 'index', Uint16Array, 'ibo' )
		} );

		// camera

		const camera = this.ecs.createEntity( this.world );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, camera, 'position', { x: 0, y: 0, z: 5 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, camera, 'rotation', { x: 0, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, camera, 'scale', { x: 1, y: 1, z: 1 } );
		this.ecs.addComponent<GLP.ComponentsTransformMatrix>( this.world, camera, 'matrix', { local: [], world: [] } );
		this.ecs.addComponent<GLP.ComponentPerspectiveCamera>( this.world, camera, 'perspectiveCamera', {
			near: 0.01,
			far: 0.01,
			fov: 50,
			aspectRatio: window.innerWidth / window.innerHeight,
		} );

		/*-------------------------------
			Scene
		-------------------------------*/

		this.ecs.addComponent<GLP.ComponentSceneNode>( this.world, cube, 'sceneNode', { children: [ sphere ] } );
		this.ecs.addComponent<GLP.ComponentSceneNode>( this.world, sphere, 'sceneNode', { parent: cube, children: [ plane ] } );
		this.ecs.addComponent<GLP.ComponentSceneNode>( this.world, plane, 'sceneNode', { parent: sphere, children: [] } );

		/*-------------------------------
			System
		-------------------------------*/

		this.ecs.addSystem( this.world, 'move', new MoveSystem() );
		this.ecs.addSystem( this.world, 'transform', new TransformSystem() );
		this.ecs.addSystem( this.world, 'render', new RenderSystem( this.core, camera ) );

	}

	public update() {

		this.ecs.update( this.world );

	}

}
