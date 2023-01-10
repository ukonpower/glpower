#version 300 es
precision highp float;

uniform vec3 uColor;

in vec2 vUv;
in vec3 vColor;
in vec3 vNormal;
in vec3 vPos;
in vec2 vHighPrecisionZW;

layout (location = 0) out vec4 outColor0; // position, depth
layout (location = 1) out vec4 outColor1; // normal 
layout (location = 2) out vec4 outColor2; // albedo, roughness
layout (location = 3) out vec4 outColor3; // emission, metalic

void main( void ) {

	#ifdef IS_DEPTH
	
		float fragCoordZ = 0.5 * vHighPrecisionZW.x / vHighPrecisionZW.y + 0.5;
		outColor0 = vec4( 1.0 );
		return;
		
	#endif

	float depth = 0.0;
	float roughness = 0.2;
	float metalic = 0.0;

	vec3 color = vColor;

	outColor0 = vec4( vPos, 1.0 );
	outColor1 = vec4( normalize( vNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), 1.0 );
	outColor2 = vec4( color, roughness);
	outColor3 = vec4( vec3( 0.0 ), metalic );

}