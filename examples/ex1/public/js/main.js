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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"APP\", function() { return APP; });\n/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../src */ \"./src/index.ts\");\n/* harmony import */ var _shaders_cube_vs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shaders/cube.vs */ \"./examples/ex1/src/ts/shaders/cube.vs\");\n/* harmony import */ var _shaders_cube_vs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_shaders_cube_vs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _shaders_cube_fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shaders/cube.fs */ \"./examples/ex1/src/ts/shaders/cube.fs\");\n/* harmony import */ var _shaders_cube_fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_shaders_cube_fs__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar APP = /** @class */ (function () {\n    function APP() {\n        this.meshes = [];\n        this.renderer = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Renderer\"]({\n            canvas: document.querySelector('#canvas'),\n            retina: true\n        });\n        this.renderer.setSize(window.innerWidth, window.innerHeight);\n        this.initScene();\n        this.animate();\n        window.addEventListener('resize', this.resize.bind(this));\n    }\n    APP.prototype.initScene = function () {\n        this.scene = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]();\n        this.camera = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Camera\"](50, 0.1, 1000);\n        this.camera.position.set(0, 0, 5);\n        // this.camera.rotation.set( 1.0, 0, 0 );\n        var posArray = [\n            0.0, 0.5, 0.0,\n            0.5, -0.5, 0.0,\n            -0.5, -0.5, 0.0\n        ];\n        var indexArray = [\n            0, 1, 2\n        ];\n        var colorArray = [\n            1.0, 0.0, 0.0,\n            0.0, 1.0, 0.0,\n            0.0, 0.0, 1.0,\n        ];\n        var geo = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Geometry\"]();\n        geo.addAttributes('position', posArray, 3);\n        geo.addAttributes('index', indexArray, 1);\n        geo.addAttributes('color', colorArray, 3);\n        this.uni = {\n            time: {\n                value: 0\n            }\n        };\n        var mat = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Material\"]({\n            frag: _shaders_cube_fs__WEBPACK_IMPORTED_MODULE_2___default.a,\n            vert: _shaders_cube_vs__WEBPACK_IMPORTED_MODULE_1___default.a,\n            uniforms: this.uni\n        });\n        this.meshes.push(new _src__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"](geo, mat));\n        this.meshes[0].rotation.set(0, 0, 0);\n        this.meshes[0].scale.set(1, 1, 1);\n        this.scene.add(this.meshes[0]);\n        this.meshes.push(new _src__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"](geo, mat));\n        this.meshes[1].position.set(0, 0, 0);\n        this.scene.add(this.meshes[1]);\n    };\n    APP.prototype.animate = function () {\n        this.uni.time.value += 1.0;\n        this.meshes[0].rotation.y = this.uni.time.value * 0.02;\n        this.meshes[1].rotation.y = this.uni.time.value * 0.02 + Math.PI / 2;\n        this.renderer.render(this.scene, this.camera);\n        requestAnimationFrame(this.animate.bind(this));\n    };\n    APP.prototype.resize = function () {\n        this.renderer.setSize(window.innerWidth, window.innerHeight);\n    };\n    return APP;\n}());\n\nwindow.addEventListener('load', function () {\n    var app = new APP();\n});\n\n\n//# sourceURL=webpack:///./examples/ex1/src/ts/main.ts?");

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

eval("module.exports = \"precision highp float;\\r\\n\\r\\nattribute vec3 position;\\r\\nattribute vec3 color;\\r\\n\\r\\nuniform float time;\\r\\nuniform mat4 modelViewMatrix;\\r\\nuniform mat4 projectionMatrix;\\r\\n\\r\\nvarying vec3 vColor;\\r\\n\\r\\nvoid main( void ){\\r\\n\\t\\r\\n\\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\\r\\n    gl_Position = projectionMatrix * mvPosition;\\r\\n\\r\\n\\tvColor = color;\\r\\n\\r\\n}\"\n\n//# sourceURL=webpack:///./examples/ex1/src/ts/shaders/cube.vs?");

/***/ }),

/***/ "./src/geometries/Geometry.ts":
/*!************************************!*\
  !*** ./src/geometries/Geometry.ts ***!
  \************************************/
