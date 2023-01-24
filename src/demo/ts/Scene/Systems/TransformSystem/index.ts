import * as GLP from 'glpower';
import { SceneGraph } from 'glpower';
import { ComponentSceneNode, ComponentTransformMatrix } from '../../Component';

export class TransformSystem extends GLP.System {

	private sceneGraph: SceneGraph;

	constructor( ecs: GLP.ECS, sceneGraph: SceneGraph ) {

		super( ecs, {
			'': [
				'position',
				"scale",
				"matrix",
			]
		} );

		this.sceneGraph = sceneGraph;

	}

	public update( event: GLP.SystemUpdateEvent ): void {

		const entities = this.sceneGraph.getTransformUpdateOrder();

		for ( let i = 0; i < entities.length; i ++ ) {

			const entity = entities[ i ];

			this.updateImpl( '_', entity, event );

		}

	}

	protected updateImpl( logicName: string, entity: number, event: GLP.SystemUpdateEvent ): void {

		const sceneNode = event.ecs.getComponent<ComponentSceneNode>( event.world, entity, 'sceneNode' );
		const matrix = event.ecs.getComponent<ComponentTransformMatrix>( event.world, entity, 'matrix' );
		const position = event.ecs.getComponent<GLP.ComponentVector3>( event.world, entity, 'position' );
		const quaternion = event.ecs.getComponent<GLP.ComponentVector4>( event.world, entity, 'quaternion' );
		const scale = event.ecs.getComponent<GLP.ComponentVector3>( event.world, entity, 'scale' );

		if ( ! position || ! scale || ! matrix || ! quaternion ) return;

		// calc self matrix

		matrix.local.setFromTransform( position, quaternion, scale );
		matrix.world.copy( matrix.local );

		// parent

		if ( sceneNode && sceneNode.parent !== undefined ) {

			const parentMatrix = event.ecs.getComponent<ComponentTransformMatrix>( event.world, sceneNode.parent, 'matrix' );

			if ( parentMatrix ) {

				matrix.world.preMultiply( parentMatrix.world );

			}

		}

	}

}
