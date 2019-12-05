precision highp float;

uniform sampler2D texPos;
uniform sampler2D texVel;

varying vec2 vUv;


uniform vec2 resolution;

void main( void ){

	gl_FragColor = texture2D( texPos, vUv ) + 0.01;
	
}