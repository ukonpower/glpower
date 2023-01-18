#version 300 es
precision highp float;

uniform sampler2D sampler0;
uniform vec2 uResolution;
uniform vec2 uResolutionInv;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

// source: https://developer.download.nvidia.com/assets/gamedev/files/sdk/11/FXAA_WhitePaper.pdf

#define FXAA_EDGE_THRESHOLD 0.125
#define FXAA_EDGE_THRESHOLD_MIN 0.0625
#define FXAA_SUBPIX 1
#define FXAA_SUBPIX_TRIM 1.0 / 3.0
#define FXAA_SUBPIX_CAP 3.0 / 4.0
#define FXAA_SUBPIX_TRIM_SCALE 1.0
#define FXAA_SEARCH_STEPS 8
#define FXAA_SEARCH_ACCELERATION 1
#define FXAA_SEARCH_THRESHOLD 1.0 / 4.0

float luma(vec3 rgb) {

	return rgb.y * ( 0.587 / 0.299 ) + rgb.x; 

}


vec4 offsetTexture( sampler2D tex, vec2 uv, vec2 offsetPixel, vec2 resolutionInv ) {

	return texture( tex, uv + offsetPixel * resolutionInv );

}

void main( void ) {

	vec4 col1 = texture( sampler0, vUv );
	vec3 col = col1.xyz;

	vec3 rgbN = offsetTexture( sampler0, vUv.xy, vec2(  0.0, -1.0 ), uResolutionInv ).xyz;
	vec3 rgbW = offsetTexture( sampler0, vUv.xy, vec2( -1.0,  0.0 ), uResolutionInv ).xyz;
	vec3 rgbM = offsetTexture( sampler0, vUv.xy, vec2(  0.0,  0.0 ), uResolutionInv ).xyz;
	vec3 rgbE = offsetTexture( sampler0, vUv.xy, vec2(  1.0,  0.0 ), uResolutionInv ).xyz;
	vec3 rgbS = offsetTexture( sampler0, vUv.xy, vec2(  0.0,  1.0 ), uResolutionInv ).xyz;

	float lumaN = luma( rgbN );
	float lumaW = luma( rgbW );
	float lumaM = luma( rgbM );
	float lumaE = luma( rgbE );
	float lumaS = luma( rgbS );
	
	float rangeMin = min( lumaM, min( min( lumaN, lumaW ), min( lumaS, lumaE ) ) );
	float rangeMax = max( lumaM, max( max( lumaN, lumaW ), max( lumaS, lumaE ) ) );
	float range = rangeMax - rangeMin;

	if( range < max( FXAA_EDGE_THRESHOLD_MIN, rangeMax * FXAA_EDGE_THRESHOLD ) ) {

		float lumaL = ( lumaN + lumaW + lumaE + lumaS ) * 0.25;
		float rangeL = abs( lumaL - lumaM );
		float blendL = max(0.0, ( rangeL / range ) - FXAA_SUBPIX_TRIM ) * FXAA_SUBPIX_TRIM_SCALE;
		blendL = min( FXAA_SUBPIX_CAP, blendL );

		float lumaNW = luma( offsetTexture( sampler0, vUv.xy, vec2(  -1.0, -1.0 ), uResolutionInv ).xyz );
		float lumaNE = luma( offsetTexture( sampler0, vUv.xy, vec2(  1.0, -1.0 ), uResolutionInv ).xyz );
		float lumaSW = luma( offsetTexture( sampler0, vUv.xy, vec2(  -1.0, 1.0 ), uResolutionInv ).xyz );
		float lumaSE = luma( offsetTexture( sampler0, vUv.xy, vec2(  1.0, 1.0 ), uResolutionInv ).xyz );

		float edgeVert =
			abs((0.25 * lumaNW) + (-0.5 * lumaN) + (0.25 * lumaNE)) +
			abs((0.50 * lumaW ) + (-1.0 * lumaM) + (0.50 * lumaE )) +
			abs((0.25 * lumaSW) + (-0.5 * lumaS) + (0.25 * lumaSE));

		float edgeHorz =
			abs((0.25 * lumaNW) + (-0.5 * lumaW) + (0.25 * lumaSW)) +
			abs((0.50 * lumaN ) + (-1.0 * lumaM) + (0.50 * lumaS )) +
			abs((0.25 * lumaNE) + (-0.5 * lumaE) + (0.25 * lumaSE));

		bool horzSpan = edgeHorz >= edgeVert;

		bool doneN = false;
		bool doneP = false;
		
		vec2 offNP;
		offNP.x = (!horzSpan) ? 0.0 : uResolutionInv.x;
		offNP.y = ( horzSpan) ? 0.0 : uResolutionInv.y;

		vec2 posN; //DEBUG
		vec2 posP; //DEBUG
		float lumaEndN = 0.0; //DEBUG
		float lumaEndP = 0.0; //DEBUG
		float gradientN = 0.0; //DEBUG

		for(int i = 0; i < FXAA_SEARCH_STEPS; i++) {
			
			#if FXAA_SEARCH_ACCELERATION == 1
				if(!doneN) lumaEndN = luma(texture( sampler0, posN.xy).xyz);
				if(!doneP) lumaEndP = luma(texture( sampler0, posP.xy).xyz);
			#else
				if(!doneN) lumaEndN = luma( FxaaTextureGrad(tex, posN.xy, offNP).xyz );
				if(!doneP) lumaEndP = luma( FxaaTextureGrad(tex, posP.xy, offNP).xyz );
			#endif
			
			doneN = doneN || (abs(lumaEndN - lumaN) >= gradientN);
			doneP = doneP || (abs(lumaEndP - lumaN) >= gradientN);
			
			if(doneN && doneP) break;
			if(!doneN) posN -= offNP;
			if(!doneP) posP += offNP;
		}


	}

	outColor = vec4( col, 1.0 );

}