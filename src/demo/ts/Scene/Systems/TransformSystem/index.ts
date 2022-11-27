import * as GLP from 'glpower';
import { SceneGraph } from 'glpower';

export class TransformSystem extends GLP.System {

	private sceneGraph: SceneGraph;

	private matrix1: GLP.Matrix4;
	private matrix2: GLP.Matrix4;

	constructor( sceneGraph: SceneGraph ) {

		super( {
			'': [
				'position',
				"scale",
				"matrix",
			]
		} );

		this.sceneGraph = sceneGraph;

		this.matrix1 = new GLP.Matrix4();
		this.matrix2 = new GLP.Matrix4();

	}

	public update( event: GLP.SystemUpdateEvent ): void {

		const entities = this.sceneGraph.getTransformUpdateOrder();

		for ( let i = 0; i < entities.length; i ++ ) {

			const entity = entities[ i ];

			this.updateImpl( '_', entity, event );

		}

	}

	protected updateImpl( logicName: string, entity: number, event: GLP.SystemUpdateEvent ): void {

		const sceneNode = event.ecs.getComponent<GLP.ComponentSceneNode>( event.world, entity, 'sceneNode' );
		const matrix = event.ecs.getComponent<GLP.ComponentsTransformMatrix>( event.world, entity, 'matrix' );
		const position = event.ecs.getComponent<GLP.ComponentVector3>( event.world, entity, 'position' );
		// const rotation = event.ecs.getComponent<GLP.ComponentVector3>( event.world, entity, 'rotation' );
		const quaternion = event.ecs.getComponent<GLP.ComponentVector4>( event.world, entity, 'quaternion' );
		const scale = event.ecs.getComponent<GLP.ComponentVector3>( event.world, entity, 'scale' );

		if ( ! position || ! scale || ! matrix || ! quaternion ) return;

		// calc self matrix

		this.matrix1.setFromTransform( position, quaternion, scale );
		this.matrix1.copyToArray( matrix.local );

		// parent

		if ( sceneNode && sceneNode.parent !== undefined ) {

			const parentMatrix = event.ecs.getComponent<GLP.ComponentsTransformMatrix>( event.world, sceneNode.parent, 'matrix' );

			if ( parentMatrix ) {

				this.matrix2.set( parentMatrix.world );

				this.matrix1.preMultiply( this.matrix2 );

			}

		}

		this.matrix1.copyToArray( matrix.world );

	}

}
