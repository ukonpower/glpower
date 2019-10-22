precision highp float;

attribute vec3 position;
attribute vec3 color;
attribute vec3 normal;
attribute vec2 uv;

uniform float time;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec3 vColor;

void main( void ){
	
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
	gl_PointSize = 5.0;

	vColor = vec3( uv, 1.0 ) + color;

}