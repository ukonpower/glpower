precision highp float;

uniform sampler2D uTexture;

varying vec2 vUv;

void main( void ) {

	vec4 color = texture2D( uTexture, vUv ) + 0.1;
	gl_FragColor = color;

}