/*! exports provided: Geometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Geometry\", function() { return Geometry; });\nvar Geometry = /** @class */ (function () {\n    function Geometry() {\n        this.attributes = {};\n    }\n    Geometry.prototype.clone = function () {\n        var geo = new Geometry();\n        var keys = Object.keys(this.attributes);\n        for (var i = 0; i < keys.length; i++) {\n            var attr = this.attributes[keys[i]];\n            geo.addAttributes(keys[i], attr.vertices, attr.stride);\n        }\n        return geo;\n    };\n    Geometry.prototype.addAttributes = function (name, vertices, stride) {\n        this.attributes[name] = {\n            vertices: vertices,\n            stride: stride,\n        };\n    };\n    return Geometry;\n}());\n\n\n\n//# sourceURL=webpack:///./src/geometries/Geometry.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: Material, Camera, Geometry, Empty, Scene, Mesh, Vec2, Vec3, Mat4, Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _renderers_Renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderers/Renderer */ \"./src/renderers/Renderer.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Renderer\", function() { return _renderers_Renderer__WEBPACK_IMPORTED_MODULE_0__[\"Renderer\"]; });\n\n/* harmony import */ var _renderers_Material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderers/Material */ \"./src/renderers/Material.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Material\", function() { return _renderers_Material__WEBPACK_IMPORTED_MODULE_1__[\"Material\"]; });\n\n/* harmony import */ var _renderers_Camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderers/Camera */ \"./src/renderers/Camera.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Camera\", function() { return _renderers_Camera__WEBPACK_IMPORTED_MODULE_2__[\"Camera\"]; });\n\n/* harmony import */ var _geometries_Geometry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./geometries/Geometry */ \"./src/geometries/Geometry.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Geometry\", function() { return _geometries_Geometry__WEBPACK_IMPORTED_MODULE_3__[\"Geometry\"]; });\n\n/* harmony import */ var _objects_Empty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./objects/Empty */ \"./src/objects/Empty.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Empty\", function() { return _objects_Empty__WEBPACK_IMPORTED_MODULE_4__[\"Empty\"]; });\n\n/* harmony import */ var _objects_Scene__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./objects/Scene */ \"./src/objects/Scene.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Scene\", function() { return _objects_Scene__WEBPACK_IMPORTED_MODULE_5__[\"Scene\"]; });\n\n/* harmony import */ var _objects_Mesh__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./objects/Mesh */ \"./src/objects/Mesh.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Mesh\", function() { return _objects_Mesh__WEBPACK_IMPORTED_MODULE_6__[\"Mesh\"]; });\n\n/* harmony import */ var _math_Vec2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./math/Vec2 */ \"./src/math/Vec2.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Vec2\", function() { return _math_Vec2__WEBPACK_IMPORTED_MODULE_7__[\"Vec2\"]; });\n\n/* harmony import */ var _math_Vec3__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./math/Vec3 */ \"./src/math/Vec3.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Vec3\", function() { return _math_Vec3__WEBPACK_IMPORTED_MODULE_8__[\"Vec3\"]; });\n\n/* harmony import */ var _math_Mat4__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./math/Mat4 */ \"./src/math/Mat4.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Mat4\", function() { return _math_Mat4__WEBPACK_IMPORTED_MODULE_9__[\"Mat4\"]; });\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.ts?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Empty\", function() { return Empty; });\n/* harmony import */ var _math_Vec3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vec3 */ \"./src/math/Vec3.ts\");\n/* harmony import */ var _math_Mat4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Mat4 */ \"./src/math/Mat4.ts\");\n\n\nvar Empty = /** @class */ (function () {\n    function Empty() {\n        this.children = [];\n        this.modelMatrix = new _math_Mat4__WEBPACK_IMPORTED_MODULE_1__[\"Mat4\"]();\n        this.modelViewMatrix = new _math_Mat4__WEBPACK_IMPORTED_MODULE_1__[\"Mat4\"]();\n        this.position = new _math_Vec3__WEBPACK_IMPORTED_MODULE_0__[\"Vec3\"]();\n        this.rotation = new _math_Vec3__WEBPACK_IMPORTED_MODULE_0__[\"Vec3\"]();\n        this.scale = new _math_Vec3__WEBPACK_IMPORTED_MODULE_0__[\"Vec3\"](1, 1, 1);\n    }\n    Empty.prototype.add = function (obj) {\n        this.children.push(obj);\n    };\n    Empty.prototype.updateMatrix = function () {\n        this.modelMatrix.createTransformMatrix(this.position, this.rotation, this.scale);\n    };\n    return Empty;\n}());\n\n\n\n//# sourceURL=webpack:///./src/objects/Empty.ts?");

/***/ }),

/***/ "./src/objects/Mesh.ts":
/*!*****************************!*\
  !*** ./src/objects/Mesh.ts ***!
  \*****************************/
