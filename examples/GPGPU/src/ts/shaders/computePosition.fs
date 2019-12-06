precision highp float;

uniform sampler2D texPos;
uniform sampler2D texVel;

varying vec2 vUv;

void main( void ){

	vec4 pos = texture2D( texPos, vUv );
	vec4 vel = texture2D( texVel, vUv );

	pos.xyz += vel.xyz;

	gl_FragColor = pos ;

}