/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bird.js":
/*!*********************!*\
  !*** ./src/bird.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Bird)\n/* harmony export */ });\nconst CONSTANTS = {\n    GRAVITY: 0.8,\n    FLAP_SPEED: -8,\n    TERMIANL_VEL: 12,\n    BIRD_WIDTH: 40,\n    BIRD_HEIGHT: 30\n}\n\nclass Bird {\n    constructor(dimensions) {\n        this.vel = 0;\n        this.width = dimensions.width;\n        this.height = dimensions.height;\n        this.y = this.height/2;\n        this.x = Math.floor(this.width/3);\n        this.pos = [this.x, this.y];\n    }\n\n    drawBird(ctx) {\n        ctx.fillStyle = 'yellow';\n        ctx.fillRect(this.x, this.y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);\n    }\n\n    animate(ctx) {\n        this.move();\n        this.drawBird(ctx);\n    }\n\n    move() {\n        this.y += this.vel \n        this.vel += CONSTANTS.GRAVITY;\n    }   \n\n    flap() {\n        this.vel = -8\n    }\n}\n\n//# sourceURL=webpack:///./src/bird.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FlappyBird)\n/* harmony export */ });\n/* harmony import */ var _bird__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bird */ \"./src/bird.js\");\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n\n\n\nclass FlappyBird {\n  constructor(canvas){\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimensions = { width: canvas.width, height: canvas.height };\n    this.animate = this.animate.bind(this);\n    this.click = this.click.bind(this);\n    this.addClickListener();\n    this.restart();\n    // this.play();\n  }\n\n  animate() {\n    this.level.animate(this.ctx)\n    this.bird.animate(this.ctx)\n\n    if (this.running) {\n      requestAnimationFrame(this.animate)\n    }\n  }\n\n  restart() {\n    this.running = false;\n    this.level = new _level__WEBPACK_IMPORTED_MODULE_1__.default(this.dimensions);\n    this.bird = new _bird__WEBPACK_IMPORTED_MODULE_0__.default(this.dimensions);\n    this.animate();\n  }\n\n  play() {\n    this.running = true;\n    this.animate();\n  }\n\n  click() {\n    if (!this.running) {\n      this.play();\n    }\n    this.bird.flap();\n  }\n\n  addClickListener() {\n    this.ctx.canvas.addEventListener('mousedown', this.click)\n  }\n}\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const canvas = document.getElementById('bird-game');\n    const game = new _game__WEBPACK_IMPORTED_MODULE_0__.default(canvas);\n\n    // game.play();\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Level)\n/* harmony export */ });\nconst CONSTANTS = {\n  PIPE_SPEED: 2,\n  PIPE_SPACING: 220,\n  GAP: 150,\n  PIPE_WIDTH: 50\n}\n\nclass Level {\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n    const firstPipePosition = (this.dimensions.width/3) * 2\n    this.pipes = [\n      this.newPipe(firstPipePosition),\n      this.newPipe(firstPipePosition + CONSTANTS.PIPE_SPACING),\n      this.newPipe(firstPipePosition + (CONSTANTS.PIPE_SPACING *2))\n    ];\n  }\n\n  drawBackground(ctx) {\n    ctx.fillStyle = \"skyblue\";\n    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);\n  }\n\n  animate(ctx) {\n    this.drawBackground(ctx)\n    this.movePipes();\n    this.drawPipes(ctx);\n  }\n\n  newPipe(x) {\n    let heightRange = this.dimensions.height - CONSTANTS.GAP \n    let gapTop = (Math.random() * heightRange);\n    let pipe = {\n      topPipe: {\n        left: x, \n        right: CONSTANTS.PIPE_WIDTH + x,\n        top: 0,\n        bottom: gapTop\n      },\n      bottomPipe: {\n        left: x,\n        right: CONSTANTS.PIPE_WIDTH,\n        top: gapTop + CONSTANTS.GAP,\n        bottom: this.dimensions.height\n      }, \n      passed: false\n    }\n    return pipe\n  }\n\n  movePipes() {\n    this.eachPipe(pipe => {\n      pipe.topPipe.right -= CONSTANTS.PIPE_SPEED;\n      pipe.topPipe.left -= CONSTANTS.PIPE_SPEED;\n      pipe.bottomPipe.right -= CONSTANTS.PIPE_SPEED;\n      pipe.bottomPipe.left -= CONSTANTS.PIPE_SPEED;\n    })\n\n    if (this.pipes[0].topPipe.right <= 0) {\n      this.pipes.shift();\n      let x = this.pipes[this.pipes.length - 1].topPipe.left + CONSTANTS.PIPE_SPACING;\n      this.pipes.push(this.newPipe(x));\n    }\n  }\n\n  drawPipes(ctx) {\n    this.eachPipe(pipe => {\n      ctx.fillStyle = 'green';\n\n      ctx.fillRect(\n        pipe.topPipe.left, \n        pipe.topPipe.top,\n        CONSTANTS.PIPE_WIDTH,\n        pipe.topPipe.bottom - pipe.topPipe.top\n      )\n      \n      ctx.fillRect(\n        pipe.bottomPipe.left, \n        pipe.bottomPipe.top,\n        CONSTANTS.PIPE_WIDTH,\n        pipe.bottomPipe.bottom - pipe.bottomPipe.top\n      )\n    })\n    \n  }\n\n  eachPipe(callback) {\n    this.pipes.forEach(callback.bind(this))\n  }\n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;