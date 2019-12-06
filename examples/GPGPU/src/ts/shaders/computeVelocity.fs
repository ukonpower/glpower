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

	if( time <= 1.0 ){

		vel += vec4(
			random( vUv * 10.0 ) - 0.5,
			random( vUv * 10.0 + 10.0 ) - 0.5,
			random( vUv * 10.0 + 100.0 ) - 0.5,
			0.0
		) * 0.5;
		
	}

	vel.xyz += createNoise( vec4( pos.xyz * 3.0, time * 0.1 ) );
	vel *= 0.1;

	gl_FragColor = vel;
	
}