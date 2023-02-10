import { EventEmitter } from '../utils/EventEmitter';
import { IVector2, IVector3 } from "../Math/Vector";
import { FCurve } from "../Animation/FCurve";
import { FCurveGroup } from '../Animation/FCurveGroup';
import { FCurveInterpolation, FCurveKeyFrame } from "../Animation/FCurveKeyFrame";

// object

export type BLidgeObject = {
	name: string,
	parent: string,
	children: BLidgeObject[],
	animation: BLidgeAnimation,
	position: IVector3,
	rotation: IVector3,
	scale: IVector3,
	material: BLidgeMaterialParam
	type: BLidgeObjectType,
	param?: BLidgeCameraParam | BLidgeMeshParam | BLidgeLightParamCommon
}

export type BLidgeObjectType = 'empty' | 'cube' | 'sphere' | 'mesh' | 'camera' | 'plane' | 'light';

export type BLidgeCameraParam = {
	fov: number
}

export type BLidgeMeshParam = {
	position: number[],
	uv: number[],
	normal: number[],
	index: number[],
}

export type BLidgeLightParam = BLidgeDirectionalLightParam | BLidgeSpotLightParam;

type BLidgeLightParamCommon = {
	type: 'directional' | 'spot'
	color: IVector3,
	intensity: number,
	useShadowMap: boolean,
}

export type BLidgeDirectionalLightParam = {
	type: 'directional'
} & BLidgeLightParamCommon

export type BLidgeSpotLightParam = {
	type: 'spot',
	angle: number,
	blend: number,
} & BLidgeLightParamCommon

// material

export type BLidgeMaterialParam = {
	name: string,
	uniforms: BLidgeAnimation
}

// scene

export type BLidgeSceneData = {
    animations: {[key: string]: BLidgeAnimationCurveParam[]};
	scene: BLidgeObject;
	frame: BLidgeSceneFrame;
}

// animation

export type BLidgeAnimation = { [key: string]: string }

export type BLidgeAnimationCurveAxis = 'x' | 'y' | 'z' | 'w'

export type BLidgeAnimationCurveParam = {
    keyframes: BLidgeAnimationCurveKeyFrameParam[];
	axis: BLidgeAnimationCurveAxis
}

export type BLidgeAnimationCurveKeyFrameParam = {
    c: IVector2;
    h_l: IVector2;
    h_r: IVector2;
    e: string;
    i: FCurveInterpolation;
}

// message

export type BLidgeMessage = BLidgeSyncSceneMessage | BLidgeSyncFrameMessage

export type BLidgeSyncSceneMessage = {
	type: "sync/scene",
    data: BLidgeSceneData;
}

export type BLidgeSyncFrameMessage = {
	type: "sync/timeline";
	data: BLidgeSceneFrame;
}

export type BLidgeSceneFrame = {
	start: number;
	end: number;
	current: number;
	fps: number;
	playing: boolean;
}

export class BLidge extends EventEmitter {

	// ws

	private url?: string;
	private ws?: WebSocket;
	public connected: boolean = false;

	// frame

	public frame: BLidgeSceneFrame = {
		start: - 1,
		end: - 1,
		current: - 1,
		fps: - 1,
		playing: false,
	};

	// animation

	public objects: BLidgeObject[] = [];
	public curveGroups: FCurveGroup[] = [];
	public scene: BLidgeObject | null;

	constructor( url?: string ) {

		super();

		this.scene = null;

		if ( url ) {

			this.url = url;
			this.connect( this.url );

		}

	}

	public connect( url: string ) {

		this.url = url;
		this.ws = new WebSocket( this.url );
		this.ws.onopen = this.onOpen.bind( this );
		this.ws.onmessage = this.onMessage.bind( this );
		this.ws.onclose = this.onClose.bind( this );

		this.ws.onerror = ( e ) => {

			console.error( e );

			this.emit( 'error' );

		};

	}

	public loadJsonScene( jsonPath: string ) {

		const req = new XMLHttpRequest();

		req.onreadystatechange = () => {

			if ( req.readyState == 4 ) {

				if ( req.status == 200 ) {

					this.loadScene( JSON.parse( req.response ) );

				}

			}

		};

		req.open( 'GET', jsonPath );
		req.send( );

	}

	/*-------------------------------
		Events
	-------------------------------*/

	public loadScene( data: BLidgeSceneData ) {

		// frame

		this.frame.start = data.frame.start;
		this.frame.end = data.frame.end;
		this.frame.fps = data.frame.fps;

		this.curveGroups.length = 0;
		this.objects.length = 0;

		// actions

		const fcurveGroupNames = Object.keys( data.animations );

		for ( let i = 0; i < fcurveGroupNames.length; i ++ ) {

			const fcurveGroupName = fcurveGroupNames[ i ];
			const fcurveGroup = new FCurveGroup( fcurveGroupName );

			data.animations[ fcurveGroupName ].forEach( fcurveData => {

				const curve = new FCurve();

				curve.set( fcurveData.keyframes.map( frame => {

					return new FCurveKeyFrame( frame.c, frame.h_l, frame.h_r, frame.i );

				} ) );

				fcurveGroup.setFCurve( curve, fcurveData.axis );

			} );

			this.curveGroups.push( fcurveGroup );

		}

		// objects

		this.scene = data.scene;

		this.objects.length = 0;

		const _ = ( obj: BLidgeObject ) => {

			this.objects.push( obj );

			obj.children.forEach( item => _( item ) );

		};

		_( this.scene );

		// dispatch event

		this.emit( 'sync/scene', [ this ] );

	}

	private onSyncTimeline( data: BLidgeSceneFrame ) {

		this.frame = data;

		this.emit( 'sync/timeline', [ this.frame ] );

	}

	/*-------------------------------
		WS Events
	-------------------------------*/

	private onOpen( event: Event ) {

		this.connected = true;

	}

	private onMessage( e: MessageEvent ) {

		const msg = JSON.parse( e.data ) as BLidgeMessage;

		if ( msg.type == 'sync/scene' ) {

			this.loadScene( msg.data );

		} else if ( msg.type == "sync/timeline" ) {

			this.onSyncTimeline( msg.data );

		}

	}

	private onClose( e:CloseEvent ) {

		this.disposeWS();

	}

	/*-------------------------------
		API
	-------------------------------*/

	public getCurveGroup( name: string ) {

		return this.curveGroups.find( curve => curve.name == name );

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose() {

		this.disposeWS();

	}

	public disposeWS() {

		if ( this.ws ) {

			this.ws.close();
			this.ws.onmessage = null;
			this.ws.onclose = null;
			this.ws.onopen = null;

			this.connected = false;

		}

	}

}
