/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./examples/FrameBuffer/src/ts/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/FrameBuffer/src/ts/main.ts":
/*!*********************************************!*\
  !*** ./examples/FrameBuffer/src/ts/main.ts ***!
  \*********************************************/
/*! exports provided: APP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"APP\", function() { return APP; });\n/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../src */ \"./src/index.ts\");\n/* harmony import */ var _shaders_cube_vs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shaders/cube.vs */ \"./examples/FrameBuffer/src/ts/shaders/cube.vs\");\n/* harmony import */ var _shaders_cube_vs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_shaders_cube_vs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _shaders_cube_fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shaders/cube.fs */ \"./examples/FrameBuffer/src/ts/shaders/cube.fs\");\n/* harmony import */ var _shaders_cube_fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_shaders_cube_fs__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar APP = /** @class */ (function () {\n    function APP() {\n        this.time = 0;\n        this.renderer = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Renderer\"]({\n            canvas: document.querySelector('#canvas'),\n            retina: true\n        });\n        this.gl = this.renderer.gl;\n        this.renderer.setSize(window.innerWidth, window.innerHeight);\n        this.fbuffer = new _src__WEBPACK_IMPORTED_MODULE_0__[\"FrameBuffer\"]({\n            width: 1024,\n            height: 512\n        });\n        this.initScene();\n        this.animate();\n        window.addEventListener('resize', this.resize.bind(this));\n    }\n    APP.prototype.initScene = function () {\n        this.scene = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]();\n        this.renderScene = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]();\n        this.camera = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Camera\"](50, 0.1, 1000, window.innerWidth / window.innerHeight);\n        this.camera.position.set(0, 0, 5);\n        //cube1\n        var uni1 = {\n            texture: {\n                value: null\n            }\n        };\n        var mat = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Material\"]({\n            frag: _shaders_cube_fs__WEBPACK_IMPORTED_MODULE_2___default.a,\n            vert: _shaders_cube_vs__WEBPACK_IMPORTED_MODULE_1___default.a,\n            uniforms: uni1,\n            culling: this.gl.CCW\n        });\n        this.cube = new _src__WEBPACK_IMPORTED_MODULE_0__[\"RenderingObject\"]({\n            geo: new _src__WEBPACK_IMPORTED_MODULE_0__[\"CubeGeometry\"](1.5, 1.5, 1.5),\n            mat: mat\n        });\n        this.scene.add(this.cube);\n        uni1.texture.value = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Texture\"]().loadImg('./assets/Lenna.jpg');\n        //cube2\n        this.uniform = {\n            texture: {\n                value: this.fbuffer\n            }\n        };\n        var mat2 = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Material\"]({\n            frag: _shaders_cube_fs__WEBPACK_IMPORTED_MODULE_2___default.a,\n            vert: _shaders_cube_vs__WEBPACK_IMPORTED_MODULE_1___default.a,\n            uniforms: this.uniform,\n        });\n        this.renderCube = new _src__WEBPACK_IMPORTED_MODULE_0__[\"RenderingObject\"]({\n            geo: new _src__WEBPACK_IMPORTED_MODULE_0__[\"PlaneGeometry\"](1.5, 1.5),\n            mat: mat2\n        });\n        this.renderScene.add(this.renderCube);\n    };\n    APP.prototype.animate = function () {\n        this.time += 1.0;\n        var rot = this.time * 0.02;\n        this.cube.rotation.set(rot, rot, 0);\n        this.renderCube.rotation.set(0, rot, 0);\n        this.camera.aspect = 1;\n        this.renderer.setFrameBuffer(this.fbuffer);\n        this.renderer.render(this.scene, this.camera);\n        this.camera.aspect = window.innerWidth / window.innerHeight;\n        this.renderer.setFrameBuffer(null);\n        this.renderer.render(this.renderScene, this.camera);\n        requestAnimationFrame(this.animate.bind(this));\n    };\n    APP.prototype.resize = function () {\n        this.camera.aspect = window.innerWidth / window.innerHeight;\n        this.renderer.setSize(window.innerWidth, window.innerHeight);\n    };\n    return APP;\n}());\n\nwindow.addEventListener('load', function () {\n    var app = new APP();\n});\n\n\n//# sourceURL=webpack:///./examples/FrameBuffer/src/ts/main.ts?");

/***/ }),

/***/ "./examples/FrameBuffer/src/ts/shaders/cube.fs":
/*!*****************************************************!*\
  !*** ./examples/FrameBuffer/src/ts/shaders/cube.fs ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"precision highp float;\\r\\n\\r\\nuniform sampler2D texture;\\r\\n\\r\\nvarying vec3 vColor;\\r\\nvarying vec2 vUv;\\r\\n\\r\\nvoid main( void ){\\r\\n\\t\\r\\n\\tvec3 c = texture2D( texture, vec2( vUv.x, 1.0 - vUv.y ) ).xyz;\\r\\n\\t\\r\\n\\tgl_FragColor = vec4( c + 0.1, 1.0 );\\r\\n\\t\\r\\n}\"\n\n//# sourceURL=webpack:///./examples/FrameBuffer/src/ts/shaders/cube.fs?");

/***/ }),

/***/ "./examples/FrameBuffer/src/ts/shaders/cube.vs":
/*!*****************************************************!*\
  !*** ./examples/FrameBuffer/src/ts/shaders/cube.vs ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"precision highp float;\\r\\n\\r\\nattribute vec3 position;\\r\\nattribute vec3 color;\\r\\nattribute vec3 normal;\\r\\nattribute vec2 uv;\\r\\n\\r\\nuniform float time;\\r\\nuniform mat4 modelViewMatrix;\\r\\nuniform mat4 projectionMatrix;\\r\\n\\r\\nvarying vec3 vColor;\\r\\nvarying vec2 vUv;\\r\\n\\r\\nvoid main( void ){\\r\\n\\t\\r\\n\\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\\r\\n    gl_Position = projectionMatrix * mvPosition;\\r\\n\\tgl_PointSize = 5.0;\\r\\n\\r\\n\\tvColor = vec3( uv, 1.0 ) + color;\\r\\n\\r\\n\\tvUv = uv;\\r\\n\\r\\n}\"\n\n//# sourceURL=webpack:///./examples/FrameBuffer/src/ts/shaders/cube.vs?");

/***/ }),

