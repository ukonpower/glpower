#version 300 es

precision highp float;

layout ( location = 0 ) in vec3 position;
layout ( location = 1 ) in vec2 uv;
layout ( location = 2 ) in vec3 normal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 normalMatrix;

out vec2 vUv;
out vec3 vColor;
out vec3 vNormal;
out vec3 vPos;

void main( void ) {

	vec3 pos = position;

	vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
	gl_Position = projectionMatrix * mvPosition;


	vUv = uv;
	vColor = vec3( uv, 1.0 );
	vNormal = normalize( mat3( normalMatrix ) * normal ) * 0.5 + 0.5;
	vPos = -mvPosition.xyz;
	
}