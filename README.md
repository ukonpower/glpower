Javascript オレオレ3D library

### install
You can get the library from [npm]( https://www.npmjs.com/package/glpower ).

```bash
$ npm install ore-three-ts
```

### Import

```javascript
import * as GLP from 'glpower';
```

### Usage

```javascript
import * as GLP from 'glpower';

import vert from './shaders/cube.vs';
import frag from './shaders/cube.fs';

export class APP{

	private renderer: GLP.Renderer;
	private scene: GLP.Scene;
	private camera: GLP.Camera;

	private cube: GLP.Mesh;

	private time: number = 0;

	constructor(){

		this.renderer = new GLP.Renderer({
			canvas: document.querySelector( '#canvas' ),
			retina: true
		});

		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.initScene();

		this.animate();

		window.addEventListener( 'resize', this.resize.bind( this ) );

	}

	private initScene(){
		
		this.scene = new GLP.Scene();

		this.camera = new GLP.Camera( 50, 0.1, 1000 );
		this.camera.position.set( 0, 0, 5 );
	
		let mat = new GLP.Material({
			frag: frag,
			vert: vert,
			uniforms: {},
			doubleSide: true
		});

		this.cube = new GLP.PowerObj( new GLP.CubeGeometry(), mat );
		this.scene.add( this.cube );

	}

	private animate(){

		this.time += 1.0;

		this.cube.rotation.x = this.time * 0.02;
		this.cube.rotation.y = this.time * 0.02;

		this.renderer.render( this.scene, this.camera );

		requestAnimationFrame( this.animate.bind( this ) );

	}

	private resize(){

		this.renderer.setSize( window.innerWidth, window.innerHeight );

	}

}

window.addEventListener( 'load', () => {

	let app = new APP();

});
```

#### Vertex shader

```glsl
precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform float time;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec3 vColor;

void main( void ){
	
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
	gl_PointSize = 5.0;

	vColor = vec3( uv, 1.0 );

}
```

#### Fragment shader

```glsl
precision highp float;

varying vec3 vColor;

void main( void ){
	
	gl_FragColor = vec4( vColor, 1.0 );
	
}
```


