import * as GLP from 'glpower';

export class RenderSystem extends GLP.System {

	constructor() {

		super( {
			'': [
				'matrix',
			]
		} );

	}

	protected updateImpl( _: string, entity: number, event: GLP.SystemUpdateEvent ): void {

		const matrix = event.ecs.getComponent<GLP.ComponentMatrix>( event.world, entity, 'matrix' );

		if ( matrix ) {

			const mat = new GLP.Matrix4( matrix.world );

			const pos = new GLP.Vector3( );

			mat.decompose( pos );

			// console.log( entity, pos );

		}

	}

}
