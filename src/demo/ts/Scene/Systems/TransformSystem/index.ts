import * as GLP from 'glpower';

export class TransformSystem extends GLP.System {

	constructor() {

		super( {
			'': [
				'position',
				"scale",
				"sceneNode",
				"matrix",
			]
		} );

	}

	protected updateImpl( logicName: string, entity: number, event: GLP.SystemUpdateEvent ): void {

	}

}