/***/ "./src/geometries/CubeGeometry.ts":
/*!****************************************!*\
  !*** ./src/geometries/CubeGeometry.ts ***!
  \****************************************/
/*! exports provided: CubeGeometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CubeGeometry\", function() { return CubeGeometry; });\n/* harmony import */ var _Geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Geometry */ \"./src/geometries/Geometry.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar CubeGeometry = /** @class */ (function (_super) {\n    __extends(CubeGeometry, _super);\n    function CubeGeometry(width, height, depth) {\n        if (width === void 0) { width = 1; }\n        if (height === void 0) { height = 1; }\n        if (depth === void 0) { depth = 1; }\n        var _this = _super.call(this) || this;\n        var hx = width / 2;\n        var hy = height / 2;\n        var hz = depth / 2;\n        var posArray = [\n            -hx, hy, hz,\n            hx, hy, hz,\n            -hx, -hy, hz,\n            hx, -hy, hz,\n            hx, hy, -hz,\n            -hx, hy, -hz,\n            hx, -hy, -hz,\n            -hx, -hy, -hz,\n            hx, hy, hz,\n            hx, hy, -hz,\n            hx, -hy, hz,\n            hx, -hy, -hz,\n            -hx, hy, -hz,\n            -hx, hy, hz,\n            -hx, -hy, -hz,\n            -hx, -hy, hz,\n            hx, hy, -hz,\n            hx, hy, hz,\n            -hx, hy, -hz,\n            -hx, hy, hz,\n            -hx, -hy, -hz,\n            -hx, -hy, hz,\n            hx, -hy, -hz,\n            hx, -hy, hz,\n        ];\n        var normalArray = [\n            0, 0, 1,\n            0, 0, 1,\n            0, 0, 1,\n            0, 0, 1,\n            0, 0, -1,\n            0, 0, -1,\n            0, 0, -1,\n            0, 0, -1,\n            1, 0, 0,\n            1, 0, 0,\n            1, 0, 0,\n            1, 0, 0,\n            -1, 0, 0,\n            -1, 0, 0,\n            -1, 0, 0,\n            -1, 0, 0,\n            0, 1, 0,\n            0, 1, 0,\n            0, 1, 0,\n            0, 1, 0,\n            0, -1, 0,\n            0, -1, 0,\n            0, -1, 0,\n            0, -1, 0,\n        ];\n        var uvArray = [];\n        var indexArray = [];\n        for (var i = 0; i < 6; i++) {\n            uvArray.push(0, 1, 1, 1, 0, 0, 1, 0);\n            var offset = 4 * i;\n            indexArray.push(0 + offset, 2 + offset, 1 + offset, 1 + offset, 2 + offset, 3 + offset);\n        }\n        _this.addAttributes('position', posArray, 3);\n        _this.addAttributes('normal', normalArray, 3);\n        _this.addAttributes('uv', uvArray, 2);\n        _this.addAttributes('index', indexArray, 1);\n        return _this;\n    }\n    return CubeGeometry;\n}(_Geometry__WEBPACK_IMPORTED_MODULE_0__[\"Geometry\"]));\n\n\n\n//# sourceURL=webpack:///./src/geometries/CubeGeometry.ts?");

/***/ }),

/***/ "./src/geometries/CylinderGeometry.ts":
/*!********************************************!*\
  !*** ./src/geometries/CylinderGeometry.ts ***!
  \********************************************/
/*! exports provided: CylinderGeometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CylinderGeometry\", function() { return CylinderGeometry; });\n/* harmony import */ var _Geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Geometry */ \"./src/geometries/Geometry.ts\");\n/* harmony import */ var _math_Vec3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vec3 */ \"./src/math/Vec3.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar CylinderGeometry = /** @class */ (function (_super) {\n    __extends(CylinderGeometry, _super);\n    function CylinderGeometry(radiusTop, radiusBottom, height, radSegments, heightSegments) {\n        if (radSegments === void 0) { radSegments = 5; }\n        if (heightSegments === void 0) { heightSegments = 1; }\n        var _this = _super.call(this) || this;\n        var posArray = [];\n        var normalArray = [];\n        var uvArray = [];\n        var indexArray = [];\n        //上下面分2回多くループ\n        for (var i = 0; i <= heightSegments + 2; i++) {\n            for (var j = 0; j < radSegments; j++) {\n                var theta = Math.PI * 2.0 / radSegments * j;\n                if (i <= heightSegments) {\n                    //side\n                    var w = i / heightSegments;\n                    var radius = (1.0 - w) * radiusBottom + w * radiusTop;\n                    var x = Math.cos(theta) * radius;\n                    var y = -(height / 2) + (height / heightSegments) * i;\n                    var z = Math.sin(theta) * radius;\n                    posArray.push(x, y, z);\n                    uvArray.push(j / radSegments, i / heightSegments);\n                    var normal = new _math_Vec3__WEBPACK_IMPORTED_MODULE_1__[\"Vec3\"](Math.cos(theta), 0, Math.sin(theta)).normalize();\n                    normalArray.push(normal.x, normal.y, normal.z);\n                    if (i < heightSegments) {\n                        indexArray.push(i * radSegments + j, i * radSegments + (j + 1) % radSegments, (i + 1) * radSegments + (j + 1) % radSegments, i * radSegments + j, (i + 1) * radSegments + (j + 1) % radSegments, (i + 1) * radSegments + j);\n                    }\n                }\n                else {\n                    //bottom, top\n                    var side = i - heightSegments - 1;\n                    var radius = side ? radiusTop : radiusBottom;\n                    var x = Math.cos(theta) * radius;\n                    var y = -(height / 2) + height * (side);\n                    var z = Math.sin(theta) * radius;\n                    posArray.push(x, y, z);\n                    uvArray.push((x + radius) * 0.5 / radius, (z + radius) * 0.5 / radius);\n                    normalArray.push(0, -1 + side * 2, 0);\n                    var offset = radSegments * (heightSegments + (side + 1));\n                    if (j <= radSegments - 2) {\n                        indexArray.push(offset, offset + j, offset + j + 1);\n                    }\n                }\n            }\n        }\n        // let offset = radSegments * heightSegments;\n        // for( let i = 2; i < radSegments; i++ ){\n        // \tindexArray.push(\n        // \t\t0, i, i - 1,\n        // \t\t0 + offset, i + offset, i - 1 + offset,\n        // \t);\n        // }\n        _this.addAttributes('position', posArray, 3);\n        _this.addAttributes('normal', normalArray, 3);\n        _this.addAttributes('uv', uvArray, 2);\n        _this.addAttributes('index', indexArray, 1);\n        return _this;\n    }\n    return CylinderGeometry;\n}(_Geometry__WEBPACK_IMPORTED_MODULE_0__[\"Geometry\"]));\n\n\n\n//# sourceURL=webpack:///./src/geometries/CylinderGeometry.ts?");

