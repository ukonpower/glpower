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

	}

}
