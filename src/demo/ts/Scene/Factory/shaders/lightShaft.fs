#version 300 es
precision highp float;

// light

struct DirectionalLight {
	vec3 direction;
	vec3 color;
};

struct SpotLight {
	vec3 position;
	vec3 direction;
	vec3 color;
	float angle;
	float blend;
	float distance;
	float decay;
};

struct LightCamera {
	float near;
	float far;
	mat4 viewMatrix;
	mat4 projectionMatrix;
	vec2 resolution;
};

struct Light {
	vec3 direction;
	vec3 color;
};

// uniforms

uniform sampler2D sampler0;
uniform vec3 uCameraPosition;

#if NUM_LIGHT_DIR > 0 

	uniform DirectionalLight directionalLight[NUM_LIGHT_DIR];
	uniform LightCamera directionalLightCamera[NUM_LIGHT_DIR];
	uniform sampler2D directionalLightShadowMap[NUM_LIGHT_DIR];
	
#endif

#if NUM_LIGHT_SPOT > 0 

	uniform SpotLight spotLight[NUM_LIGHT_SPOT];
	uniform LightCamera spotLightCamera[NUM_LIGHT_SPOT];
	uniform sampler2D spotLightShadowMap[NUM_LIGHT_SPOT];
	
#endif

// varying

in vec2 vUv;

layout (location = 0) out vec4 outColor;

#define MARCH 64
#define SHADOW_SAMPLE_COUNT 2

vec4 floatToRGBA( float v ) {
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;
	enc = fract(enc);
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);
	return enc;
}

float rgbaToFloat( vec4 rgba ) {
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );
}

float compareShadowDepth( float lightDepth, sampler2D shadowMap, vec2 shadowCoord ) {

	float shadowMapDepth = rgbaToFloat( texture( shadowMap, shadowCoord ) );

	if( shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0 ) {

		return step( lightDepth, shadowMapDepth + 0.010 );

	}

	return 0.0;

}

float getShadow( vec3 pos, LightCamera camera, sampler2D shadowMap ) {

	vec4 mvPosition = camera.viewMatrix * vec4( pos, 1.0 );
	vec4 mvpPosition = camera.projectionMatrix * mvPosition;
	float lightNear = camera.near;
	float lightFar = camera.far;
	vec2 shadowCoord = ( mvpPosition.xy / mvpPosition.w ) * 0.5 + 0.5;

	float lightDepth = ( -mvPosition.z - lightNear ) / ( lightFar - lightNear );

	float shadowSum;

	shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord );

    outColor = vec4( (pos), 1.0 );

	for( int i = 0; i < SHADOW_SAMPLE_COUNT; i++ ) {

		vec2 offset = 1.0 / camera.resolution * ( float( i + 1 ) / float( SHADOW_SAMPLE_COUNT ) ) * 1.0;

		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, -offset.y ) );
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, -offset.y ) );
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, -offset.y ) );
		
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, 0.0 ) );
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, 0.0 ) );

		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, offset.y ) );
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, offset.y ) );
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, offset.y ) );

	}

	return shadowSum / ( 8.0 * float( SHADOW_SAMPLE_COUNT ) + 1.0 );

}

void main( void ) {

    vec3 col;

    #if NUM_LIGHT_SPOT > 0

		SpotLight sLight;
        
        vec4 col1;
        vec3 rayPos;
        vec3 rayDir;
        vec3 diff;
        float distanceToCamera;
        float marchLength;
        float sum;

		#pragma loop_start NUM_LIGHT_SPOT

            rayPos = texture( sampler0, vUv ).xyz;
            diff = uCameraPosition - rayPos;
            distanceToCamera = length( diff );
            rayDir = normalize( diff );
			rayPos = uCameraPosition - rayDir * min(  15.0, distanceToCamera );
            marchLength = distanceToCamera / float( MARCH );
            sum = 0.0;


            for( int i = 0; i < MARCH; i ++ ) {

    			sum += 1.0 * getShadow( rayPos, spotLightCamera[ LOOP_INDEX ], spotLightShadowMap[ LOOP_INDEX ] );
                rayPos += rayDir * marchLength;

            }

		#pragma loop_end
        
        sum /= float( MARCH ) * float( NUM_LIGHT_SPOT );

        col += sum * 1.0;
	
	#endif
    

	outColor = vec4( col, 1.0 );

}