/***/ }),

/***/ "./src/geometries/Geometry.ts":
/*!************************************!*\
  !*** ./src/geometries/Geometry.ts ***!
  \************************************/
/*! exports provided: Geometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Geometry\", function() { return Geometry; });\nvar Geometry = /** @class */ (function () {\n    function Geometry() {\n        this.attributes = {};\n    }\n    Geometry.prototype.addAttributes = function (name, vertices, stride) {\n        this.attributes[name] = {\n            vertices: vertices,\n            stride: stride,\n        };\n    };\n    return Geometry;\n}());\n\n\n\n//# sourceURL=webpack:///./src/geometries/Geometry.ts?");

/***/ }),

/***/ "./src/geometries/PlaneGeometry.ts":
/*!*****************************************!*\
  !*** ./src/geometries/PlaneGeometry.ts ***!
  \*****************************************/
/*! exports provided: PlaneGeometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PlaneGeometry\", function() { return PlaneGeometry; });\n/* harmony import */ var _Geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Geometry */ \"./src/geometries/Geometry.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar PlaneGeometry = /** @class */ (function (_super) {\n    __extends(PlaneGeometry, _super);\n    function PlaneGeometry(width, height, widthSegments, heightSegments) {\n        if (width === void 0) { width = 1; }\n        if (height === void 0) { height = 1; }\n        if (widthSegments === void 0) { widthSegments = 1; }\n        if (heightSegments === void 0) { heightSegments = 1; }\n        var _this = _super.call(this) || this;\n        var hx = width / 2;\n        var hy = height / 2;\n        var posArray = [];\n        var normalArray = [];\n        var uvArray = [];\n        var indexArray = [];\n        for (var i = 0; i <= heightSegments; i++) {\n            for (var j = 0; j <= widthSegments; j++) {\n                var x = (j / widthSegments);\n                var y = (i / widthSegments);\n                posArray.push(-hx + width * x, -hy + height * y, 0);\n                uvArray.push(x, y);\n                if (i > 0 && j > 0) {\n                    var n = (widthSegments + 1);\n                    var ru = n * i + j;\n                    var lb = n * (i - 1) + j - 1;\n                    indexArray.push(ru, n * i + j - 1, lb, ru, lb, n * (i - 1) + j);\n                }\n            }\n        }\n        _this.addAttributes('position', posArray, 3);\n        _this.addAttributes('normal', normalArray, 3);\n        _this.addAttributes('uv', uvArray, 2);\n        _this.addAttributes('index', indexArray, 1);\n        return _this;\n    }\n    return PlaneGeometry;\n}(_Geometry__WEBPACK_IMPORTED_MODULE_0__[\"Geometry\"]));\n\n\n\n//# sourceURL=webpack:///./src/geometries/PlaneGeometry.ts?");

/***/ }),

/***/ "./src/geometries/SphereGeometry.ts":
/*!******************************************!*\
  !*** ./src/geometries/SphereGeometry.ts ***!
  \******************************************/
