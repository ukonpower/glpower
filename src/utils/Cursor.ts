import { Vec2 } from "../math/Vec2";

export class Cursor {

	public onTouchStart: Function;
	public onTouchMove: Function;
	public onTouchEnd: Function;
	public onHover: Function;
	public onWheel: Function;
	public attenuation: number = 0.9;

	protected isSP: boolean;

	protected _touchDown: boolean;

	protected _position: Vec2;
	protected _delta: Vec2;

	public get position(): Vec2 {

		return this._position.clone();

	}

	public get delta(): Vec2 {

		return this._delta.clone();

	}

	constructor() {

		this._position = new Vec2( NaN, NaN );
		this._delta = new Vec2( NaN, NaN );

		let userAgent = navigator.userAgent;

		if (
			userAgent.indexOf( 'iPhone' ) >= 0 || userAgent.indexOf( 'iPad' ) >= 0 || userAgent.indexOf( 'Android' ) >= 0 || navigator.platform == "iPad" || ( navigator.platform == "MacIntel" && navigator.userAgent.indexOf( "Safari" ) != - 1 && navigator.userAgent.indexOf( "Chrome" ) == - 1 && ( navigator as any ).standalone !== undefined )
		) {

			window.addEventListener(
				"touchstart",
				this._MouseEvent.bind( this, "start" )
			);

			window.addEventListener(
				"touchmove",
				this._MouseEvent.bind( this, "move" ),
				{ passive: false }
			);
			window.addEventListener( "touchend", this._MouseEvent.bind( this, "end" ) );

		} else {

			window.addEventListener(
				"mousedown",
				this._MouseEvent.bind( this, "start" )
			);
			window.addEventListener( "mousemove", this._MouseEvent.bind( this, "move" ) );
			window.addEventListener( "mouseup", this._MouseEvent.bind( this, "end" ) );
			window.addEventListener( "dragend", this._MouseEvent.bind( this, "end" ) );
			window.addEventListener( "wheel", this.wheel.bind( this ), {
				passive: false
			} );

		}

		this._position.set( NaN, NaN );

		this._touchDown = false;

	}

	public getNormalizePosition( windowSize: Vec2 ) {

		if ( this._position.x != this._position.x ) return new Vec2( NaN, NaN );

		let p = this._position.clone()
			.divide( windowSize )
			.multiply( 2.0 )
			.sub( 1.0 );
		p.y *= - 1;

		return p;

	}

	public getRelativePosition( elm: HTMLElement, normalize?: boolean ) {

		let rect: DOMRect = elm.getClientRects()[ 0 ] as DOMRect;

		let pos: Vec2;

		let x = pos.x - rect.left;
		let y = pos.y - rect.top;

		if ( normalize ) {

			x /= rect.width;
			y /= rect.height;

		}

		let p = new Vec2( x, y );

		return p;

	}

	protected setPos( x: number, y: number ) {

		if (
			this._position.x !== this._position.x ||
			this._position.y !== this._position.y
		) {

			this._delta.set( 0, 0 );

		} else {

			this._delta.set( x - this._position.x, y - this._position.y );

		}

		this._position.set( x, y );

	}

	protected _MouseEvent( type: string, event: MouseEvent | TouchEvent ) {

		let x: number;
		let y: number;

		if ( "touches" in event ) {

			if ( event.touches.length > 0 ) {

				x = event.touches[ 0 ].clientX;
				y = event.touches[ 0 ].clientY;

			}

		} else {

			if ( event.button == 0 ) {

				x = event.pageX - window.pageXOffset;
				y = event.pageY - window.pageYOffset;

			}

		}

		if ( type == "start" ) {

			this._touchDown = true;

			this.setPos( x, y );

			if ( this.onTouchStart ) {

				this.onTouchStart( event );

			}

		} else if ( type == "move" ) {

			this.setPos( x, y );

			if ( this._touchDown ) {

				if ( this.onTouchMove ) {

					this.onTouchMove( event );

				}

			}

		} else if ( type == "end" ) {

			this._touchDown = false;

			if ( this.onTouchEnd ) {

				this.onTouchEnd( event );

			}

		}

	}

	protected wheel( e: MouseWheelEvent ) {

		if ( this.onWheel ) {

			this.onWheel( e );

		}

	}

	public update() {

		this._delta.multiply( this.attenuation );

		if ( this.onHover && ! this.isSP ) {

			this.onHover();

		}

	}

}
