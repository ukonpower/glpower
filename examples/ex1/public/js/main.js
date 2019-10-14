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
/******/ 	return __webpack_require__(__webpack_require__.s = "./examples/ex1/src/ts/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/ex1/src/ts/main.ts":
/*!*************************************!*\
  !*** ./examples/ex1/src/ts/main.ts ***!
  \*************************************/
/*! exports provided: APP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"APP\", function() { return APP; });\n/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../src */ \"./src/index.ts\");\n/* harmony import */ var _shaders_cube_vs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shaders/cube.vs */ \"./examples/ex1/src/ts/shaders/cube.vs\");\n/* harmony import */ var _shaders_cube_vs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_shaders_cube_vs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _shaders_cube_fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shaders/cube.fs */ \"./examples/ex1/src/ts/shaders/cube.fs\");\n/* harmony import */ var _shaders_cube_fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_shaders_cube_fs__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar APP = /** @class */ (function () {\n    function APP() {\n        this.renderer = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Renderer\"]({\n            canvas: document.querySelector('#canvas'),\n            retina: true\n        });\n        this.renderer.setSize(window.innerWidth, window.innerHeight);\n        this.initScene();\n        this.animate();\n    }\n    APP.prototype.initScene = function () {\n        this.scene = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]();\n        this.camera = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Camera\"]();\n        this.camera.position.z = 5;\n        var posArray = [\n            0.0, 1.0, 0.0,\n            1.0, -1.0, 0.0,\n            -1.0, -1.0, 0.0\n        ];\n        var indexArray = [\n            0, 1, 2\n        ];\n        var colorArray = [\n            1.0, 0.0, 0.0,\n            0.0, 1.0, 0.0,\n            0.0, 0.0, 1.0,\n        ];\n        var geo = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Geometry\"]();\n        geo.addAttributes('position', posArray, 3);\n        geo.addAttributes('index', indexArray, 1);\n        geo.addAttributes('color', colorArray, 3);\n        this.uni = {\n            time: {\n                value: 0\n            }\n        };\n        var mat = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Material\"]({\n            frag: _shaders_cube_fs__WEBPACK_IMPORTED_MODULE_2___default.a,\n            vert: _shaders_cube_vs__WEBPACK_IMPORTED_MODULE_1___default.a,\n            uniforms: this.uni\n        });\n        var mesh = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"](geo, mat);\n        this.scene.add(mesh);\n    };\n    APP.prototype.animate = function () {\n        this.uni.time.value += 1.0;\n        this.renderer.render(this.scene, this.camera);\n        requestAnimationFrame(this.animate.bind(this));\n    };\n    return APP;\n}());\n\nwindow.addEventListener('load', function () {\n    var app = new APP();\n});\n\n\n//# sourceURL=webpack:///./examples/ex1/src/ts/main.ts?");

/***/ }),

/***/ "./examples/ex1/src/ts/shaders/cube.fs":
/*!*********************************************!*\
  !*** ./examples/ex1/src/ts/shaders/cube.fs ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"precision highp float;\\r\\n\\r\\nvarying vec3 vColor;\\r\\n\\r\\nvoid main( void ){\\r\\n\\t\\r\\n\\tgl_FragColor = vec4( vColor, 1.0 );\\r\\n\\t\\r\\n}\"\n\n//# sourceURL=webpack:///./examples/ex1/src/ts/shaders/cube.fs?");

/***/ }),

/***/ "./examples/ex1/src/ts/shaders/cube.vs":
/*!*********************************************!*\
  !*** ./examples/ex1/src/ts/shaders/cube.vs ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"precision highp float;\\r\\n\\r\\nattribute vec3 position;\\r\\nattribute vec3 color;\\r\\n\\r\\nuniform float time;\\r\\n\\r\\nvarying vec3 vColor;\\r\\n\\r\\nvoid main( void ){\\r\\n\\t\\r\\n\\tgl_Position = vec4( position, 3.0 );\\r\\n\\r\\n\\tvColor = color;\\r\\n\\r\\n}\"\n\n//# sourceURL=webpack:///./examples/ex1/src/ts/shaders/cube.vs?");

/***/ }),

