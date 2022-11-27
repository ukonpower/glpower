import * as GLP from 'glpower';
import { Factory } from '../../Factory';

export class BLidgeSystem extends GLP.System {

	public power: GLP.Power;
	public ecs: GLP.ECS;
	public world: GLP.World;
	public factory: Factory;
	public sceneGraph: GLP.SceneGraph;
	public blidge: GLP.BLidge;

	public onCreateCamera?: ( entity: GLP.Entity ) => void;

	private root: GLP.Entity;
	private objects: Map<string, GLP.Entity>;

	constructor( power: GLP.Power, ecs: GLP.ECS, world: GLP.World ) {

		super( {
			move: [ 'position', 'rotation', 'scale' ]
		} );

		this.power = power;
		this.ecs = ecs;
		this.world = world;

		this.factory = new Factory( this.power, this.ecs, this.world );

		this.root = this.factory.empty( {} );

		// scenegraph

		this.sceneGraph = new GLP.SceneGraph( this.ecs, this.world );

		// objects

		this.objects = new Map();

		// blidge

		this.blidge = new GLP.BLidge( 'ws://localhost:3100' );

		this.blidge.addListener( 'sync/scene', this.onSyncScene.bind( this ) );

	}

	protected updateImpl( logicName: string, entity: number, event: GLP.SystemUpdateEvent ): void {
	}

	private onSyncScene( blidge: GLP.BLidge ) {

		// create entity

		blidge.objects.forEach( obj => {

			let entity = this.objects.get( obj.name );

			const isCamera = obj.name.indexOf( 'Camera' ) > - 1;

			if ( entity === undefined ) {

				entity = isCamera ?
					this.factory.perspectiveCamera( {} ) :
					this.factory.cube( {} );

				this.objects.set( obj.name, entity );

				if ( isCamera ) {

					if ( this.onCreateCamera ) this.onCreateCamera( entity );

				}

			}

			const position = this.ecs.getComponent<GLP.ComponentVector3>( this.world, entity, 'position' );

			if ( position ) {

				position.x = obj.position.x;
				position.y = obj.position.y;
				position.z = obj.position.z;

			}

			const rotation = this.ecs.getComponent<GLP.ComponentVector3>( this.world, entity, 'rotation' );

			if ( rotation ) {

				rotation.x = obj.rotation.x;
				rotation.y = obj.rotation.y;
				rotation.z = obj.rotation.z;

				if ( isCamera ) {

					rotation.x -= Math.PI / 2;

				}

			}

			const quaternion = this.ecs.getComponent<GLP.ComponentVector4>( this.world, entity, 'quaternion' );

			if ( quaternion ) {

				const rot = {
					x: obj.rotation.x,
					y: obj.rotation.y,
					z: obj.rotation.z,
				};

				if ( isCamera ) {

					rot.x -= Math.PI / 2;

				}

				const q = new GLP.Quaternion().euler( rot, 'YZX' );

				quaternion.x = q.x;
				quaternion.y = q.y;
				quaternion.z = q.z;
				quaternion.w = q.w;

			}

			const scale = this.ecs.getComponent<GLP.ComponentVector3>( this.world, entity, 'scale' );

			if ( scale ) {

				scale.x = obj.scale.x;
				scale.y = obj.scale.y;
				scale.z = obj.scale.z;

			}

		} );

		// scene graph

		blidge.objects.forEach( obj => {

			const entity = this.objects.get( obj.name );
			const parentEntity = this.objects.get( obj.parent );

			if ( entity === undefined ) return;

			this.sceneGraph.add( parentEntity ?? this.root, entity );

		} );

	}


}