/*! exports provided: SphereGeometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SphereGeometry\", function() { return SphereGeometry; });\n/* harmony import */ var _Geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Geometry */ \"./src/geometries/Geometry.ts\");\n/* harmony import */ var _math_Vec3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vec3 */ \"./src/math/Vec3.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar SphereGeometry = /** @class */ (function (_super) {\n    __extends(SphereGeometry, _super);\n    function SphereGeometry(radius, widthSegments, heightSegments) {\n        if (radius === void 0) { radius = 0.5; }\n        if (widthSegments === void 0) { widthSegments = 20; }\n        if (heightSegments === void 0) { heightSegments = 10; }\n        var _this = _super.call(this) || this;\n        var posArray = [];\n        var normalArray = [];\n        var uvArray = [];\n        var indexArray = [];\n        for (var i = 0; i <= heightSegments; i++) {\n            var thetaI = i / heightSegments * Math.PI;\n            var segments = (i != 0 && i != heightSegments) ? widthSegments : widthSegments;\n            for (var j = 0; j < segments; j++) {\n                // pos\n                var thetaJ = j / segments * Math.PI * 2.0;\n                var widthRadius = Math.sin(thetaI) * radius;\n                var x = Math.cos(thetaJ) * widthRadius;\n                var y = -Math.cos(thetaI) * radius;\n                var z = Math.sin(thetaJ) * widthRadius;\n                posArray.push(x, y, z);\n                // uv\n                uvArray.push(j / segments, i / heightSegments);\n                //normal\n                var normal = new _math_Vec3__WEBPACK_IMPORTED_MODULE_1__[\"Vec3\"](x, y, z).normalize();\n                normalArray.push(normal.x, normal.y, normal.z);\n                // index\n                indexArray.push(i * widthSegments + j, i * widthSegments + (j + 1) % widthSegments, (i + 1) * widthSegments + (j + 1) % widthSegments, i * widthSegments + j, (i + 1) * widthSegments + (j + 1) % widthSegments, (i + 1) * widthSegments + j);\n            }\n        }\n        _this.addAttributes('position', posArray, 3);\n        _this.addAttributes('normal', normalArray, 3);\n        _this.addAttributes('uv', uvArray, 2);\n        _this.addAttributes('index', indexArray, 1);\n        return _this;\n    }\n    return SphereGeometry;\n}(_Geometry__WEBPACK_IMPORTED_MODULE_0__[\"Geometry\"]));\n\n\n\n//# sourceURL=webpack:///./src/geometries/SphereGeometry.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: Texture, Renderer, FrameBuffer, Material, Camera, Geometry, CubeGeometry, CylinderGeometry, PlaneGeometry, SphereGeometry, Scene, Empty, RenderingObject, Vec2, Vec3, Mat4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _renderers_Renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderers/Renderer */ \"./src/renderers/Renderer.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Renderer\", function() { return _renderers_Renderer__WEBPACK_IMPORTED_MODULE_0__[\"Renderer\"]; });\n\n/* harmony import */ var _renderers_FrameBuffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderers/FrameBuffer */ \"./src/renderers/FrameBuffer.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"FrameBuffer\", function() { return _renderers_FrameBuffer__WEBPACK_IMPORTED_MODULE_1__[\"FrameBuffer\"]; });\n\n/* harmony import */ var _renderers_Material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderers/Material */ \"./src/renderers/Material.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Material\", function() { return _renderers_Material__WEBPACK_IMPORTED_MODULE_2__[\"Material\"]; });\n\n/* harmony import */ var _renderers_Camera__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderers/Camera */ \"./src/renderers/Camera.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Camera\", function() { return _renderers_Camera__WEBPACK_IMPORTED_MODULE_3__[\"Camera\"]; });\n\n/* harmony import */ var _geometries_Geometry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./geometries/Geometry */ \"./src/geometries/Geometry.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Geometry\", function() { return _geometries_Geometry__WEBPACK_IMPORTED_MODULE_4__[\"Geometry\"]; });\n\n/* harmony import */ var _geometries_CubeGeometry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./geometries/CubeGeometry */ \"./src/geometries/CubeGeometry.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"CubeGeometry\", function() { return _geometries_CubeGeometry__WEBPACK_IMPORTED_MODULE_5__[\"CubeGeometry\"]; });\n\n/* harmony import */ var _geometries_CylinderGeometry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./geometries/CylinderGeometry */ \"./src/geometries/CylinderGeometry.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"CylinderGeometry\", function() { return _geometries_CylinderGeometry__WEBPACK_IMPORTED_MODULE_6__[\"CylinderGeometry\"]; });\n\n/* harmony import */ var _geometries_PlaneGeometry__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./geometries/PlaneGeometry */ \"./src/geometries/PlaneGeometry.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"PlaneGeometry\", function() { return _geometries_PlaneGeometry__WEBPACK_IMPORTED_MODULE_7__[\"PlaneGeometry\"]; });\n\n/* harmony import */ var _geometries_SphereGeometry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./geometries/SphereGeometry */ \"./src/geometries/SphereGeometry.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SphereGeometry\", function() { return _geometries_SphereGeometry__WEBPACK_IMPORTED_MODULE_8__[\"SphereGeometry\"]; });\n\n/* harmony import */ var _objects_Scene__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./objects/Scene */ \"./src/objects/Scene.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Scene\", function() { return _objects_Scene__WEBPACK_IMPORTED_MODULE_9__[\"Scene\"]; });\n\n/* harmony import */ var _objects_Empty__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./objects/Empty */ \"./src/objects/Empty.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Empty\", function() { return _objects_Empty__WEBPACK_IMPORTED_MODULE_10__[\"Empty\"]; });\n\n/* harmony import */ var _objects_RenderingObject__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./objects/RenderingObject */ \"./src/objects/RenderingObject.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"RenderingObject\", function() { return _objects_RenderingObject__WEBPACK_IMPORTED_MODULE_11__[\"RenderingObject\"]; });\n\n/* harmony import */ var _math_Vec2__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./math/Vec2 */ \"./src/math/Vec2.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Vec2\", function() { return _math_Vec2__WEBPACK_IMPORTED_MODULE_12__[\"Vec2\"]; });\n\n/* harmony import */ var _math_Vec3__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./math/Vec3 */ \"./src/math/Vec3.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Vec3\", function() { return _math_Vec3__WEBPACK_IMPORTED_MODULE_13__[\"Vec3\"]; });\n\n/* harmony import */ var _math_Mat4__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./math/Mat4 */ \"./src/math/Mat4.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Mat4\", function() { return _math_Mat4__WEBPACK_IMPORTED_MODULE_14__[\"Mat4\"]; });\n\n/* harmony import */ var _textures_Texture__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./textures/Texture */ \"./src/textures/Texture.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Texture\", function() { return _textures_Texture__WEBPACK_IMPORTED_MODULE_15__[\"Texture\"]; });\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/math/Mat4.ts":
/*!**************************!*\
  !*** ./src/math/Mat4.ts ***!
  \**************************/