/***/ "./src/geometries/Geometry.ts":
/*!************************************!*\
  !*** ./src/geometries/Geometry.ts ***!
  \************************************/
/*! exports provided: Geometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Geometry\", function() { return Geometry; });\nvar Geometry = /** @class */ (function () {\n    function Geometry() {\n        this.attributes = {};\n    }\n    Geometry.prototype.addAttributes = function (name, array, stride) {\n        this.attributes[name] = {\n            vertices: array,\n            stride: stride,\n        };\n    };\n    return Geometry;\n}());\n\n\n\n//# sourceURL=webpack:///./src/geometries/Geometry.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: Renderer, Material, Camera, Geometry, Empty, Scene, Mesh, Vec2, Vec3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _renderers_Renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderers/Renderer */ \"./src/renderers/Renderer.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Renderer\", function() { return _renderers_Renderer__WEBPACK_IMPORTED_MODULE_0__[\"Renderer\"]; });\n\n/* harmony import */ var _renderers_Material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderers/Material */ \"./src/renderers/Material.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Material\", function() { return _renderers_Material__WEBPACK_IMPORTED_MODULE_1__[\"Material\"]; });\n\n/* harmony import */ var _renderers_Camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderers/Camera */ \"./src/renderers/Camera.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Camera\", function() { return _renderers_Camera__WEBPACK_IMPORTED_MODULE_2__[\"Camera\"]; });\n\n/* harmony import */ var _geometries_Geometry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./geometries/Geometry */ \"./src/geometries/Geometry.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Geometry\", function() { return _geometries_Geometry__WEBPACK_IMPORTED_MODULE_3__[\"Geometry\"]; });\n\n/* harmony import */ var _objects_Empty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./objects/Empty */ \"./src/objects/Empty.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Empty\", function() { return _objects_Empty__WEBPACK_IMPORTED_MODULE_4__[\"Empty\"]; });\n\n/* harmony import */ var _objects_Scene__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./objects/Scene */ \"./src/objects/Scene.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Scene\", function() { return _objects_Scene__WEBPACK_IMPORTED_MODULE_5__[\"Scene\"]; });\n\n/* harmony import */ var _objects_Mesh__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./objects/Mesh */ \"./src/objects/Mesh.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Mesh\", function() { return _objects_Mesh__WEBPACK_IMPORTED_MODULE_6__[\"Mesh\"]; });\n\n/* harmony import */ var _math_Vec2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./math/Vec2 */ \"./src/math/Vec2.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Vec2\", function() { return _math_Vec2__WEBPACK_IMPORTED_MODULE_7__[\"Vec2\"]; });\n\n/* harmony import */ var _math_Vec3__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./math/Vec3 */ \"./src/math/Vec3.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Vec3\", function() { return _math_Vec3__WEBPACK_IMPORTED_MODULE_8__[\"Vec3\"]; });\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.ts?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Vec3\", function() { return Vec3; });\nvar Vec3 = /** @class */ (function () {\n    function Vec3(x, y, z) {\n        this.x = x || 0;\n        this.y = y || 0;\n        this.z = z || 0;\n    }\n    Object.defineProperty(Vec3.prototype, \"isVec3\", {\n        get: function () {\n            return true;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Vec3.prototype.add = function (a) {\n        if (a.isVec3) {\n            this.x += a.x;\n            this.y += a.y;\n            this.z += a.z;\n        }\n        else if (typeof (a) == 'number') {\n            this.x += a;\n            this.y += a;\n            this.z += a;\n        }\n        return this;\n    };\n    Vec3.prototype.sub = function (a) {\n        if (a.isVec3) {\n            this.x -= a.x;\n            this.y -= a.y;\n            this.z -= a.z;\n        }\n        else if (typeof (a) == 'number') {\n            this.x -= a;\n            this.y -= a;\n            this.z -= a;\n        }\n        return this;\n    };\n    Vec3.prototype.multiply = function (a) {\n        if (a.isVec3) {\n            this.x *= a.x;\n            this.y *= a.y;\n            this.z *= a.z;\n        }\n        else if (typeof (a) == 'number') {\n            this.x *= a;\n            this.y *= a;\n            this.z *= a;\n        }\n        return this;\n    };\n    return Vec3;\n}());\n\n\n\n//# sourceURL=webpack:///./src/math/Vec3.ts?");

