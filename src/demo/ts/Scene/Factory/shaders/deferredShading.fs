#version 300 es
precision highp float;

// types

struct Geometry {
	vec3 position;
	vec3 normal;
	float depth;
	vec3 viewDir;
	vec3 viewDirWorld;
};

struct Material {
	vec3 albedo;
	float roughness;
	float metalic;
	vec3 diffuseColor;
	vec3 specularColor;
};

struct DirectionalLight {
	vec3 direction;
	vec3 color;
};

struct Light {
	vec3 direction;
	vec3 color;
};

// uniforms

uniform sampler2D sampler0; // position, depth
uniform sampler2D sampler1; // normal 
uniform sampler2D sampler2; // albedo
uniform sampler2D sampler3; // roughness, metalic

uniform vec3 uColor;
uniform vec3 uCameraPosition;
uniform mat4 viewMatrix;

uniform DirectionalLight directionalLight[3];

in vec2 vUv;

layout (location = 0) out vec4 glFragOut;

// requires

#pragma glslify: import('./constants.glsl' )

float ggx( float dNH, float roughness ) {
	
	float a2 = roughness * roughness;
	a2 = a2 * a2;
	float dNH2 = dNH * dNH;

	if( dNH2 <= 0.0 ) return 0.0;

	return a2 / ( PI * pow( dNH2 * ( a2 - 1.0 ) + 1.0, 2.0) );

}

vec3 lambert( vec3 diffuseColor ) {

	return diffuseColor / PI;

}

float gSchlick( float d, float k ) {

	if( d == 0.0 ) return 0.0;

	return d / ( d * ( 1.0 - k ) + k );
	
}

float gSmith( float dNV, float dNL, float roughness ) {

	float k = clamp( roughness * sqrt( 2.0 / PI ), 0.0, 1.0 );

	return gSchlick( dNV, k ) * gSchlick( dNL, k );
	
}

float fresnel( float d ) {
	
	float f0 = 0.04;

	return f0 + ( 1.0 - f0 ) * pow( 1.0 - d, 5.0 );

}

vec3 RE( Geometry geo, Material mat, Light light) {

	vec3 lightDir = normalize( light.direction );
	vec3 halfVec = normalize( geo.viewDir + lightDir );

	float dLH = clamp( dot( lightDir, halfVec ), 0.0, 1.0 );
	float dNH = clamp( dot( geo.normal, halfVec ), 0.0, 1.0 );
	float dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );
	float dNL = clamp( dot( geo.normal, lightDir), 0.0, 1.0 );

	vec3 irradiance = light.color * dNL;

	// diffuse
	vec3 diffuse = lambert( mat.diffuseColor ) * irradiance;

	// specular
	float D = ggx( dNH, mat.roughness );
	float G = gSmith( dNV, dNL, mat.roughness );
	float F = fresnel( dLH );
	
	vec3 specular = (( D * G * F ) / ( 4.0 * dNL * dNV + 0.0001 ) * mat.specularColor ) * irradiance; 

	vec3 c = vec3( 0.0 );
	c += diffuse * ( 1.0 - F ) + specular;

	return c;

}

void main( void ) {

	// iputs
	
	vec4 tex0 = texture( sampler0, vUv );
	vec4 tex1 = texture( sampler1, vUv );
	vec4 tex2 = texture( sampler2, vUv );
	vec4 tex3 = texture( sampler3, vUv );

	// output

	vec3 outColor = vec3( 0.0 );

	// structs

	Geometry geo = Geometry(
		tex0.xyz,
		tex1.xyz,
		0.0,
		normalize( uCameraPosition - tex0.xyz ),
		vec3( 0.0 )
	);
	
	Material mat = Material(
		tex2.xyz,
		tex3.x,
		tex3.y,
		mix( tex2.xyz, vec3( 0.0, 0.0, 0.0 ), tex3.y ),
		mix( vec3( 1.0, 1.0, 1.0 ), tex2.xyz, tex3.y )
	);


	float w = clamp( dot( geo.normal, (vec3( 1.0, 1.0, 1.0 )) ), 0.0, 1.0 );

	// direcitonalLight
	
	for( int i = 0; i < 1; i++ ){

		Light light;
		light.direction = directionalLight[i].direction;
		light.color = directionalLight[i].color;

		// light.direction = ( mat3(viewMatrix) * light.direction ).xyz;

		outColor += RE( geo, mat, light );
		
	} 

	glFragOut = vec4( outColor, 1.0 );

}