/*! exports provided: Mesh */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Mesh\", function() { return Mesh; });\n/* harmony import */ var _Empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Empty */ \"./src/objects/Empty.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar Mesh = /** @class */ (function (_super) {\n    __extends(Mesh, _super);\n    function Mesh(geometry, material) {\n        var _this = _super.call(this) || this;\n        _this.geometry = geometry;\n        _this.material = material;\n        _this.IndividualUniforms = {\n            modelViewMatrix: {\n                value: _this.modelViewMatrix\n            },\n            projectionMatrix: {\n                value: null\n            }\n        };\n        return _this;\n    }\n    Object.defineProperty(Mesh.prototype, \"isMesh\", {\n        get: function () {\n            return true;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    return Mesh;\n}(_Empty__WEBPACK_IMPORTED_MODULE_0__[\"Empty\"]));\n\n\n\n//# sourceURL=webpack:///./src/objects/Mesh.ts?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Camera\", function() { return Camera; });\n/* harmony import */ var _objects_Empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../objects/Empty */ \"./src/objects/Empty.ts\");\n/* harmony import */ var _math_Mat4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Mat4 */ \"./src/math/Mat4.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar Camera = /** @class */ (function (_super) {\n    __extends(Camera, _super);\n    function Camera(fov, near, far) {\n        var _this = _super.call(this) || this;\n        _this.fov = fov;\n        _this.near = near;\n        _this.far = far;\n        _this.projectionMatrix = new _math_Mat4__WEBPACK_IMPORTED_MODULE_1__[\"Mat4\"]();\n        _this.modelMatrixInverse = new _math_Mat4__WEBPACK_IMPORTED_MODULE_1__[\"Mat4\"]();\n        return _this;\n    }\n    Camera.prototype.updateMatrix = function () {\n        _super.prototype.updateMatrix.call(this);\n        this.modelMatrixInverse.copy(this.modelMatrix.clone().inverse());\n        this.projectionMatrix.perspective(this.fov, window.innerWidth / window.innerHeight, this.near, this.far);\n    };\n    return Camera;\n}(_objects_Empty__WEBPACK_IMPORTED_MODULE_0__[\"Empty\"]));\n\n\n\n//# sourceURL=webpack:///./src/renderers/Camera.ts?");

/***/ }),

/***/ "./src/renderers/Material.ts":
/*!***********************************!*\
  !*** ./src/renderers/Material.ts ***!
  \***********************************/
/*! exports provided: Material */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Material\", function() { return Material; });\nvar Material = /** @class */ (function () {\n    function Material(param) {\n        this.uniforms = param.uniforms;\n        this.frag = param.frag;\n        this.vert = param.vert;\n    }\n    Material.prototype.clone = function () {\n        var uni = {};\n        var uniKeys = Object.keys(this.uniforms);\n        for (var i = 0; i < uniKeys.length; i++) {\n            var key = uniKeys[i];\n            uni[key] = {\n                value: this.uniforms.key.value\n            };\n        }\n        return new Material({\n            vert: this.vert,\n            frag: this.frag,\n            uniforms: uni\n        });\n    };\n    return Material;\n}());\n\n\n\n//# sourceURL=webpack:///./src/renderers/Material.ts?");

/***/ }),

/***/ "./src/renderers/Renderer.ts":
/*!***********************************!*\
  !*** ./src/renderers/Renderer.ts ***!
  \***********************************/
