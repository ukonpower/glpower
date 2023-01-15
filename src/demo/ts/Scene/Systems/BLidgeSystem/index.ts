import * as GLP from 'glpower';
import { Factory } from '../../Factory';

export class BLidgeSystem extends GLP.System {

	public power: GLP.Power;
	public ecs: GLP.ECS;
	public world: GLP.World;
	public factory: Factory;
	public sceneGraph: GLP.SceneGraph;
	public blidge: GLP.BLidge;

	private root: GLP.Entity;
	private camera: GLP.Entity;
	private objects: Map<string, GLP.Entity>;

	// tmp
	private tmpQuaternion: GLP.Quaternion;

	constructor( ecs: GLP.ECS, power: GLP.Power, world: GLP.World, camera: GLP.Entity, sceneGraph: GLP.SceneGraph, factory: Factory ) {

		super( ecs, {
			move: [ 'blidge', 'position', 'quaternion', 'scale' ]
		} );

		this.power = power;
		this.ecs = ecs;
		this.world = world;
		this.sceneGraph = sceneGraph;
		this.factory = factory;

		// objects

		this.root = this.factory.empty();
		this.camera = camera;
		this.objects = new Map();

		// blidge

		this.blidge = new GLP.BLidge( 'ws://localhost:3100' );

		this.blidge.addListener( 'sync/scene', this.onSyncScene.bind( this ) );

		// tmp

		this.tmpQuaternion = new GLP.Quaternion();

	}

	protected updateImpl( logicName: string, entity: number, event: GLP.SystemUpdateEvent ): void {

		const blidgeComponent = this.ecs.getComponent<GLP.ComponentBLidge>( event.world, entity, 'blidge' );
		const positionComponent = this.ecs.getComponent<GLP.ComponentVector3>( event.world, entity, 'position' )!;
		const scaleComponent = this.ecs.getComponent<GLP.ComponentVector3>( event.world, entity, 'scale' )!;
		const rotationComponent = this.ecs.getComponent<GLP.ComponentVector4>( event.world, entity, 'quaternion' )!;

		if ( blidgeComponent ) {

			if ( blidgeComponent.curveGroups ) {

				if ( blidgeComponent.curveGroups.position ) {

					const position = blidgeComponent.curveGroups.position.setFrame( this.blidge.frame.current ).value;

					positionComponent.x = position.x;
					positionComponent.y = position.y;
					positionComponent.z = position.z;

				}

				if ( blidgeComponent.curveGroups.rotation ) {

					const rot = blidgeComponent.curveGroups.rotation.setFrame( this.blidge.frame.current ).value;

					let rotXOffset = 0;

					if ( blidgeComponent.type == 'camera' ) rotXOffset = - Math.PI / 2;

					this.tmpQuaternion.euler( {
						x: rot.x + rotXOffset,
						y: rot.y,
						z: rot.z
					}, 'YZX' );

					rotationComponent.x = this.tmpQuaternion.x;
					rotationComponent.y = this.tmpQuaternion.y;
					rotationComponent.z = this.tmpQuaternion.z;
					rotationComponent.w = this.tmpQuaternion.w;

				}

				if ( blidgeComponent.curveGroups.scale ) {

					const scale = blidgeComponent.curveGroups.scale.setFrame( this.blidge.frame.current ).value;

					scaleComponent.x = scale.x;
					scaleComponent.y = scale.y;
					scaleComponent.z = scale.z;

				}

				if ( blidgeComponent.curveGroups.uniforms ) {

					for ( let i = 0; i < blidgeComponent.curveGroups.uniforms.length; i ++ ) {

						const uni = blidgeComponent.curveGroups.uniforms[ i ];

						uni.curve.setFrame( this.blidge.frame.current );

					}

				}

			}


		}

	}

