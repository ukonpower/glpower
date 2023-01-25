import * as GLP from 'glpower';
import EventEmitter from 'wolfy87-eventemitter';

import { RenderSystem } from './Systems/RenderSystem';
import { TransformSystem } from './Systems/TransformSystem';
import { BLidgeSystem } from './Systems/BLidgeSystem';
import { CameraSystem } from './Systems/CameraSystem';
import { EventSystem } from './Systems/EventSystem';
import { Factory } from './Factory';
import { SceneGraph } from './SceneGraph';

export class Scene extends EventEmitter {

	private gl: WebGL2RenderingContext;
	private power: GLP.Power;
	private ecs: GLP.ECS;
	private world: GLP.World;

	private sceneGraph: SceneGraph;
	private factory: Factory;

	constructor( power: GLP.Power ) {

		super();

		// glp

		this.power = power;
		this.gl = this.power.gl;

		/*-------------------------------
			ECS
		-------------------------------*/

		this.ecs = new GLP.ECS();
		this.world = this.ecs.createWorld();

		/*-------------------------------
			Scene
		-------------------------------*/

		this.sceneGraph = new SceneGraph( this.ecs, this.world );
		this.factory = new Factory( this.power, this.ecs, this.world );

		// -------- render target

		// deferred

		const deferredRenderTarget = this.power.createFrameBuffer();

		deferredRenderTarget.setTexture( [
			this.power.createTexture().setting( { type: this.gl.FLOAT, internalFormat: this.gl.RGBA32F, format: this.gl.RGBA } ),
			this.power.createTexture().setting( { type: this.gl.FLOAT, internalFormat: this.gl.RGBA32F, format: this.gl.RGBA } ),
			this.power.createTexture(),
			this.power.createTexture(),
		] );

		const deferredCompositorRenderTarget = this.power.createFrameBuffer();
		deferredCompositorRenderTarget.setTexture( [ this.power.createTexture().setting( { magFilter: this.gl.LINEAR, minFilter: this.gl.LINEAR, generateMipmap: true } ) ] );

		// forward

		const forwardRenderTarget = this.power.createFrameBuffer();
		forwardRenderTarget.setTexture( [ this.power.createTexture() ] );

		// -------- camera

		const camera = this.factory.camera( {}, {
			forwardRenderTarget,
			deferredRenderTarget,
			deferredCompositorRenderTarget
		} );

		this.factory.postprocess( deferredCompositorRenderTarget, deferredRenderTarget.textures, camera, null );

		/*-------------------------------
			System
		-------------------------------*/

		const blidgeSystem = new BLidgeSystem( this.ecs, this.power, this.world, camera, this.sceneGraph, this.factory );
		const transformSystem = new TransformSystem( this.ecs, blidgeSystem.sceneGraph );
		const eventSystem = new EventSystem( this.ecs );
		const cameraSystem = new CameraSystem( this.ecs );
		const renderSystem = new RenderSystem( this.ecs, this.power );

		// adddd

		this.ecs.addSystem( this.world, 'blidge', blidgeSystem );
		this.ecs.addSystem( this.world, 'transform', transformSystem );
		this.ecs.addSystem( this.world, 'camera', cameraSystem );
		this.ecs.addSystem( this.world, 'event', eventSystem );
		this.ecs.addSystem( this.world, 'render', renderSystem );

		/*-------------------------------
			Events
		-------------------------------*/

		// resize

		const onResize = ( size: GLP.Vector, pixelRatio: number ) => {

			const viewSize = size.clone();
			const pixelSize = size.clone().multiply( pixelRatio );

			eventSystem.resize( this.world, pixelSize );
			cameraSystem.resize( this.world, pixelSize );
			renderSystem.resize( viewSize, pixelSize );

		};

		this.addListener( 'resize', onResize );

		// dispose

		this.addOnceListener( "dispose", () => {

			this.removeListener( 'resize', onResize );

		} );

	}

	public resize( size: GLP.Vector, pixelRatio: number ) {

		this.emitEvent( 'resize', [ size, pixelRatio ] );

	}

	public update() {

		this.ecs.update( this.world );

	}

	public dispose() {

		this.emitEvent( 'dispose' );

	}

}