/***/ }),

/***/ "./src/objects/Empty.ts":
/*!******************************!*\
  !*** ./src/objects/Empty.ts ***!
  \******************************/
/*! exports provided: Empty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Empty\", function() { return Empty; });\n/* harmony import */ var _math_Vec3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vec3 */ \"./src/math/Vec3.ts\");\n\nvar Empty = /** @class */ (function () {\n    function Empty() {\n        this.children = [];\n        this.position = new _math_Vec3__WEBPACK_IMPORTED_MODULE_0__[\"Vec3\"]();\n        this.rotation = new _math_Vec3__WEBPACK_IMPORTED_MODULE_0__[\"Vec3\"]();\n    }\n    Empty.prototype.add = function (obj) {\n        this.children.push(obj);\n    };\n    return Empty;\n}());\n\n\n\n//# sourceURL=webpack:///./src/objects/Empty.ts?");

/***/ }),

/***/ "./src/objects/Mesh.ts":
/*!*****************************!*\
  !*** ./src/objects/Mesh.ts ***!
  \*****************************/
/*! exports provided: Mesh */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Mesh\", function() { return Mesh; });\n/* harmony import */ var _Empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Empty */ \"./src/objects/Empty.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar Mesh = /** @class */ (function (_super) {\n    __extends(Mesh, _super);\n    function Mesh(geometry, material) {\n        var _this = _super.call(this) || this;\n        _this.geometry = geometry;\n        _this.material = material;\n        return _this;\n    }\n    Object.defineProperty(Mesh.prototype, \"isMesh\", {\n        get: function () {\n            return true;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    return Mesh;\n}(_Empty__WEBPACK_IMPORTED_MODULE_0__[\"Empty\"]));\n\n\n\n//# sourceURL=webpack:///./src/objects/Mesh.ts?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Camera\", function() { return Camera; });\n/* harmony import */ var _objects_Empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../objects/Empty */ \"./src/objects/Empty.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar Camera = /** @class */ (function (_super) {\n    __extends(Camera, _super);\n    function Camera() {\n        return _super.call(this) || this;\n    }\n    return Camera;\n}(_objects_Empty__WEBPACK_IMPORTED_MODULE_0__[\"Empty\"]));\n\n\n\n//# sourceURL=webpack:///./src/renderers/Camera.ts?");

/***/ }),

/***/ "./src/renderers/Material.ts":
/*!***********************************!*\
  !*** ./src/renderers/Material.ts ***!
  \***********************************/
/*! exports provided: Material */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Material\", function() { return Material; });\nvar Material = /** @class */ (function () {\n    function Material(param) {\n        this.uniforms = param.uniforms;\n        this.frag = param.frag;\n        this.vert = param.vert;\n    }\n    return Material;\n}());\n\n\n\n//# sourceURL=webpack:///./src/renderers/Material.ts?");

/***/ }),

/***/ "./src/renderers/Renderer.ts":
/*!***********************************!*\
  !*** ./src/renderers/Renderer.ts ***!
  \***********************************/
