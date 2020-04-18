import { Cursor } from '../utils/Cursor';
import { BaseScene } from './BaseScene';

import { Lethargy } from 'lethargy';
import toPx from 'to-px';
import { Vec2 } from '../math/Vec2';
import { Renderer, RendererParam } from '../renderers/Renderer';

export declare interface ControllerParam extends RendererParam{
    retina?: boolean;
    silent?: boolean;
}

export declare interface ResizeArgs{
	aspectRatio: number,
	windowSize: Vec2,
	rendererSize: Vec2
}

export declare interface GlobalProperties{
    renderer: Renderer;
    cursor: Cursor;
    resizeArgs: ResizeArgs;
}

export class Controller {

    public currentScene: BaseScene;

    public renderer: Renderer;
	public cursor: Cursor;
	protected timeMem: number;

    public gProps: GlobalProperties;

    constructor( parameter: ControllerParam ) {

    	this.renderer = new Renderer( parameter );
    	this.renderer.setSize( window.innerWidth, window.innerHeight );

    	this.cursor = new Cursor();
    	this.cursor.onTouchStart = this.onTouchStart.bind( this );
    	this.cursor.onTouchMove = this.onTouchMove.bind( this );
    	this.cursor.onTouchEnd = this.onTouchEnd.bind( this );
    	this.cursor.onHover = this.onHover.bind( this );
    	this.cursor.onWheel = this.onWheel.bind( this );

    	this.timeMem = Date.now();

    	this.gProps = {
    		renderer: this.renderer,
    		cursor: this.cursor,
    		resizeArgs: null
    	};

    	window.addEventListener( 'orientationchange', this.onOrientationDevice.bind( this ) );
    	window.addEventListener( 'resize', this.onWindowResize.bind( this ) );

    	this.onWindowResize();

    	this.tick();

    }

    protected tick() {

    	let t = Date.now();
    	let deltaTime = ( t - this.timeMem ) / 1000;
    	this.timeMem = t;

    	this.cursor.update();

    	if ( this.currentScene ) {

    		this.currentScene.tick( deltaTime );

    	}

    	requestAnimationFrame( this.tick.bind( this ) );

    }

    public bindScene( scene: BaseScene ) {

    	this.currentScene = scene;

    	this.currentScene.onBind( this.gProps );

    	this.onWindowResize();

    }

    protected onWindowResize() {

    	let windowSize = new Vec2( window.innerWidth, window.innerHeight );

    	this.renderer.setSize( windowSize.x, windowSize.y );

    	let resizeArgs: ResizeArgs = {
    		aspectRatio: windowSize.x / windowSize.y,
    		windowSize: windowSize.clone(),
    		rendererSize: this.renderer.getSize()
    	};

    	this.gProps.resizeArgs = resizeArgs;

    	if ( this.currentScene ) {

    		this.currentScene.onResize( resizeArgs );

    	}

    }


    public onOrientationDevice() {

    	this.onWindowResize();

    }

    public onTouchStart( e: MouseEvent ) {

    	if ( this.currentScene ) {

    		this.currentScene.onTouchStart( this.cursor, e );

    	}

    }

    public onTouchMove( e: MouseEvent ) {

    	if ( this.currentScene ) {

    		this.currentScene.onTouchMove( this.cursor, e );

    	}

    }

    public onTouchEnd( e: MouseEvent ) {

    	if ( this.currentScene ) {

    		this.currentScene.onTouchEnd( this.cursor, e );

    	}

    }

    public onHover( ) {

    	if ( this.currentScene ) {

    		this.currentScene.onHover( this.cursor );

    	}

    }

    protected trackpadMemDelta = 0;
	protected trackpadMax: boolean = false;
	protected lethargy = new Lethargy( 7, 0, 0.05 );

	public onWheel( e: WheelEvent ) {

		let delta = e.deltaY;
		let trackpadDelta = 0;

		switch ( e.deltaMode ) {

			case e.DOM_DELTA_LINE:
				delta *= toPx( 'ex', window ) * 2.5;
				break;

			case e.DOM_DELTA_PAGE:
				delta *= window.innerHeight;
				break;

		}

		if ( this.lethargy.check( e ) ) {

			trackpadDelta = delta;

		} else {

			let d = delta - this.trackpadMemDelta;

			if ( Math.abs( d ) > 50 ) {

				this.trackpadMemDelta = d;
				trackpadDelta = delta;

				this.trackpadMax = true;

			} else if ( d == 0 ) {

				if ( this.trackpadMax ) {

					trackpadDelta = delta;

				}

			} else if ( d < 0 ) {

				this.trackpadMax = false;

			}

			this.trackpadMemDelta = ( delta );

		}

		if ( this.currentScene ) {

			this.currentScene.onWheel( e, trackpadDelta );

		}

	}

}
