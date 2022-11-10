import * as GLP from 'glpower';

export class MoveSystem extends GLP.System {

	constructor() {

		super( {
			move: [ 'position' ]
		} );

	}

	protected updateImpl() {

	}

}
