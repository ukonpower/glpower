#version 300 es
precision highp float;

layout ( location = 0 ) in float value;

out float o_value;

void main( void ) {

	o_value = value * 2.0;

}