	private onSyncScene( blidge: GLP.BLidge ) {

		// blidge.getActionNameList

		const timeStamp = new Date().getTime();

		// create entity

		blidge.objects.forEach( obj => {

			const type = obj.type;
			let entity = this.objects.get( obj.name );

			if ( entity === undefined ) {

				if ( type == 'camera' ) {

					entity = this.camera;

					const componentCamera = this.ecs.getComponent<GLP.ComponentCameraPerspective>( this.world, entity, 'perspective' );

					if ( componentCamera && obj.param ) {

						componentCamera.fov = ( obj.param as GLP.BLidgeCameraParam ).fov;

					}

					entity = this.factory.appendBlidge( entity, { name: obj.name, type: "camera" } );

				} else {

					entity = this.factory.empty();
					entity = this.factory.appendBlidge( entity, { name: obj.name, type: "empty" } );

				}

				this.objects.set( obj.name, entity );

			}

			const blidgeComponent = this.ecs.getComponent<GLP.ComponentBLidge>( this.world, entity, 'blidge' );

			if ( blidgeComponent ) {

				blidgeComponent.updateTime = timeStamp;

				// actions

				blidgeComponent.curveGroups = {};

				blidgeComponent.curveGroups.position = this.blidge.curveGroups.find( curveGroup => curveGroup.name == obj.animation.position );
				blidgeComponent.curveGroups.rotation = this.blidge.curveGroups.find( curveGroup => curveGroup.name == obj.animation.rotation );
				blidgeComponent.curveGroups.scale = this.blidge.curveGroups.find( curveGroup => curveGroup.name == obj.animation.scale );

				blidgeComponent.curveGroups.uniforms = [];

				// material

				const keys = Object.keys( obj.material.uniforms );

				for ( let i = 0; i < keys.length; i ++ ) {

					const name = keys[ i ];
					const accessor = obj.material.uniforms[ name ];
					const curve = this.blidge.curveGroups.find( curve => curve.name == accessor );

					if ( curve ) {

						blidgeComponent.curveGroups.uniforms.push( {
							name: name,
							curve: curve
						} );

					}

				}

				// mesh

				blidgeComponent.type = type;

				// entity type

				this.ecs.removeComponent( this.world, entity, 'geometry' );
				this.ecs.removeComponent( this.world, entity, 'material' );
				this.ecs.removeComponent( this.world, entity, 'directionalLight' );
				this.ecs.removeComponent( this.world, entity, 'spotLight' );
				this.ecs.removeComponent( this.world, entity, 'mesh' );

				const uniforms:GLP.Uniforms = {};

				blidgeComponent.curveGroups.uniforms.forEach( item => {

					uniforms[ item.name ] = {
						type: '4fv',
						value: item.curve.value
					};

				} );

				if ( type == 'cube' ) {

					this.factory.appendCube( entity, { name: obj.material.name, uniforms } );

				} else if ( type == 'sphere' ) {

					this.factory.appendSphere( entity, { name: obj.material.name, uniforms } );

				} else if ( type == 'plane' ) {

					this.factory.appendPlane( entity, { name: obj.material.name, uniforms } );

				} else if ( type == 'mesh' ) {

					if ( obj.param ) {

						const param = obj.param as GLP.BLidgeMeshParam;

						const geometry = new GLP.Geometry();
						geometry.setAttribute( 'position', param.position, 3 );
						geometry.setAttribute( 'normal', param.normal, 3 );
						geometry.setAttribute( 'uv', param.uv, 2 );
						geometry.setAttribute( 'index', param.index, 1 );

						this.factory.appendMesh(
							entity,
							geometry.getComponent( this.power ),
							{ name: obj.material.name, uniforms }
						);

					}

				} else if ( type == 'light' ) {

					console.log( obj.param );


					if ( obj.param ) {

						const param = obj.param as GLP.BLidgeLightParam;

						if ( param.type == 'directional' ) {

							this.factory.appendDirectionalLight( entity, param );

						} else if ( param.type == 'spot' ) {

							this.factory.appendSpotLight( entity, param );

						}

					}

				}

			}

			// transform

			const position = this.ecs.getComponent<GLP.ComponentVector3>( this.world, entity, 'position' );

			if ( position ) {

				position.x = obj.position.x;
				position.y = obj.position.y;
				position.z = obj.position.z;

			}

			const quaternion = this.ecs.getComponent<GLP.ComponentVector4>( this.world, entity, 'quaternion' );

			if ( quaternion ) {

				let rotXOffset = 0;

				if ( obj.type == 'camera' ) rotXOffset = - Math.PI / 2;

				const rot = {
					x: obj.rotation.x + rotXOffset,
					y: obj.rotation.y,
					z: obj.rotation.z,
				};


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

		// remove

		this.ecs.getEntities( this.world, [ 'blidge' ] ).forEach( entity => {

			const blidgeComponent = this.ecs.getComponent<GLP.ComponentBLidge>( this.world, entity, 'blidge' );

			if ( blidgeComponent && blidgeComponent.updateTime !== timeStamp ) {

				this.objects.delete( blidgeComponent.name );

				this.ecs.removeEntity( this.world, entity );

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
