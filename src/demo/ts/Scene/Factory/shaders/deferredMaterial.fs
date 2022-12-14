#version 300 es
precision highp float;

uniform vec3 uColor;

in vec2 vUv;
in vec3 vColor;
in vec3 vNormal;
in vec3 vPos;

layout (location = 0) out vec4 outColor0; // normal, depth
layout (location = 1) out vec4 outColor1; // albedo, roughness 
layout (location = 2) out vec4 outColor2; // position, metalic

void main( void ) {

	float depth = 0.0;
	float roughness = 1.0;
	float metalic = 0.0;

	outColor0 = vec4( vNormal, 1.0 );
	outColor1 = vec4( vColor, 1.0 );
	outColor2 = vec4( vPos, 1.0 );

}