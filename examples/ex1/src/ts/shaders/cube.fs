precision highp float;

varying vec3 vColor;

void main( void ){
	
	gl_FragColor = vec4( vColor + 0.3, 1.0 );
	
}