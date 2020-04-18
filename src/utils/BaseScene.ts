import { Cursor } from '../utils/Cursor';
import { GlobalProperties, ResizeArgs } from './Controller';
import { Renderer } from '../renderers/Renderer';
import { Scene } from '../objects/Scene';
import { Camera } from '../renderers/Camera';
import { Empty } from '../objects/Empty';

export class BaseScene {

	public gProps: GlobalProperties;

	public name: string

	public gl: WebGLRenderingContext;
	public renderer: Renderer;
	public scene: Scene;
	public camera: Camera;

	public time: number = 0;

	constructor() {

		this.name = "";

		this.scene = new Scene();
		this.camera = new Camera( 50, 0.1, 1000, window.innerWidth / window.innerHeight );

	}

	public tick( deltaTime: number ) {

		this.time += deltaTime;
		this.animate( deltaTime );

	}

	public animate( deltaTime: number ) { }

	public onBind( gProps: GlobalProperties ) {

		this.gProps = gProps;

		this.renderer = gProps.renderer;
		this.gl = this.renderer.gl;

	}

	public onResize( args: ResizeArgs ) {

		this.camera.aspect = args.aspectRatio;

	}

	public onTouchStart( cursor: Cursor, event: MouseEvent ) { }

	public onTouchMove( cursor: Cursor, event: MouseEvent ) { }

	public onTouchEnd( cursor: Cursor, event: MouseEvent ) { }

	public onHover( cursor: Cursor ) { }

	public onWheel( event: WheelEvent ) { }

}