/*! exports provided: Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Renderer\", function() { return Renderer; });\nvar Renderer = /** @class */ (function () {\n    function Renderer(param) {\n        console.log(\"%c- GLパワーをみせつけろ \" + \" -\", 'padding: 5px 10px ;background-color: black; color: white;font-size:11px');\n        this._canvas = param.canvas;\n        this._gl = this._canvas.getContext('webgl');\n        this.isRetina = param.retina || false;\n    }\n    Renderer.prototype.setSize = function (width, height) {\n        this._canvas.width = width * (this.isRetina ? window.devicePixelRatio : 1);\n        this._canvas.height = height * (this.isRetina ? window.devicePixelRatio : 1);\n        this._gl.viewport(0, 0, this._gl.canvas.width, this._gl.canvas.height);\n    };\n    Renderer.prototype.createProgram = function (obj) {\n        var mat = obj.material;\n        var prg = this._gl.createProgram();\n        var vs = this.createShader(mat.vert, this._gl.VERTEX_SHADER);\n        var fs = this.createShader(mat.frag, this._gl.FRAGMENT_SHADER);\n        this._gl.attachShader(prg, vs);\n        this._gl.attachShader(prg, fs);\n        this._gl.linkProgram(prg);\n        obj.program = prg;\n    };\n    Renderer.prototype.createShader = function (src, type) {\n        var shader = this._gl.createShader(type);\n        this._gl.shaderSource(shader, src);\n        this._gl.compileShader(shader);\n        if (this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {\n            return shader;\n        }\n        else {\n            console.warn(this._gl.getShaderInfoLog(shader));\n            return null;\n        }\n    };\n    Renderer.prototype.createAttributes = function (obj) {\n        var mat = obj.material;\n        var geo = obj.geometry;\n        var prg = obj.program;\n        var keys = Object.keys(geo.attributes);\n        for (var i = 0; i < keys.length; i++) {\n            var key = keys[i];\n            var attr = geo.attributes[key];\n            attr.location = this._gl.getAttribLocation(prg, key.toString());\n            attr.vbo = this.createBufferObject(attr.vertices, key == 'index');\n        }\n    };\n    Renderer.prototype.createBufferObject = function (vertices, isIndex) {\n        if (isIndex === void 0) { isIndex = false; }\n        var vbo = this._gl.createBuffer();\n        var target = isIndex ? this._gl.ELEMENT_ARRAY_BUFFER : this._gl.ARRAY_BUFFER;\n        var array = isIndex ? new Int16Array(vertices) : new Float32Array(vertices);\n        this._gl.bindBuffer(target, vbo);\n        this._gl.bufferData(target, array, this._gl.STATIC_DRAW);\n        this._gl.bindBuffer(target, null);\n        return vbo;\n    };\n    Renderer.prototype.setAttributes = function (geo) {\n        var keys = Object.keys(geo.attributes);\n        for (var i = 0; i < keys.length; i++) {\n            var key = keys[i];\n            var attr = geo.attributes[key];\n            if (key == 'index') {\n                this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, attr.vbo);\n            }\n            else {\n                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, attr.vbo);\n                this._gl.enableVertexAttribArray(attr.location);\n                this._gl.vertexAttribPointer(attr.location, attr.stride, this._gl.FLOAT, false, 0, 0);\n            }\n        }\n    };\n    Renderer.prototype.createUniforms = function (program, uniforms) {\n        var matUniKeys = Object.keys(uniforms);\n        for (var i = 0; i < matUniKeys.length; i++) {\n            var key = matUniKeys[i];\n            var uni = uniforms[key];\n            uni.location = this._gl.getUniformLocation(program, key.toString());\n        }\n    };\n    Renderer.prototype.applyUniforms = function (uniforms) {\n        var keys = Object.keys(uniforms);\n        for (var i = 0; i < keys.length; i++) {\n            var key = keys[i];\n            var uni = uniforms[key];\n            if (!uni.value)\n                continue;\n            this.setUniform(uni.location, uni.value);\n        }\n    };\n    Renderer.prototype.setUniform = function (location, value) {\n        var type;\n        var isMat = false;\n        if (typeof (value) == 'number') {\n            type = 'uniform1f';\n        }\n        else if (value.isVec2) {\n            type = 'uniform2fv';\n        }\n        else if (value.isVec3) {\n            type = 'uniform3fv';\n        }\n        else if (value.isMat4) {\n            type = 'uniformMatrix4fv';\n            value = value.element;\n            isMat = true;\n        }\n        if (type) {\n            if (isMat) {\n                this._gl[type](location, false, value);\n            }\n            else {\n                this._gl[type](location, value);\n            }\n        }\n    };\n    Renderer.prototype.renderObject = function (obj, camera) {\n        var mat = obj.material;\n        var geo = obj.geometry;\n        obj.updateMatrix();\n        obj.modelViewMatrix.copy(camera.modelMatrixInverse.clone().multiply(obj.modelMatrix));\n        obj.IndividualUniforms.projectionMatrix.value = camera.projectionMatrix;\n        if (!obj.program) {\n            this.createProgram(obj);\n            this.createUniforms(obj.program, mat.uniforms);\n            this.createUniforms(obj.program, obj.IndividualUniforms);\n            this.createAttributes(obj);\n            this.setAttributes(geo);\n        }\n        this._gl.useProgram(obj.program);\n        this.applyUniforms(mat.uniforms);\n        this.applyUniforms(obj.IndividualUniforms);\n        this._gl.drawElements(this._gl.TRIANGLES, geo.attributes.index.vertices.length, this._gl.UNSIGNED_SHORT, 0);\n    };\n    Renderer.prototype.render = function (scene, camera) {\n        camera.updateMatrix();\n        this._gl.clear(this._gl.COLOR_BUFFER_BIT);\n        for (var i = 0; i < scene.children.length; i++) {\n            var obj = scene.children[i];\n            if (obj.isMesh) {\n                this.renderObject(obj, camera);\n            }\n        }\n        this._gl.flush();\n    };\n    return Renderer;\n}());\n\n\n\n//# sourceURL=webpack:///./src/renderers/Renderer.ts?");

/***/ })

/******/ });