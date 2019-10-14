precision highp float;

attribute vec3 position;
attribute vec3 color;

uniform float time;

varying vec3 vColor;

void main( void ){
	
	gl_Position = vec4( position, 3.0 );

	vColor = color;

}