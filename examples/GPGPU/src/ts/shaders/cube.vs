precision highp float;

attribute vec3 position;
attribute vec3 color;
attribute vec3 normal;
attribute vec2 uv;
attribute float n;

uniform float time;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform sampler2D texPos;

attribute vec2 computeUV;

varying vec3 vColor;

mat2 rotate(float rad) {
  return mat2(cos(rad), sin(rad), -sin(rad), cos(rad));
}

void main( void ){

	vec3 pos = position;

	pos += texture2D( texPos, computeUV ).xyz;
	
	vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
	gl_PointSize = 5.0;
	vColor = vec3( uv, 1.0 ) + color;
	vColor = vec3( 1.0 );

}