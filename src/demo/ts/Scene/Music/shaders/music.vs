#version 300 es
precision highp float;

// layout ( location = 0 ) in float value;

in float offsetTime;

out float o_left;
out float o_right;

uniform float uDuration;
uniform float uSampleRate;

void main( void ) {

	float t = offsetTime / uSampleRate;

	float s = sin( t * 1000.0 ) * 0.5 + 0.5;

	o_left = s;
	o_right = 1.0;

}