#version 300 es
precision highp float;

uniform sampler2D sampler0;

uniform vec3 uColor;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec4 col1 = texture( sampler0, vUv );

	outColor = vec4( col1.xyz, 1.0 );

}