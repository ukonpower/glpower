varying vec2 vUv;
uniform sampler2D backbuffer;
uniform vec2 resolution;
uniform float time;

uniform sampler2D uSceneTex;
uniform sampler2D uBloomTex;

uniform float uBloomRenderCount;
uniform vec2 uBloomMipmapResolution;

uniform float uVignet;
uniform float uBrightness;

#pragma glslify: random = require( './random.glsl' );

vec2 getMipmapUV( vec2 uv, float level ) {

	vec2 ruv = uv;

	float scale = 1.0 / pow( 2.0, level + 1.0 );

	ruv *= scale;
	ruv.y += scale;

	if( level > 0.0 ) {

		ruv.x += 1.0 - ( scale * 2.0 );

	}

	return ruv;

}

vec4 cubic(float v) {
	vec4 n = vec4(1.0, 2.0, 3.0, 4.0) - v;
	vec4 s = n * n * n;
	float x = s.x;
	float y = s.y - 4.0 * s.x;
	float z = s.z - 4.0 * s.y + 6.0 * s.x;
	float w = 6.0 - x - y - z;
	return vec4(x, y, z, w);
}

// https://stackoverflow.com/questions/13501081/efficient-bicubic-filtering-code-in-glsl
vec4 textureBicubic(sampler2D t, vec2 texCoords, vec2 textureSize) {
	vec2 invTexSize = 1.0 / textureSize;
	texCoords = texCoords * textureSize - 0.5;
	vec2 fxy = fract(texCoords);
	texCoords -= fxy;
	vec4 xcubic = cubic(fxy.x);
	vec4 ycubic = cubic(fxy.y);
	vec4 c = texCoords.xxyy + vec2 (-0.5, 1.5).xyxy;
	vec4 s = vec4(xcubic.xz + xcubic.yw, ycubic.xz + ycubic.yw);
	vec4 offset = c + vec4 (xcubic.yw, ycubic.yw) / s;
	offset *= invTexSize.xxyy;
	vec4 sample0 = texture2D(t, offset.xz);
	vec4 sample1 = texture2D(t, offset.yz);
	vec4 sample2 = texture2D(t, offset.xw);
	vec4 sample3 = texture2D(t, offset.yw);
	float sx = s.x / (s.x + s.y);
	float sy = s.z / (s.z + s.w);
	return mix(
	mix(sample3, sample2, sx), mix(sample1, sample0, sx), sy);
}

void main(){

	vec2 uv = vUv;
	vec2 cuv = vUv * 2.0 - 1.0;
	float w = max( .0, length( cuv ) ) * 0.02;

	vec3 color = texture2D( uSceneTex, uv ).xyz;

	vec2 mipUV;
	vec3 bloom;
	float bloomWeight;
	
	#pragma unroll_loop_start
	for ( int i = 0; i < RENDER_COUNT; i ++ ) {

		mipUV = getMipmapUV( uv, float( UNROLLED_LOOP_INDEX ) );
		bloomWeight = float( UNROLLED_LOOP_INDEX + 1 ) / float( RENDER_COUNT ) * 0.3 + 0.7;
		
		bloom = textureBicubic( uBloomTex, mipUV, resolution ).xyz * uBrightness * bloomWeight;
		color += bloom;
		
	}
	#pragma unroll_loop_end

	color *= mix( 1.0, smoothstep( 2.0, 0.8, length( cuv ) ), uVignet );

	gl_FragColor = vec4( color, 1.0 );	

}