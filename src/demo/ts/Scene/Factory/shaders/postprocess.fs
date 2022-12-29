#version 300 es
precision highp float;

uniform sampler2D sampler0;
uniform sampler2D sampler1;

uniform vec3 uColor;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

vec2 getMipmapUV( vec2 uv, float level ) {

	vec2 ruv = uv;

	float scale = 1.0 / pow( 2.0, level + 1.0 );

	ruv *= scale;
	ruv.y += scale;

	if( level > 0.0 ) {

		ruv.x += 1.0 - ( scale * 2.0 );

	}

	return ruv;

}

void main( void ) {

	vec4 col1 = texture( sampler0, vUv );
	vec4 col2 = texture( sampler1, vUv );

	vec3 col = col1.xyz;

	for( int i = 0; i < 7; i ++ ) {

		col += texture( sampler1, getMipmapUV( vUv, float( i ) ) ).xyz;
		
	}

	outColor = vec4( col, 1.0 );

}