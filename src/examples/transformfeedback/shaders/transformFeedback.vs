#version 300 es
precision highp float;

layout ( location = 0 ) in float value;

void main( void ) {

	o_value = value + 1.0;

}