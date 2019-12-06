precision highp float;

attribute vec3 position;
attribute vec3 color;
attribute vec3 normal;
attribute vec2 uv;
attribute float n;

uniform float time;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform sampler2D texPos;
uniform sampler2D texVel;

attribute vec2 computeUV;

varying vec3 vColor;

$rotate

void main( void ){

	vec3 pos = position;

	vec3 vel = texture2D( texVel, computeUV ).xyz;
	
	pos *= 0.1 + length( vel * 3.0 );
	
	pos.xy *= rotate( vel.x * 20.0 );
	pos.yz *= rotate( vel.y * 20.0 );
	pos.xz *= rotate( vel.z * 20.0 );

	pos += texture2D( texPos, computeUV ).xyz;
	
	vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
	gl_PointSize = 5.0;
	vColor = vec3( uv, 1.0 ) + color;

}