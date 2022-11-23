precision highp float;

uniform vec3 uColor;

varying vec2 vUv;
varying vec3 vColor;

void main( void ) {

	gl_FragColor = vec4( vColor, 1.0 );

}