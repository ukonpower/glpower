import * as GLP from 'glpower';

interface EmptyProps {
	position?: GLP.ComponentVector3;
	rotation?: GLP.ComponentVector3;
	scale?: GLP.ComponentVector3;
}

interface MeshProps extends EmptyProps{
	material: GLP.ComponentMaterial
	geometry: GLP.ComponentGeometry
}

interface CameraProps extends EmptyProps {
	perspectiveCamera?: GLP.ComponentPerspectiveCamera
}

export class Factory {

	private ecs: GLP.ECS;
	private world: GLP.World;

	constructor( ecs: GLP.ECS, world: GLP.World ) {

		this.ecs = ecs;
		this.world = world;

	}

	public empty( props: EmptyProps ) {

		const entity = this.ecs.createEntity( this.world );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, entity, 'position', props.position ?? { x: 0, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, entity, 'rotation', props.rotation ?? { x: 0, y: 0, z: 0 } );
		this.ecs.addComponent<GLP.ComponentVector3>( this.world, entity, 'scale', props.scale ?? { x: 1, y: 1, z: 1 } );
		this.ecs.addComponent<GLP.ComponentsTransformMatrix>( this.world, entity, 'matrix', { local: [], world: [] } );
		this.ecs.addComponent<GLP.ComponentSceneNode>( this.world, entity, 'sceneNode', { children: [] } );

		return entity;

	}

	public mesh( props: MeshProps ) {

		const entity = this.empty( props );

		this.ecs.addComponent<GLP.ComponentMaterial>( this.world, entity, 'material', props.material );
		this.ecs.addComponent<GLP.ComponentGeometry>( this.world, entity, 'geometry', props.geometry );

		return entity;

	}

	public perspectiveCamera( props: CameraProps ) {

		const entity = this.empty( props );

		this.ecs.addComponent<GLP.ComponentPerspectiveCamera>( this.world, entity, 'perspectiveCamera', props.perspectiveCamera ?? {
			near: 0.01,
			far: 1000,
			fov: 50,
			aspectRatio: window.innerWidth / window.innerHeight,
		} );

		return entity;

	}

}
