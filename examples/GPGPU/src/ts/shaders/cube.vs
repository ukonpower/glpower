precision highp float;

attribute vec3 position;
attribute vec3 offsetPos;
attribute vec3 color;
attribute vec3 normal;
attribute vec2 uv;
attribute float n;

uniform float time;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec3 vColor;

mat2 rotate(float rad) {
  return mat2(cos(rad), sin(rad), -sin(rad), cos(rad));
}

void main( void ){

	vec3 pos = position;
	
	pos *= smoothstep( 0.0, 0.9, sin( sin( length( offsetPos ) * 2.0 + time * 0.05 ) ) ) * sin( n * 10.0) * 2.0;
	
	pos.xz *= rotate(  sin( length( offsetPos.xz ) * 3.0 + time * 0.02 ) * 4.0 );
	pos.yz *= rotate(  sin( length( offsetPos.zy ) * 3.0 + time * 0.02 ) * 4.0 );
	pos.xy *= rotate(  sin( length( offsetPos ) * 3.0 + time * 0.02 ) * 4.0 );
	
	vec4 mvPosition = modelViewMatrix * vec4( pos + offsetPos, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
	gl_PointSize = 5.0;

	vColor = vec3( uv, 1.0 ) + color;

}