/*! exports provided: Mat4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Mat4\", function() { return Mat4; });\nvar Mat4 = /** @class */ (function () {\n    function Mat4() {\n        this.identity();\n    }\n    Object.defineProperty(Mat4.prototype, \"isMat4\", {\n        get: function () {\n            return true;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Mat4.prototype.identity = function () {\n        this.element = [\n            1, 0, 0, 0,\n            0, 1, 0, 0,\n            0, 0, 1, 0,\n            0, 0, 0, 1,\n        ];\n        return this;\n    };\n    Mat4.prototype.clone = function () {\n        return new Mat4().copy(this);\n    };\n    Mat4.prototype.copy = function (mat) {\n        this.element = mat.element.slice();\n        return this;\n    };\n    Mat4.prototype.perspective = function (fov, aspect, near, far) {\n        var r = 1 / Math.tan(fov * Math.PI / 360);\n        var d = far - near;\n        this.element = [\n            r / aspect, 0, 0, 0,\n            0, r, 0, 0,\n            0, 0, -(far + near) / d, -1,\n            0, 0, -(far * near * 2) / d, 0\n        ];\n        return this;\n    };\n    Mat4.prototype.lookAt = function (eye, target, up) {\n        var zAxis = eye.clone().sub(target).normalize();\n        var xAxis = up.clone().cross(zAxis).normalize();\n        var yAxis = zAxis.clone().cross(xAxis).normalize();\n        this.element = [\n            xAxis.x, yAxis.x, zAxis.x, 0,\n            xAxis.y, yAxis.y, zAxis.y, 0,\n            xAxis.z, yAxis.z, zAxis.z, 0,\n            -eye.dot(xAxis),\n            -eye.dot(yAxis),\n            -eye.dot(zAxis),\n            1,\n        ];\n        return this;\n    };\n    Mat4.prototype.inverse = function () {\n        var a = this.element[0], b = this.element[1], c = this.element[2], d = this.element[3], e = this.element[4], f = this.element[5], g = this.element[6], h = this.element[7], i = this.element[8], j = this.element[9], k = this.element[10], l = this.element[11], m = this.element[12], n = this.element[13], o = this.element[14], p = this.element[15], q = a * f - b * e, r = a * g - c * e, s = a * h - d * e, t = b * g - c * f, u = b * h - d * f, v = c * h - d * g, w = i * n - j * m, x = i * o - k * m, y = i * p - l * m, z = j * o - k * n, A = j * p - l * n, B = k * p - l * o, ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);\n        this.element[0] = (f * B - g * A + h * z) * ivd;\n        this.element[1] = (-b * B + c * A - d * z) * ivd;\n        this.element[2] = (n * v - o * u + p * t) * ivd;\n        this.element[3] = (-j * v + k * u - l * t) * ivd;\n        this.element[4] = (-e * B + g * y - h * x) * ivd;\n        this.element[5] = (a * B - c * y + d * x) * ivd;\n        this.element[6] = (-m * v + o * s - p * r) * ivd;\n        this.element[7] = (i * v - k * s + l * r) * ivd;\n        this.element[8] = (e * A - f * y + h * w) * ivd;\n        this.element[9] = (-a * A + b * y - d * w) * ivd;\n        this.element[10] = (m * u - n * s + p * q) * ivd;\n        this.element[11] = (-i * u + j * s - l * q) * ivd;\n        this.element[12] = (-e * z + f * x - g * w) * ivd;\n        this.element[13] = (a * z - b * x + c * w) * ivd;\n        this.element[14] = (-m * t + n * r - o * q) * ivd;\n        this.element[15] = (i * t - j * r + k * q) * ivd;\n        return this;\n    };\n    Mat4.prototype.createTransformMatrix = function (pos, rot, scale) {\n        this.identity();\n        //position\n        this.matmul([\n            1, 0, 0, 0,\n            0, 1, 0, 0,\n            0, 0, 1, 0,\n            pos.x, pos.y, pos.z, 1\n        ]);\n        //rotation\n        var c = Math.cos(rot.x), s = Math.sin(rot.x);\n        this.matmul([\n            1, 0, 0, 0,\n            0, c, s, 0,\n            0, -s, c, 0,\n            0, 0, 0, 1\n        ]);\n        c = Math.cos(rot.y), s = Math.sin(rot.y);\n        this.matmul([\n            c, 0, -s, 0,\n            0, 1, 0, 0,\n            s, 0, c, 0,\n            0, 0, 0, 1\n        ]);\n        c = Math.cos(rot.z), s = Math.sin(rot.z);\n        this.matmul([\n            c, s, 0, 0,\n            -s, c, 0, 0,\n            0, 0, 1, 0,\n            0, 0, 0, 1\n        ]);\n        //scale\n        this.matmul([\n            scale.x, 0, 0, 0,\n            0, scale.y, 0, 0,\n            0, 0, scale.z, 0,\n            0, 0, 0, 1\n        ]);\n        return this;\n    };\n    Mat4.prototype.matmul = function (elm2) {\n        var dist = new Array(16);\n        for (var i = 0; i < 4; i++) {\n            for (var j = 0; j < 4; j++) {\n                var sum = 0;\n                for (var k = 0; k < 4; k++) {\n                    sum += this.element[k * 4 + j] * elm2[k + i * 4];\n                }\n                dist[j + i * 4] = sum;\n            }\n        }\n        this.element = dist;\n    };\n    Mat4.prototype.multiply = function (m) {\n        this.matmul(m.element);\n        return this;\n    };\n    Mat4.prototype.multiplyScaler = function (a) {\n        for (var i = 0; i < this.element.length; i++) {\n            this.element[i] *= a;\n        }\n        return this;\n    };\n    return Mat4;\n}());\n\n\n\n//# sourceURL=webpack:///./src/math/Mat4.ts?");

/***/ }),

/***/ "./src/math/Vec2.ts":
/*!**************************!*\
  !*** ./src/math/Vec2.ts ***!
  \**************************/
/*! exports provided: Vec2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Vec2\", function() { return Vec2; });\nvar Vec2 = /** @class */ (function () {\n    function Vec2(x, y, z) {\n        this.x = x || 0;\n        this.y = y || 0;\n    }\n    Object.defineProperty(Vec2.prototype, \"isVec2\", {\n        get: function () {\n            return true;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Vec2.prototype.add = function (a) {\n        if (a.isVec2) {\n            this.x += a.x;\n            this.y += a.y;\n        }\n        else if (typeof (a) == 'number') {\n            this.x += a;\n            this.y += a;\n        }\n        return this;\n    };\n    Vec2.prototype.sub = function (a) {\n        if (a.isVec2) {\n            this.x -= a.x;\n            this.y -= a.y;\n        }\n        else if (typeof (a) == 'number') {\n            this.x -= a;\n            this.y -= a;\n        }\n        return this;\n    };\n    Vec2.prototype.multiply = function (a) {\n        if (a.isVec2) {\n            this.x *= a.x;\n            this.y *= a.y;\n        }\n        else if (typeof (a) == 'number') {\n            this.x *= a;\n            this.y *= a;\n        }\n        return this;\n    };\n    return Vec2;\n}());\n\n\n\n//# sourceURL=webpack:///./src/math/Vec2.ts?");

/***/ }),

/***/ "./src/math/Vec3.ts":
/*!**************************!*\
  !*** ./src/math/Vec3.ts ***!
  \**************************/
