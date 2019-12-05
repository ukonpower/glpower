precision highp float;

uniform sampler2D texPos;
uniform sampler2D texVel;

varying vec2 vUv;

void main( void ){

	gl_FragColor = texture2D( texPos, vUv ) + 0.5;
	
}