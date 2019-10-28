precision highp float;

uniform sampler2D texture;

varying vec3 vColor;
varying vec2 vUv;

void main( void ){

	vec3 c = texture2D( texture, vUv ).xyz;
	
	gl_FragColor = vec4( c, 1.0 );
	
}