/*! exports provided: Vec3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Vec3\", function() { return Vec3; });\nvar Vec3 = /** @class */ (function () {\n    function Vec3(x, y, z) {\n        this.x = x || 0;\n        this.y = y || 0;\n        this.z = z || 0;\n    }\n    Object.defineProperty(Vec3.prototype, \"isVec3\", {\n        get: function () {\n            return true;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Vec3.prototype.clone = function () {\n        return new Vec3(this.x, this.y, this.z);\n    };\n    Vec3.prototype.set = function (x, y, z) {\n        this.x = x;\n        this.y = y;\n        this.z = z;\n        return this;\n    };\n    Vec3.prototype.add = function (a) {\n        if (a.isVec3) {\n            this.x += a.x;\n            this.y += a.y;\n            this.z += a.z;\n        }\n        else if (typeof (a) == 'number') {\n            this.x += a;\n            this.y += a;\n            this.z += a;\n        }\n        return this;\n    };\n    Vec3.prototype.sub = function (a) {\n        if (a.isVec3) {\n            this.x -= a.x;\n            this.y -= a.y;\n            this.z -= a.z;\n        }\n        else if (typeof (a) == 'number') {\n            this.x -= a;\n            this.y -= a;\n            this.z -= a;\n        }\n        return this;\n    };\n    Vec3.prototype.multiply = function (a) {\n        if (a.isVec3) {\n            this.x *= a.x;\n            this.y *= a.y;\n            this.z *= a.z;\n        }\n        else if (typeof (a) == 'number') {\n            this.x *= a;\n            this.y *= a;\n            this.z *= a;\n        }\n        return this;\n    };\n    Vec3.prototype.divide = function (a) {\n        if (a.isVec3) {\n            this.x /= a.x;\n            this.y /= a.y;\n            this.z /= a.z;\n        }\n        else if (typeof (a) == 'number') {\n            this.x /= a;\n            this.y /= a;\n            this.z /= a;\n        }\n        return this;\n    };\n    Vec3.prototype.length = function () {\n        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);\n    };\n    Vec3.prototype.normalize = function () {\n        return this.divide(this.length() || 1);\n    };\n    Vec3.prototype.cross = function (v) {\n        var ax = this.x, ay = this.y, az = this.z;\n        var bx = v.x, by = v.y, bz = v.z;\n        this.x = ay * bz - az * by;\n        this.y = az * bx - ax * bz;\n        this.z = ax * by - ay * bx;\n        return this;\n    };\n    Vec3.prototype.dot = function (v) {\n        return this.x * v.x + this.y * v.y + this.z * v.z;\n    };\n    return Vec3;\n}());\n\n\n\n//# sourceURL=webpack:///./src/math/Vec3.ts?");

/***/ }),

/***/ "./src/objects/Empty.ts":
/*!******************************!*\
  !*** ./src/objects/Empty.ts ***!
  \******************************/
/*! exports provided: Empty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Empty\", function() { return Empty; });\n/* harmony import */ var _math_Vec3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vec3 */ \"./src/math/Vec3.ts\");\n/* harmony import */ var _math_Mat4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Mat4 */ \"./src/math/Mat4.ts\");\n\n\nvar Empty = /** @class */ (function () {\n    function Empty() {\n        this.children = [];\n        this.modelMatrix = new _math_Mat4__WEBPACK_IMPORTED_MODULE_1__[\"Mat4\"]();\n        this.modelViewMatrix = new _math_Mat4__WEBPACK_IMPORTED_MODULE_1__[\"Mat4\"]();\n        this.position = new _math_Vec3__WEBPACK_IMPORTED_MODULE_0__[\"Vec3\"]();\n        this.rotation = new _math_Vec3__WEBPACK_IMPORTED_MODULE_0__[\"Vec3\"]();\n        this.scale = new _math_Vec3__WEBPACK_IMPORTED_MODULE_0__[\"Vec3\"](1, 1, 1);\n    }\n    Empty.prototype.add = function (obj) {\n        if (obj) {\n            this.children.push(obj);\n        }\n    };\n    Empty.prototype.updateMatrix = function () {\n        this.modelMatrix.createTransformMatrix(this.position, this.rotation, this.scale);\n    };\n    return Empty;\n}());\n\n\n\n//# sourceURL=webpack:///./src/objects/Empty.ts?");

/***/ }),

/***/ "./src/objects/RenderingObject.ts":
/*!****************************************!*\
  !*** ./src/objects/RenderingObject.ts ***!
  \****************************************/
/*! exports provided: RenderingObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RenderingObject\", function() { return RenderingObject; });\n/* harmony import */ var _Empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Empty */ \"./src/objects/Empty.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar RenderingObject = /** @class */ (function (_super) {\n    __extends(RenderingObject, _super);\n    function RenderingObject(param) {\n        var _this = _super.call(this) || this;\n        _this.geometry = param.geo;\n        _this.material = param.mat;\n        _this.drawType = param.drawType;\n        _this.IndividualUniforms = {\n            modelViewMatrix: {\n                value: _this.modelViewMatrix\n            },\n            projectionMatrix: {\n                value: null\n            }\n        };\n        return _this;\n    }\n    Object.defineProperty(RenderingObject.prototype, \"isRenderingObject\", {\n        get: function () {\n            return true;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    return RenderingObject;\n}(_Empty__WEBPACK_IMPORTED_MODULE_0__[\"Empty\"]));\n\n\n\n//# sourceURL=webpack:///./src/objects/RenderingObject.ts?");

/***/ }),

/***/ "./src/objects/Scene.ts":
/*!******************************!*\
  !*** ./src/objects/Scene.ts ***!
  \******************************/
/*! exports provided: Scene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Scene\", function() { return Scene; });\n/* harmony import */ var _Empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Empty */ \"./src/objects/Empty.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar Scene = /** @class */ (function (_super) {\n    __extends(Scene, _super);\n    function Scene() {\n        return _super.call(this) || this;\n    }\n    return Scene;\n}(_Empty__WEBPACK_IMPORTED_MODULE_0__[\"Empty\"]));\n\n\n\n//# sourceURL=webpack:///./src/objects/Scene.ts?");

/***/ }),

/***/ "./src/renderers/Camera.ts":
/*!*********************************!*\
  !*** ./src/renderers/Camera.ts ***!
  \*********************************/
/*! exports provided: Camera */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Camera\", function() { return Camera; });\n/* harmony import */ var _objects_Empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../objects/Empty */ \"./src/objects/Empty.ts\");\n/* harmony import */ var _math_Mat4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Mat4 */ \"./src/math/Mat4.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar Camera = /** @class */ (function (_super) {\n    __extends(Camera, _super);\n    function Camera(fov, near, far, aspect) {\n        var _this = _super.call(this) || this;\n        _this.fov = fov;\n        _this.near = near;\n        _this.far = far;\n        _this.aspect = aspect;\n        _this.projectionMatrix = new _math_Mat4__WEBPACK_IMPORTED_MODULE_1__[\"Mat4\"]();\n        _this.modelMatrixInverse = new _math_Mat4__WEBPACK_IMPORTED_MODULE_1__[\"Mat4\"]();\n        return _this;\n    }\n    Camera.prototype.updateMatrix = function () {\n        _super.prototype.updateMatrix.call(this);\n        this.modelMatrixInverse.copy(this.modelMatrix.clone().inverse());\n        this.projectionMatrix.perspective(this.fov, this.aspect, this.near, this.far);\n    };\n    return Camera;\n}(_objects_Empty__WEBPACK_IMPORTED_MODULE_0__[\"Empty\"]));\n\n\n\n//# sourceURL=webpack:///./src/renderers/Camera.ts?");

