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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"APP\", function() { return APP; });\n/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../src */ \"./src/index.ts\");\n\nvar APP = /** @class */ (function () {\n    function APP() {\n        this.renderer = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Renderer\"]({\n            canvas: document.querySelector('#canvas')\n        });\n    }\n    return APP;\n}());\n\nwindow.addEventListener('load', function () {\n    var app = new APP();\n});\n\n\n//# sourceURL=webpack:///./examples/ex1/src/ts/main.ts?");

/***/ }),

/***/ "./src/core/Geometry.ts":
/*!******************************!*\
  !*** ./src/core/Geometry.ts ***!
  \******************************/
/*! exports provided: Geometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Geometry\", function() { return Geometry; });\nvar Geometry = /** @class */ (function () {\n    function Geometry() {\n    }\n    return Geometry;\n}());\n\n\n\n//# sourceURL=webpack:///./src/core/Geometry.ts?");

/***/ }),

/***/ "./src/core/Material.ts":
/*!******************************!*\
  !*** ./src/core/Material.ts ***!
  \******************************/
/*! exports provided: Material */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Material\", function() { return Material; });\nvar Material = /** @class */ (function () {\n    function Material(param) {\n        this.uniforms = param.uniforms;\n        this.frag = param.frag;\n        this.vert = param.vert;\n    }\n    return Material;\n}());\n\n\n\n//# sourceURL=webpack:///./src/core/Material.ts?");

/***/ }),

/***/ "./src/core/Mesh.ts":
/*!**************************!*\
  !*** ./src/core/Mesh.ts ***!
  \**************************/
/*! exports provided: Mesh */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Mesh\", function() { return Mesh; });\nvar Mesh = /** @class */ (function () {\n    function Mesh(geometry, material) {\n        this.geometry = geometry;\n        this.material = material;\n    }\n    return Mesh;\n}());\n\n\n\n//# sourceURL=webpack:///./src/core/Mesh.ts?");

/***/ }),

/***/ "./src/core/Renderer.ts":
/*!******************************!*\
  !*** ./src/core/Renderer.ts ***!
  \******************************/
/*! exports provided: Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Renderer\", function() { return Renderer; });\nvar Renderer = /** @class */ (function () {\n    function Renderer(param) {\n        console.log('glpower');\n        this._canvas = param.canvas;\n        this._gl = this._canvas.getContext('webgl');\n    }\n    Renderer.prototype.createProgram = function (mat) {\n        var prg = this._gl.createProgram();\n        var vs = this.createShader(mat.vert, this._gl.VERTEX_SHADER);\n        var fs = this.createShader(mat.frag, this._gl.FRAGMENT_SHADER);\n        this._gl.attachShader(prg, vs);\n        this._gl.attachShader(prg, fs);\n        this._gl.linkProgram(prg);\n    };\n    Renderer.prototype.createShader = function (src, type) {\n        var shader = this._gl.createShader(type);\n        this._gl.shaderSource(shader, src);\n        this._gl.compileShader(shader);\n        if (this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {\n            return shader;\n        }\n        else {\n            console.warn(this._gl.getShaderInfoLog(shader));\n            return null;\n        }\n    };\n    Renderer.prototype.render = function () {\n    };\n    return Renderer;\n}());\n\n\n\n//# sourceURL=webpack:///./src/core/Renderer.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: Geometry, Material, Mesh, Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_Geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Geometry */ \"./src/core/Geometry.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Geometry\", function() { return _core_Geometry__WEBPACK_IMPORTED_MODULE_0__[\"Geometry\"]; });\n\n/* harmony import */ var _core_Renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/Renderer */ \"./src/core/Renderer.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Renderer\", function() { return _core_Renderer__WEBPACK_IMPORTED_MODULE_1__[\"Renderer\"]; });\n\n/* harmony import */ var _core_Material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/Material */ \"./src/core/Material.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Material\", function() { return _core_Material__WEBPACK_IMPORTED_MODULE_2__[\"Material\"]; });\n\n/* harmony import */ var _core_Mesh__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/Mesh */ \"./src/core/Mesh.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Mesh\", function() { return _core_Mesh__WEBPACK_IMPORTED_MODULE_3__[\"Mesh\"]; });\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });