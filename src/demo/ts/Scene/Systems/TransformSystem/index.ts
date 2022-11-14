import * as GLP from 'glpower';

export class TransformSystem extends GLP.System {

	private matrix1: GLP.Matrix4;
	private matrix2: GLP.Matrix4;

	constructor() {

		super( {
			'': [
				'position',
				"scale",
				"sceneNode",
				"matrix",
			]
		} );

		this.matrix1 = new GLP.Matrix4();
		this.matrix2 = new GLP.Matrix4();

	}

	protected updateImpl( logicName: string, entity: number, event: GLP.SystemUpdateEvent ): void {

		const sceneNode = event.ecs.getComponent<GLP.ComponentSceneNode>( event.world, entity, 'sceneNode' );

		const matrix = event.ecs.getComponent<GLP.ComponentsTransformMatrix>( event.world, entity, 'matrix' );

		const position = event.ecs.getComponent<GLP.ComponentVector3>( event.world, entity, 'position' );
		const rotation = event.ecs.getComponent<GLP.ComponentVector3>( event.world, entity, 'rotation' );
		const scale = event.ecs.getComponent<GLP.ComponentVector3>( event.world, entity, 'scale' );

		if ( ! sceneNode || ! position || ! rotation || ! scale || ! matrix ) return;

		// calc self matrix

		this.matrix1.setFromTransform( position, rotation, scale );
		this.matrix1.copyToArray( matrix.local );

		// parent

		const parent = sceneNode.parent;

		if ( parent !== undefined ) {

			const parentMatrix = event.ecs.getComponent<GLP.ComponentsTransformMatrix>( event.world, parent, 'matrix' );

			if ( parentMatrix ) {

				this.matrix2.set( parentMatrix.world );

				this.matrix1.preMultiply( this.matrix2 );

			}

		}

		this.matrix1.copyToArray( matrix.world );

	}

}
