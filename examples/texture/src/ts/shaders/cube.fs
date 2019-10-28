precision highp float;

uniform sampler2D texture;
uniform sampler2D texture2;

varying vec3 vColor;
varying vec2 vUv;

void main( void ){

	vec3 c = texture2D( texture, vUv ).xyz * 0.5;
	c += texture2D( texture2, vUv ).xyz * 0.5;
	
	gl_FragColor = vec4( c, 1.0 );
	
}