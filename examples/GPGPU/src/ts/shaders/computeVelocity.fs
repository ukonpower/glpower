precision highp float;

uniform sampler2D texPos;
uniform sampler2D texVel;

varying vec2 vUv;
uniform vec2 resolution;
uniform float time;

$noise4D
$random

vec3 createNoise( vec4 p ){

	vec3 res = vec3(
		snoise( p + vec4( 10.0, 35.0, 431.0, 0.0 ) ),
		snoise( p + vec4( 50.0, 335.0, 43.0, 0.0 ) ),
		snoise( p + vec4( 90.0, 22.0, 71.0, 0.0 ) )
	);
	
	return res;
	
}

void main( void ){

	vec4 pos = texture2D( texPos, vUv );
	vec4 vel = texture2D( texVel, vUv );

	if( time < 1.2 ){

		vel += vec4(
			random( vUv * 10.0 ) - 0.5,
			random( vUv * 10.0 + 10.0 ) - 0.5,
			random( vUv * 10.0 + 100.0 ) - 0.5,
			0.0
		) * 0.5;
		
	}else{

		vel.xyz += createNoise( vec4( pos.xyz * 0.6 , time * 0.01 + sin( vUv.x * 5.0 + vUv.y ) * 0.3 ) ) * 0.12;
		vel *= 0.89;

		vel -= length( pos.xyz ) * 0.005 * ( pos );

	}

	gl_FragColor = vel;
	
}