/*! exports provided: Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Renderer\", function() { return Renderer; });\nvar Renderer = /** @class */ (function () {\n    function Renderer(param) {\n        console.log('GLパワーをみせつけろ');\n        this._canvas = param.canvas;\n        this._gl = this._canvas.getContext('webgl');\n        this.isRetina = param.retina || false;\n    }\n    Renderer.prototype.setSize = function (width, height) {\n        this._canvas.width = width * (this.isRetina ? window.devicePixelRatio : 1);\n        this._canvas.height = height * (this.isRetina ? window.devicePixelRatio : 1);\n        this._gl.viewport(0, 0, this._gl.canvas.width, this._gl.canvas.height);\n    };\n    Renderer.prototype.createProgram = function (mat) {\n        var prg = this._gl.createProgram();\n        var vs = this.createShader(mat.vert, this._gl.VERTEX_SHADER);\n        var fs = this.createShader(mat.frag, this._gl.FRAGMENT_SHADER);\n        this._gl.attachShader(prg, vs);\n        this._gl.attachShader(prg, fs);\n        this._gl.linkProgram(prg);\n        mat.program = prg;\n    };\n    Renderer.prototype.createShader = function (src, type) {\n        var shader = this._gl.createShader(type);\n        this._gl.shaderSource(shader, src);\n        this._gl.compileShader(shader);\n        if (this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {\n            return shader;\n        }\n        else {\n            console.warn(this._gl.getShaderInfoLog(shader));\n            return null;\n        }\n    };\n    Renderer.prototype.createAttributes = function (mat, geo) {\n        var prg = mat.program;\n        var keys = Object.keys(geo.attributes);\n        for (var i = 0; i < keys.length; i++) {\n            var key = keys[i];\n            var attr = geo.attributes[key];\n            attr.location = this._gl.getAttribLocation(prg, key.toString());\n            attr.vbo = this.createBufferObject(attr.vertices, key == 'index');\n        }\n    };\n    Renderer.prototype.createBufferObject = function (vertices, isIndex) {\n        if (isIndex === void 0) { isIndex = false; }\n        var vbo = this._gl.createBuffer();\n        var target = isIndex ? this._gl.ELEMENT_ARRAY_BUFFER : this._gl.ARRAY_BUFFER;\n        var array = isIndex ? new Int16Array(vertices) : new Float32Array(vertices);\n        this._gl.bindBuffer(target, vbo);\n        this._gl.bufferData(target, array, this._gl.STATIC_DRAW);\n        this._gl.bindBuffer(target, null);\n        return vbo;\n    };\n    Renderer.prototype.setAttributes = function (geo) {\n        var keys = Object.keys(geo.attributes);\n        for (var i = 0; i < keys.length; i++) {\n            var key = keys[i];\n            var attr = geo.attributes[key];\n            if (key == 'index') {\n                this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, attr.vbo);\n            }\n            else {\n                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, attr.vbo);\n                this._gl.enableVertexAttribArray(attr.location);\n                this._gl.vertexAttribPointer(attr.location, attr.stride, this._gl.FLOAT, false, 0, 0);\n            }\n        }\n    };\n    Renderer.prototype.createUniforms = function (mat) {\n        var keys = Object.keys(mat.uniforms);\n        for (var i = 0; i < keys.length; i++) {\n            var key = keys[i];\n            var uni = mat.uniforms[key];\n            uni.location = this._gl.getUniformLocation(mat.program, key.toString());\n        }\n    };\n    Renderer.prototype.setUniforms = function (mat) {\n        var keys = Object.keys(mat.uniforms);\n        for (var i = 0; i < keys.length; i++) {\n            var key = keys[i];\n            var uni = mat.uniforms[key];\n            var value = uni.value;\n            var type = '';\n            if (typeof (value) == 'number') {\n                type = 'uniform1f';\n            }\n            else if (value.isVec2) {\n                type = 'uniform2fv';\n            }\n            else if (value.isVec3) {\n                type = 'uniform3fv';\n            }\n            this._gl[type](uni.location, value);\n        }\n    };\n    Renderer.prototype.drawMesh = function (obj) {\n        var mat = obj.material;\n        var geo = obj.geometry;\n        if (!mat.program) {\n            this.createProgram(mat);\n            this.createAttributes(mat, geo);\n            this.createUniforms(mat);\n        }\n        this._gl.useProgram(mat.program);\n        this.setAttributes(geo);\n        this.setUniforms(mat);\n        this._gl.clear(this._gl.COLOR_BUFFER_BIT);\n        this._gl.drawElements(this._gl.TRIANGLES, geo.attributes.index.vertices.length, this._gl.UNSIGNED_SHORT, 0);\n        this._gl.flush();\n    };\n    Renderer.prototype.render = function (scene, cmaera) {\n        for (var i = 0; i < scene.children.length; i++) {\n            var obj = scene.children[i];\n            if (obj.isMesh) {\n                this.drawMesh(obj);\n            }\n        }\n    };\n    return Renderer;\n}());\n\n\n\n//# sourceURL=webpack:///./src/renderers/Renderer.ts?");

/***/ })

/******/ });