/***/ }),

/***/ "./src/renderers/FrameBuffer.ts":
/*!**************************************!*\
  !*** ./src/renderers/FrameBuffer.ts ***!
  \**************************************/
/*! exports provided: FrameBuffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FrameBuffer\", function() { return FrameBuffer; });\n/* harmony import */ var _textures_Texture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../textures/Texture */ \"./src/textures/Texture.ts\");\n\nvar FrameBuffer = /** @class */ (function () {\n    function FrameBuffer(frameBufferParam) {\n        this.texture = new _textures_Texture__WEBPACK_IMPORTED_MODULE_0__[\"Texture\"](frameBufferParam);\n    }\n    Object.defineProperty(FrameBuffer.prototype, \"isFrameBuffer\", {\n        get: function () {\n            return true;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    return FrameBuffer;\n}());\n\n\n\n//# sourceURL=webpack:///./src/renderers/FrameBuffer.ts?");

/***/ }),

/***/ "./src/renderers/Material.ts":
/*!***********************************!*\
  !*** ./src/renderers/Material.ts ***!
  \***********************************/
/*! exports provided: Material */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Material\", function() { return Material; });\nvar Material = /** @class */ (function () {\n    function Material(param) {\n        this.needUpdate = true;\n        this.uniforms = param.uniforms;\n        this.frag = param.frag;\n        this.vert = param.vert;\n        this.culling = param.culling;\n        this.blendSrc = param.blendSrc;\n        this.blendDst = param.blendSrc;\n    }\n    return Material;\n}());\n\n\n\n//# sourceURL=webpack:///./src/renderers/Material.ts?");

/***/ }),

/***/ "./src/renderers/Renderer.ts":
/*!***********************************!*\
  !*** ./src/renderers/Renderer.ts ***!
  \***********************************/
