#version 300 es
precision highp float;

// layout ( location = 0 ) in float value;

in float offsetTime;

out float o_left;
out float o_right;

uniform float uDuration;
uniform float uSampleRate;

#define rnd(co) fract(sin(dot(co.xy,vec2(12.9898,78.233))) * 43758.5453)

void main( void ) {

	float time = offsetTime / uSampleRate;

	vec2 o = vec2( 0.0 );
	o += sin( time * 300.0 ) * exp( - fract(time * 0.2) * 5.0 );
	o += rnd( vec2(time) ) * 0.02;

	o_left = o.x;
	o_right = o.y;


}