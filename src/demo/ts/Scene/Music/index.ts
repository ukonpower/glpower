import * as GLP from 'glpower';

import musicVert from './shaders/music.vs';
import musicFrag from './shaders/music.fs';

const BUFFER_LENGTH = 4096;
const MUSIC_DURATION = 30;

export class Music {

	private power: GLP.Power;
	private gl: WebGL2RenderingContext;

	private audioCtx: AudioContext;
	private audioBuffer: AudioBuffer;
	private mainNode: AudioBufferSourceNode;

	constructor( power: GLP.Power ) {

		this.power = power;
		this.gl = this.power.gl;

		/*-------------------------------
			Audio
		-------------------------------*/

		this.audioCtx = new AudioContext();

		const bufferLength = this.audioCtx.sampleRate * MUSIC_DURATION;

		// buffer

		this.audioBuffer = this.audioCtx.createBuffer( 2, bufferLength, this.audioCtx.sampleRate );

		const bufferIn = this.power.createBuffer();
		bufferIn.setData( new Float32Array( new Array( bufferLength ).fill( 0 ).map( ( _, i ) => i ) ), 'vbo' );

		const bufferL = this.power.createBuffer();
		bufferL.setData( new Float32Array( bufferLength ), 'vbo', this.gl.DYNAMIC_COPY );

		const bufferR = this.power.createBuffer();
		bufferR.setData( new Float32Array( bufferLength ), 'vbo', this.gl.DYNAMIC_COPY );

		// render

		const program = this.power.createProgram();

		const tf = new GLP.GLPowerTransformFeedback( this.gl );

		tf.setBuffer( "left", bufferL, 0 );
		tf.setBuffer( "right", bufferR, 1 );

		tf.bind( () => {

			program.setShader( musicVert, musicFrag, { transformFeedbackVaryings: [ 'o_left', 'o_right' ] } );

		} );

		program.setUniform( 'uDuration', '1f', [ MUSIC_DURATION ] );
		program.setUniform( 'uSampleRate', '1f', [ this.audioCtx.sampleRate ] );

		const vao = program.getVAO();

		if ( vao ) {

			vao.setAttribute( 'offsetTime', bufferIn, 1 );

			program.use( () => {

				program.uploadUniforms();

				tf.use( () => {

					this.gl.beginTransformFeedback( this.gl.POINTS );
					this.gl.enable( this.gl.RASTERIZER_DISCARD );

					vao.use( () => {

						this.gl.drawArrays( this.gl.POINTS, 0, vao.vertCount );

					} );

					this.gl.disable( this.gl.RASTERIZER_DISCARD );
					this.gl.endTransformFeedback();

				} );

				this.gl.bindBuffer( this.gl.ARRAY_BUFFER, bufferL.buffer );
				this.gl.getBufferSubData( this.gl.ARRAY_BUFFER, 0, this.audioBuffer.getChannelData( 0 ) );

				this.gl.bindBuffer( this.gl.ARRAY_BUFFER, bufferR.buffer );
				this.gl.getBufferSubData( this.gl.ARRAY_BUFFER, 0, this.audioBuffer.getChannelData( 1 ) );

			} );

		}

		this.mainNode = this.audioCtx.createBufferSource();
		this.mainNode.connect( this.audioCtx.destination );
		this.mainNode.buffer = this.audioBuffer;
		this.mainNode.loop = false;

		// btn

		const btn = document.createElement( 'button' );
		btn.innerHTML = 'click';
		btn.style.position = 'absolute';
		btn.style.left = '0';
		btn.style.top = '0';
		document.body.appendChild( btn );

		btn.addEventListener( 'click', () => {

			this.play();

		} );

	}

	public play() {

		this.mainNode.start();

	}

	public seek( time: number ) {

		this.mainNode.stop();

		this.mainNode.start( time );

	}

}