/*! exports provided: Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Renderer\", function() { return Renderer; });\nvar Renderer = /** @class */ (function () {\n    function Renderer(param) {\n        // count \n        this.attributeCnt = 0;\n        this.textureCnt = 0;\n        console.log('GLパワーを見せつけろ');\n        this.initContext(param.canvas);\n        this.isRetina = param.retina || false;\n    }\n    Renderer.prototype.initContext = function (canvas) {\n        this._canvas = canvas;\n        this.gl = this._canvas.getContext('webgl');\n        this.gl.enable(this.gl.DEPTH_TEST);\n        this.gl.enable(this.gl.BLEND);\n    };\n    Renderer.prototype.setSize = function (width, height) {\n        this._canvas.width = width * (this.isRetina ? window.devicePixelRatio : 1);\n        this._canvas.height = height * (this.isRetina ? window.devicePixelRatio : 1);\n    };\n    Renderer.prototype.createProgram = function (obj) {\n        var mat = obj.material;\n        var prg = this.gl.createProgram();\n        var vs = this.createShader(mat.vert, this.gl.VERTEX_SHADER);\n        var fs = this.createShader(mat.frag, this.gl.FRAGMENT_SHADER);\n        this.gl.attachShader(prg, vs);\n        this.gl.attachShader(prg, fs);\n        this.gl.linkProgram(prg);\n        obj.program = prg;\n    };\n    Renderer.prototype.createShader = function (src, type) {\n        var shader = this.gl.createShader(type);\n        this.gl.shaderSource(shader, src);\n        this.gl.compileShader(shader);\n        if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {\n            return shader;\n        }\n        else {\n            return null;\n        }\n    };\n    Renderer.prototype.createAttributes = function (obj) {\n        var geo = obj.geometry;\n        var prg = obj.program;\n        var keys = Object.keys(geo.attributes);\n        for (var i = 0; i < keys.length; i++) {\n            var key = keys[i];\n            var attr = geo.attributes[key];\n            attr.location = this.gl.getAttribLocation(prg, key.toString());\n            attr.vbo = this.createBufferObject(attr.vertices, key == 'index');\n        }\n    };\n    Renderer.prototype.createBufferObject = function (vertices, isIndex) {\n        if (isIndex === void 0) { isIndex = false; }\n        var target = isIndex ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER;\n        var array = isIndex ? new Int16Array(vertices) : new Float32Array(vertices);\n        var vbo = this.gl.createBuffer();\n        this.gl.bindBuffer(target, vbo);\n        this.gl.bufferData(target, array, this.gl.STATIC_DRAW);\n        this.gl.bindBuffer(target, null);\n        return vbo;\n    };\n    Renderer.prototype.setAttributes = function (geo) {\n        this.clearAttributes();\n        var keys = Object.keys(geo.attributes);\n        this.attributeCnt = keys.length;\n        for (var i = 0; i < keys.length; i++) {\n            var key = keys[i];\n            var attr = geo.attributes[key];\n            if (key == 'index') {\n                this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, attr.vbo);\n            }\n            else {\n                if (attr.location !== -1) {\n                    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attr.vbo);\n                    this.gl.enableVertexAttribArray(attr.location);\n                    this.gl.vertexAttribPointer(attr.location, attr.stride, this.gl.FLOAT, false, 0, 0);\n                }\n            }\n        }\n    };\n    Renderer.prototype.clearAttributes = function () {\n        for (var i = 0; i < this.attributeCnt; i++) {\n            this.gl.disableVertexAttribArray(i);\n        }\n    };\n    Renderer.prototype.createUniforms = function (program, uniforms) {\n        if (!uniforms)\n            return;\n        var matUniKeys = Object.keys(uniforms);\n        for (var i = 0; i < matUniKeys.length; i++) {\n            var key = matUniKeys[i];\n            var uni = uniforms[key];\n            uni.location = this.gl.getUniformLocation(program, key.toString());\n        }\n    };\n    Renderer.prototype.applyUniforms = function (uniforms) {\n        if (!uniforms)\n            return;\n        var keys = Object.keys(uniforms);\n        for (var i = 0; i < keys.length; i++) {\n            var key = keys[i];\n            var uni = uniforms[key];\n            this.setUniform(uni.location, uni.value);\n        }\n    };\n    Renderer.prototype.setUniform = function (location, value) {\n        if (value == null)\n            return;\n        var type = 'uniform';\n        var input;\n        input = value;\n        if (typeof (value) == 'number') {\n            type += '1f';\n        }\n        else if ('isVec2' in value) {\n            type += '2fv';\n        }\n        else if ('isVec3' in value) {\n            type += '3fv';\n        }\n        else if ('isMat4' in value) {\n            type += 'Matrix4fv';\n            input = value.element;\n        }\n        else if ('isTexture' in value || 'isFrameBuffer' in value) {\n            var tex = void 0;\n            if ('isFrameBuffer' in value) {\n                tex = value.texture;\n            }\n            else {\n                tex = value;\n                if (tex.needUpdate == true) {\n                    this.createTexture(tex);\n                    tex.needUpdate = false;\n                }\n            }\n            tex.unitID = this.textureCnt;\n            this.gl.activeTexture(this.gl.TEXTURE0 + this.textureCnt++);\n            this.gl.bindTexture(this.gl.TEXTURE_2D, tex.webglTex);\n            input = tex.unitID;\n            type += '1i';\n        }\n        if (type) {\n            if (type == 'uniformMatrix4fv') {\n                this.gl[type](location, false, input);\n            }\n            else {\n                this.gl[type](location, input);\n            }\n        }\n    };\n    Renderer.prototype.createTexture = function (texture) {\n        var tex = this.gl.createTexture();\n        this.gl.bindTexture(this.gl.TEXTURE_2D, tex);\n        if (texture.image != null) {\n            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, texture.image);\n            this.gl.generateMipmap(this.gl.TEXTURE_2D);\n        }\n        else {\n            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, texture.width, texture.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);\n        }\n        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, texture.minFilter || this.gl.LINEAR);\n        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, texture.magFilter || this.gl.LINEAR);\n        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, texture.wrapS || this.gl.CLAMP_TO_EDGE);\n        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, texture.wrapT || this.gl.CLAMP_TO_EDGE);\n        this.gl.bindTexture(this.gl.TEXTURE_2D, null);\n        texture.webglTex = tex;\n    };\n    Renderer.prototype.renderObject = function (obj, camera) {\n        var mat = obj.material;\n        var geo = obj.geometry;\n        obj.updateMatrix();\n        obj.modelViewMatrix.copy(camera.modelMatrixInverse.clone().multiply(obj.modelMatrix));\n        obj.IndividualUniforms.projectionMatrix.value = camera.projectionMatrix;\n        if (!obj.program) {\n            this.createProgram(obj);\n            this.createUniforms(obj.program, mat.uniforms);\n            this.createUniforms(obj.program, obj.IndividualUniforms);\n            this.createAttributes(obj);\n        }\n        // curring\n        if (mat.culling) {\n            this.gl.enable(this.gl.CULL_FACE);\n            this.gl.frontFace(mat.culling);\n        }\n        else {\n            this.gl.disable(this.gl.CULL_FACE);\n        }\n        // blend\n        this.gl.blendFunc(mat.blendSrc || this.gl.SRC_ALPHA, mat.blendDst || this.gl.ONE_MINUS_SRC_ALPHA);\n        this.gl.useProgram(obj.program);\n        this.applyUniforms(mat.uniforms);\n        this.applyUniforms(obj.IndividualUniforms);\n        this.setAttributes(geo);\n        this.gl.drawElements(obj.drawType != null ? obj.drawType : this.gl.TRIANGLES, geo.attributes.index.vertices.length, this.gl.UNSIGNED_SHORT, 0);\n    };\n    Renderer.prototype.setFrameBuffer = function (frameBuffer) {\n        this.renderTarget = frameBuffer;\n        if (frameBuffer && !frameBuffer.buffer) {\n            this.createFrameBuffer(frameBuffer);\n        }\n        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, frameBuffer ? frameBuffer.buffer : null);\n    };\n    Renderer.prototype.createFrameBuffer = function (frameBuffer) {\n        var buffer = this.gl.createFramebuffer();\n        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, buffer);\n        var depthBuffer = this.gl.createRenderbuffer();\n        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, depthBuffer);\n        this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, frameBuffer.texture.width, frameBuffer.texture.height);\n        this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, depthBuffer);\n        if (frameBuffer.texture.webglTex == null) {\n            this.createTexture(frameBuffer.texture);\n        }\n        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, frameBuffer.texture.webglTex, 0);\n        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);\n        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);\n        frameBuffer.buffer = buffer;\n    };\n    Renderer.prototype.render = function (scene, camera) {\n        camera.updateMatrix();\n        this.textureCnt = 0;\n        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);\n        this.gl.clearDepth(1.0);\n        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);\n        if (this.renderTarget) {\n            this.gl.viewport(0, 0, this.renderTarget.texture.width, this.renderTarget.texture.height);\n        }\n        else {\n            this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);\n        }\n        for (var i = 0; i < scene.children.length; i++) {\n            var obj = scene.children[i];\n            if (obj.isRenderingObject) {\n                this.renderObject(obj, camera);\n            }\n        }\n        this.gl.flush();\n    };\n    return Renderer;\n}());\n\n\n\n//# sourceURL=webpack:///./src/renderers/Renderer.ts?");

/***/ }),

/***/ "./src/textures/Texture.ts":
/*!*********************************!*\
  !*** ./src/textures/Texture.ts ***!
  \*********************************/
/*! exports provided: Texture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Texture\", function() { return Texture; });\nvar Texture = /** @class */ (function () {\n    function Texture(param) {\n        this.needUpdate = true;\n        param = param || {};\n        this.wrapS = param.wrapS;\n        this.wrapT = param.wrapT;\n        this.magFilter = param.magFilter;\n        this.minFilter = param.magFilter;\n        this.width = param.width || 0;\n        this.height = param.height || 0;\n    }\n    Texture.prototype.loadImg = function (path, callBack) {\n        var _this = this;\n        var img = new Image();\n        img.src = path;\n        img.onload = function () {\n            _this.image = img;\n            _this.width = img.width;\n            _this.height = img.height;\n            _this.needUpdate = true;\n            if (callBack) {\n                callBack(_this);\n            }\n        };\n        return this;\n    };\n    Object.defineProperty(Texture.prototype, \"isTexture\", {\n        get: function () {\n            return true;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    return Texture;\n}());\n\n\n\n//# sourceURL=webpack:///./src/textures/Texture.ts?");

/***/ })

/******/ });