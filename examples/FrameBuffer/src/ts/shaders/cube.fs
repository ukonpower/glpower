precision highp float;

uniform sampler2D texture;

varying vec3 vColor;
varying vec2 vUv;

void main( void ){
	
	vec3 c = texture2D( texture, vec2( vUv.x, 1.0 - vUv.y ) ).xyz;
	
	gl_FragColor = vec4( c + 0.1, 1.0 );
	
}