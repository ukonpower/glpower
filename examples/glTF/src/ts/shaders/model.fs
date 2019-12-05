precision highp float;

varying vec3 vColor;
varying vec3 normal;

void main( void ){
	
	gl_FragColor = vec4( vColor, 1.0 );
	
}