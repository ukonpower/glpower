precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;


varying vec2 vUv;

void main() {
    gl_Position = vec4( position, 1.0 );
    vUv = uv;
}