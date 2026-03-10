(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("UI"), require("SolidLogic"), require("$rdf"));
	else if(typeof define === 'function' && define.amd)
		define(["UI", "SolidLogic", "$rdf"], factory);
	else if(typeof exports === 'object')
		exports["IssuePane"] = factory(require("UI"), require("SolidLogic"), require("$rdf"));
	else
		root["IssuePane"] = factory(root["UI"], root["SolidLogic"], root["$rdf"]);
})(this, (__WEBPACK_EXTERNAL_MODULE__426__, __WEBPACK_EXTERNAL_MODULE__663__, __WEBPACK_EXTERNAL_MODULE__264__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 691
(module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.trackerBoard {
  width: fit-content;
  border-collapse: collapse;
  margin: 1em;
}

.trackerBoardTable {
  width: fit-content;
  border-collapse: collapse;
}

.trackerBoardHeader {
  margin: var(--spacing-sm);
  padding: var(--spacing-sm) 1em;
  font-weight: bold;
  font-size: 120%;
}

.trackerBoardColumn {
  border: 0.01em solid white;
  padding: 0.1em;
  /* display: flex; flex-direction: column; align-items: center; */
} 

.trackerBoardHeaderCell {
  margin: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  font-weight: bold;
  font-size: 120%;
}

.trackerBoardCard {
  width: 100%;
  border: 0.01em solid grey;
  border-radius: var(--border-radius-base);
  padding: var(--spacing-sm);
  margin: var(--spacing-sm) 0;
}

.trackerBoardCardTable {
  margin: var(--spacing-md);
} 
`, "",{"version":3,"sources":["webpack://./src/styles/board.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,yBAAyB;EACzB,WAAW;AACb;;AAEA;EACE,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;EACzB,8BAA8B;EAC9B,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,0BAA0B;EAC1B,cAAc;EACd,gEAAgE;AAClE;;AAEA;EACE,yBAAyB;EACzB,4CAA4C;EAC5C,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,yBAAyB;EACzB,wCAAwC;EACxC,0BAA0B;EAC1B,2BAA2B;AAC7B;;AAEA;EACE,yBAAyB;AAC3B","sourcesContent":[".trackerBoard {\n  width: fit-content;\n  border-collapse: collapse;\n  margin: 1em;\n}\n\n.trackerBoardTable {\n  width: fit-content;\n  border-collapse: collapse;\n}\n\n.trackerBoardHeader {\n  margin: var(--spacing-sm);\n  padding: var(--spacing-sm) 1em;\n  font-weight: bold;\n  font-size: 120%;\n}\n\n.trackerBoardColumn {\n  border: 0.01em solid white;\n  padding: 0.1em;\n  /* display: flex; flex-direction: column; align-items: center; */\n} \n\n.trackerBoardHeaderCell {\n  margin: var(--spacing-sm);\n  padding: var(--spacing-sm) var(--spacing-md);\n  font-weight: bold;\n  font-size: 120%;\n}\n\n.trackerBoardCard {\n  width: 100%;\n  border: 0.01em solid grey;\n  border-radius: var(--border-radius-base);\n  padding: var(--spacing-sm);\n  margin: var(--spacing-sm) 0;\n}\n\n.trackerBoardCardTable {\n  margin: var(--spacing-md);\n} \n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ 472
(module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ 993
(module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.trackerBoardIssueCard {
  margin: var(--spacing-sm);
  max-width: 24em;
  padding: var(--spacing-sm);
  border: 0.05em solid grey;
  border-radius: var(--border-radius-base);
}
.trackerBoardIssueCardTable {
  width: 100%;
}
.trackerBoardIssueCardTable td {
  padding: 0.1em 0.7em 0.1em 0.1em;
}
.trackerBoardIssueCardTable img {
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
}

.trackerBoardIssueCardTable {
  width: 100%;
  border-collapse: collapse;
}

.trackerOverlayCloseButton {
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0.7em;
  right: 0.7em;
  margin: 0;
}
.trackerOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.trackerIssue {
  position: relative;
  background: white;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-base);
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
}

.trackerIssueIconButton {
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
}

.trackerIssueSpacer {
  height: 1em;
  margin: 0.5em;
}

.trackerIssueForm {
  margin-top: var(--spacing-md);
  padding: var(--spacing-sm);
  border: 0.05em solid grey;
  border-radius: var(--border-radius-base);
}
.trackerIssueSubIssuePanel {
  margin: var(--spacing-md);
  padding: var(--spacing-md);
  border: 0.05em solid grey;
  border-radius: var(--border-radius-base);
}

.trackerIssueSubIssuePanelSupersList {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.trackerIssueSubIssuePanelSubsList {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  flex-direction:  row-reverse; /* Not sure if it should be row or column */
}
.trackerIssueSubIssuePanelNewSubButton {
  margin: var(--spacing-sm) var(--spacing-md);
  padding: var(--spacing-sm);
  border: 0.05em solid grey;
  border-radius: var(--border-radius-base);
  background-color: #f0f0f0;
  cursor: pointer;
  float: right;
}

.trackerIssueTrackerLink {
  float: right;
  margin: var(--spacing-sm) var(--spacing-md);
  padding: var(--spacing-sm);
}

.trackerIssueDeleteButton {
  color: white;
  border: none;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-base);
  cursor: pointer;
  float: right; /* this is the only one from the code */
}

/* below styles the remove task popup */
.trackerIssue > div[style*="position: relative"] {
  z-index: 2000;
}

.trackerIssue > div[style*="position: relative"] > div[style*="position: absolute"] {
  top: -1em !important;
  left: 50% !important;
  transform: translate(-55%, -3em);
  z-index: 2001;
}

.trackerIssueRefreshButton {
  clear: both;
  position: relative;
  z-index: 1;
}

/* below not from code from ai */
.trackerIssueMessageArea {
  border: 0.05em solid grey;
  border-radius: var(--border-radius-base);
  padding: var(--spacing-md);
}

.trackerIssueMessageAreaError {
  color: red;
  font-weight: bold;
}
/* ends here for ai generated */

`, "",{"version":3,"sources":["webpack://./src/styles/issue.css"],"names":[],"mappings":"AAAA;EACE,yBAAyB;EACzB,eAAe;EACf,0BAA0B;EAC1B,yBAAyB;EACzB,wCAAwC;AAC1C;AACA;EACE,WAAW;AACb;AACA;EACE,gCAAgC;AAClC;AACA;EACE,YAAY;EACZ,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,yBAAyB;AAC3B;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,eAAe;EACf,kBAAkB;EAClB,UAAU;EACV,YAAY;EACZ,SAAS;AACX;AACA;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,8BAA8B;EAC9B,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,0BAA0B;EAC1B,wCAAwC;EACxC,cAAc;EACd,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,aAAa;AACf;;AAEA;EACE,6BAA6B;EAC7B,0BAA0B;EAC1B,yBAAyB;EACzB,wCAAwC;AAC1C;AACA;EACE,yBAAyB;EACzB,0BAA0B;EAC1B,yBAAyB;EACzB,wCAAwC;AAC1C;;AAEA;EACE,aAAa;EACb,eAAe;EACf,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,sBAAsB;EACtB,4BAA4B,EAAE,2CAA2C;AAC3E;AACA;EACE,2CAA2C;EAC3C,0BAA0B;EAC1B,yBAAyB;EACzB,wCAAwC;EACxC,yBAAyB;EACzB,eAAe;EACf,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,2CAA2C;EAC3C,0BAA0B;AAC5B;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,0BAA0B;EAC1B,wCAAwC;EACxC,eAAe;EACf,YAAY,EAAE,uCAAuC;AACvD;;AAEA,uCAAuC;AACvC;EACE,aAAa;AACf;;AAEA;EACE,oBAAoB;EACpB,oBAAoB;EACpB,gCAAgC;EAChC,aAAa;AACf;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,UAAU;AACZ;;AAEA,gCAAgC;AAChC;EACE,yBAAyB;EACzB,wCAAwC;EACxC,0BAA0B;AAC5B;;AAEA;EACE,UAAU;EACV,iBAAiB;AACnB;AACA,+BAA+B","sourcesContent":[".trackerBoardIssueCard {\n  margin: var(--spacing-sm);\n  max-width: 24em;\n  padding: var(--spacing-sm);\n  border: 0.05em solid grey;\n  border-radius: var(--border-radius-base);\n}\n.trackerBoardIssueCardTable {\n  width: 100%;\n}\n.trackerBoardIssueCardTable td {\n  padding: 0.1em 0.7em 0.1em 0.1em;\n}\n.trackerBoardIssueCardTable img {\n  width: 1.5em;\n  height: 1.5em;\n  border-radius: 50%;\n}\n\n.trackerBoardIssueCardTable {\n  width: 100%;\n  border-collapse: collapse;\n}\n\n.trackerOverlayCloseButton {\n  background: none;\n  border: none;\n  cursor: pointer;\n  position: absolute;\n  top: 0.7em;\n  right: 0.7em;\n  margin: 0;\n}\n.trackerOverlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 9999;\n}\n\n.trackerIssue {\n  position: relative;\n  background: white;\n  padding: var(--spacing-md);\n  border-radius: var(--border-radius-base);\n  max-width: 80%;\n  max-height: 80%;\n  overflow: auto;\n}\n\n.trackerIssueIconButton {\n  width: 1.5em;\n  height: 1.5em;\n  border-radius: 50%;\n}\n\n.trackerIssueSpacer {\n  height: 1em;\n  margin: 0.5em;\n}\n\n.trackerIssueForm {\n  margin-top: var(--spacing-md);\n  padding: var(--spacing-sm);\n  border: 0.05em solid grey;\n  border-radius: var(--border-radius-base);\n}\n.trackerIssueSubIssuePanel {\n  margin: var(--spacing-md);\n  padding: var(--spacing-md);\n  border: 0.05em solid grey;\n  border-radius: var(--border-radius-base);\n}\n\n.trackerIssueSubIssuePanelSupersList {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--spacing-sm);\n}\n\n.trackerIssueSubIssuePanelSubsList {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--spacing-sm);\n  flex-direction:  row-reverse; /* Not sure if it should be row or column */\n}\n.trackerIssueSubIssuePanelNewSubButton {\n  margin: var(--spacing-sm) var(--spacing-md);\n  padding: var(--spacing-sm);\n  border: 0.05em solid grey;\n  border-radius: var(--border-radius-base);\n  background-color: #f0f0f0;\n  cursor: pointer;\n  float: right;\n}\n\n.trackerIssueTrackerLink {\n  float: right;\n  margin: var(--spacing-sm) var(--spacing-md);\n  padding: var(--spacing-sm);\n}\n\n.trackerIssueDeleteButton {\n  color: white;\n  border: none;\n  padding: var(--spacing-sm);\n  border-radius: var(--border-radius-base);\n  cursor: pointer;\n  float: right; /* this is the only one from the code */\n}\n\n/* below styles the remove task popup */\n.trackerIssue > div[style*=\"position: relative\"] {\n  z-index: 2000;\n}\n\n.trackerIssue > div[style*=\"position: relative\"] > div[style*=\"position: absolute\"] {\n  top: -1em !important;\n  left: 50% !important;\n  transform: translate(-55%, -3em);\n  z-index: 2001;\n}\n\n.trackerIssueRefreshButton {\n  clear: both;\n  position: relative;\n  z-index: 1;\n}\n\n/* below not from code from ai */\n.trackerIssueMessageArea {\n  border: 0.05em solid grey;\n  border-radius: var(--border-radius-base);\n  padding: var(--spacing-md);\n}\n\n.trackerIssueMessageAreaError {\n  color: red;\n  font-weight: bold;\n}\n/* ends here for ai generated */\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ 95
(module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.trackerIssuePaneTable {
  width: fit-content;
  border-collapse: collapse;
}
.trackerIssuePaneTable td {
  padding: 0.1em 0.7em 0.1em 0.1em;
}
.trackerIssuePaneTable img {
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
}

.trackerIssuePaneNewIssueButtonContainer {
  display: flex;
  flex-direction: row;
}

.trackerIssuePaneNewIssueButton {
  display: inline-flex;
  background-color: #F0F0F0;
  color: #505050;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid grey;
  border-radius: var(--border-radius-base);
  cursor: pointer;
  gap: var(--spacing-sm);
  white-space: nowrap;
  text-align: left;
  padding: var(--spacing-sm);
  font-size: 100%;
  margin: var(--spacing-sm);
}

.trackerIssuePaneNewIssueButton > .trackerIssuePaneNewIssueButtonImage {
  order: 1;
  display: inline-block;
  width: 1em;
  height: 1em;
  margin: 0.2em;
  vertical-align: middle;
}

.trackerIssuePaneNewIssueButton > .trackerIssuePaneNewIssueButtonText {
  order: 2;
  display: inline-block;
  margin-left: 0;
  vertical-align: middle;
}

.trackerIssuePaneOverflow {
  position: fixed;
  z-index: 100;
  top: 1.51em;
  right: 2em;
  left: 2em;
  bottom: 1.5em;
  border: 0.1em grey solid;
  overflow: scroll;
}
.trackerIssuePaneLoginButton {
  margin: var(--spacing-sm) var(--spacing-md);
}
`, "",{"version":3,"sources":["webpack://./src/styles/issuePane.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,yBAAyB;AAC3B;AACA;EACE,gCAAgC;AAClC;AACA;EACE,YAAY;EACZ,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,oBAAoB;EACpB,yBAAyB;EACzB,cAAc;EACd,mBAAmB;EACnB,mBAAmB;EACnB,2BAA2B;EAC3B,sBAAsB;EACtB,wCAAwC;EACxC,eAAe;EACf,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,0BAA0B;EAC1B,eAAe;EACf,yBAAyB;AAC3B;;AAEA;EACE,QAAQ;EACR,qBAAqB;EACrB,UAAU;EACV,WAAW;EACX,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,QAAQ;EACR,qBAAqB;EACrB,cAAc;EACd,sBAAsB;AACxB;;AAEA;EACE,eAAe;EACf,YAAY;EACZ,WAAW;EACX,UAAU;EACV,SAAS;EACT,aAAa;EACb,wBAAwB;EACxB,gBAAgB;AAClB;AACA;EACE,2CAA2C;AAC7C","sourcesContent":[".trackerIssuePaneTable {\n  width: fit-content;\n  border-collapse: collapse;\n}\n.trackerIssuePaneTable td {\n  padding: 0.1em 0.7em 0.1em 0.1em;\n}\n.trackerIssuePaneTable img {\n  width: 1.5em;\n  height: 1.5em;\n  border-radius: 50%;\n}\n\n.trackerIssuePaneNewIssueButtonContainer {\n  display: flex;\n  flex-direction: row;\n}\n\n.trackerIssuePaneNewIssueButton {\n  display: inline-flex;\n  background-color: #F0F0F0;\n  color: #505050;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n  border: 1px solid grey;\n  border-radius: var(--border-radius-base);\n  cursor: pointer;\n  gap: var(--spacing-sm);\n  white-space: nowrap;\n  text-align: left;\n  padding: var(--spacing-sm);\n  font-size: 100%;\n  margin: var(--spacing-sm);\n}\n\n.trackerIssuePaneNewIssueButton > .trackerIssuePaneNewIssueButtonImage {\n  order: 1;\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  margin: 0.2em;\n  vertical-align: middle;\n}\n\n.trackerIssuePaneNewIssueButton > .trackerIssuePaneNewIssueButtonText {\n  order: 2;\n  display: inline-block;\n  margin-left: 0;\n  vertical-align: middle;\n}\n\n.trackerIssuePaneOverflow {\n  position: fixed;\n  z-index: 100;\n  top: 1.51em;\n  right: 2em;\n  left: 2em;\n  bottom: 1.5em;\n  border: 0.1em grey solid;\n  overflow: scroll;\n}\n.trackerIssuePaneLoginButton {\n  margin: var(--spacing-sm) var(--spacing-md);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ 233
(module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.trackerNewIssueForm {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
}

.trackerNewIssueTitleField {
  margin: var(--spacing-sm);
  font-size: 100%;
  padding: var(--spacing-sm);
  width: 100%;
}
`, "",{"version":3,"sources":["webpack://./src/styles/newIssue.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,sBAAsB;EACtB,sBAAsB;EACtB,0BAA0B;AAC5B;;AAEA;EACE,yBAAyB;EACzB,eAAe;EACf,0BAA0B;EAC1B,WAAW;AACb","sourcesContent":[".trackerNewIssueForm {\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-sm);\n  padding: var(--spacing-md);\n}\n\n.trackerNewIssueTitleField {\n  margin: var(--spacing-sm);\n  font-size: 100%;\n  padding: var(--spacing-sm);\n  width: 100%;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ 788
(module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.trackerNewTrackerButton {
  margin: var(--spacing-sm) var(--spacing-md);
}
`, "",{"version":3,"sources":["webpack://./src/styles/newTracker.css"],"names":[],"mappings":"AAAA;EACE,2CAA2C;AAC7C","sourcesContent":[".trackerNewTrackerButton {\n  margin: var(--spacing-sm) var(--spacing-md);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ 314
(module) {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ },

/***/ 354
(module) {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ },

/***/ 72
(module) {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ },

/***/ 659
(module) {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ },

/***/ 540
(module) {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ },

/***/ 56
(module, __unused_webpack_exports, __webpack_require__) {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ },

/***/ 825
(module) {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ },

/***/ 113
(module) {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ },

/***/ 197
(module) {

module.exports = "#  Ontology for user interface hints and forms\n#\n#  See also related: the Fresnel language\n#\n@prefix contact: <http://www.w3.org/2000/10/swap/pim/contact#>.\n@prefix dc:  <http://purl.org/dc/elements/1.1/>.\n@prefix doc: <http://www.w3.org/2000/10/swap/pim/doc#>.\n@prefix foaf: <http://xmlns.com/foaf/0.1/>.\n@prefix owl: <http://www.w3.org/2002/07/owl#>.\n@prefix r: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.\n@prefix s: <http://www.w3.org/2000/01/rdf-schema#>.\n@prefix tt: <http://dig.csail.mit.edu/2010/issues/track#>.\n@prefix ui: <http://www.w3.org/ns/ui#>.\n@prefix : <http://www.w3.org/ns/ui#>.\n@prefix wf: <http://www.w3.org/2005/01/wf/flow#>.\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n\n@keywords is, of, a.\n\n<> dc:title \"An ontology for User Interface description, Hints and Forms.\";\n    dc:description \"\"\"The User Interface ontology allows the definition\n    of forms for processing RDF model data, and include a bootstrap form for\n    editing forms. It allows user interface hints such as background colors,\n    can be associated with objects and classes.\n    \"\"\";\n    dc:created 2010-08-07;\n    dc:license <https://creativecommons.org/publicdomain/zero/1.0/>;\n    dc:modified \"\"\"$Date: 2020/03/22 16:53:21 $\"\"\";\n    dc:author <https://www.w3.org/People/Berners-Lee/card#i>.\n\nstyle a r:Property, owl:DatatypeProperty;\n    s:label \"style\";\n        prompt \"CSS style\";\n    s:comment \"\"\"Must be a valid CSS style string such as one could put in\n        an HTML style attribute.  Depending on the user interface system, this can\n        by given to individuals, classes or properties. It is up to a user interface\n        which wants to draw on them to pick how it uses styles from which parts\n        of the data it has.  For example, the style of a class may be picked\n        to distinguish information about things in that class.\"\"\".\n\nbackgroundColor a r:Property, owl:DatatypeProperty;\n    s:label \"background color\"@en;\n        s:range ui:Color;\n    s:comment \"\"\"Must be a valid CSS color string such as one could put in\n        an HTML style attribute.  This should be in the #xxxxxx form,\n        (with 6 digits of hex)  so that it\n        can work with Graphviz.\"\"\".\n\nbackgroundImage a r:Property, owl:DatatypeProperty;\n    s:label \"background image\"@en;\n    s:comment \"\"\"URI or base64 representation of an image\"\"\".\n\ncolor a r:Property, owl:DatatypeProperty;\n    s:label \"color\"@en;\n    s:range ui:Color;\n    s:comment \"\"\"Must be a valid CSS color string such as one could put in\n        an HTML style attribute.  This should be in the #xxxxxx form,\n        (with 6 digits of hex)  so that it\n        can work with Graphviz.\"\"\".\n\n\n\nsortPriority a r:Property, owl:DatatypeProperty;\n        s:label \"sort priority\";\n        s:range xsd:integer;\n        s:comment \"\"\"When individuals or classes must be sorted, then\n        if they are given different values of sortPriority a user agent can\n        use this as a hint to how to present information.\"\"\".\n\nsortBy a r:Property;\n        s:label \"sort by\";\n        s:domain s:Class;\n        s:range r:Property;\n        s:comment \"\"\"A property which typically is used to sort\n        members of a given class.\"\"\".\n\nseqeunce a r:Property;\n    s:label \"sequence number\";\n    s:range xsd:integer;\n    s:comment \"\"\"The sequence in which this item is arranged with repect to other parts.\"\"\".\n\ninitialProperties a r:Property;\n        s:label \"initial properties\";\n        s:domain s:Class;\n        s:range r:List; # List of r:Property\n        s:comment \"\"\"A really simple way of enabling user interfaces to\n            create new information about a class of things is to make a define of properties\n            to be specified when a information about a new item\n            (\"New item\" here means an item which the system\n            does not have prvious information about yet,\n            not an items which has just been created,\n            like new friend as opposed to new baby)\"\"\";\n            prompt \"Properties to be specified for new ones\".\n\ntableProperties a r:Property;\n        s:domain s:Class;\n        s:label \"table properties\";\n        s:range r:List; # List of r:Property\n        s:comment \"\"\"This  is a crude way of specifying a table-based\n            view for objects of this class.\"\"\";\n            prompt \"Properties to be given in a default table view\".\n\nprompt  a r:Property;\n        s:label \"user prompt\";\n        s:comment \"\"\"A string for the UI to use if the user needs a longer\n        prompts than just a field name, the rdfs:label. \"\"\";\n        ui:prompt \"A longer prompt for a user inputting this property\".\n\n\n#  A Taxonomy of Field types\n\nui:Form owl:disjointUnionOf ( ui:ValueField  ui:Group ui:Choice ui:Classifier ui:Options ui:Multiple ui:Heading ui:Comment);\n    s:comment \"\"\"A form can be any type of single field, or typically a Group of several fields,\n    including interspersed headings and comments.  \"\"\".\nui:Single owl:disjointUnionOf ( ui:ValueField  ui:Group ui:Choice ui:Classifier ui:Options ui:Heading ui:Comment).\nui:ValueField owl:disjointUnionOf ( ui:TextField ui:NumericField ui:ColorField ui:DateField ui:DateTimeField ui:PhoneField ui:EmailField).\nui:NumericField owl:disjointUnionOf (ui:BooleanField ui:TriStateField ui:IntegerField ui:DecimalField ui:FloatField).\n# ui:Multiple owl:disjointUnionOf ( ui:ZeroOrMore ui:OneOrMore ).\nui:TextField owl:disjointUnionOf (ui:SingleLineTextField ui:MultiLineTextField).\n\nui:Form a s:Class; is s:subClassOf of ui:ValueField, ui:Group, ui:Choice,  ui:Heading, ui:Comment, ui:Classifier, ui:Options, ui:Multiple.\nui:Single a s:Class; is s:subClassOf of ui:ValueField, ui:Group, ui:Choice, ui:Heading, ui:Comment, ui:Classifier, ui:Options.\nui:ValueField a s:Class; is s:subClassOf of  ui:TextField, ui:NumericField, ui:ColorField, ui:DateField, ui:DateTimeField, ui:PhoneField, ui:EmailField.\nui:NumericField a s:Class; is s:subClassOf of ui:BooleanField, ui:TriStateField, ui:IntegerField, ui:DecimalField, ui:FloatField.\nui:TextField a s:Class; is s:subClassOf of ui:SingleLineTextField, ui:MultiLineTextField.\n\nui:Classifier a s:Class; s:label \"classifier\";\n    s:comment \"\"\"A classifier allows the user to select the type of an object.\n    The possible types must be subclasses of some overall class, the \"category\".\n    (Ideally, the superclass is also set up as the disjoint union of the subclasses,\n    if they are disjoint.)\n\n    The form normally stores the resulting classes using an rdf:type triple,\n    but a different predicate can be used if required, so the classifier field\n    needs is 'property' defined too.\n\n    If the subclass selected itself is has subclasses defined, the user can\n    recursively select from them in turn, as many levels as needed.\"\"\".\n\nui:property a r:Property; s:domain ui:Form; s:range r:Property;\n    s:label \"property to be stored\"@en;\n    s:comment \"\"\"Many fields prompt for information about a given property of the subject.\n    When field is filled in, this gives which property is written into the data.\"\"\".\n\nui:category  a r:Property; s:domain ui:Classifier; s:range s:Class;\n    s:label \"overall superclass\"@en;\n    s:comment \"\"\"The superclass subclasses of which will be selected.\"\"\".\n\nui:dependingOn a r:Property; s:domain ui:Options; s:range r:Property;\n    s:label \"depending on\"@en;\n    s:comment \"\"\"Many fields prompt for information about a given property of the subject\"\"\".\n\nui:for a r:Property; s:label \"for\"@en; s:comment \"The value for which this case is selected.\".\nui:use a r:Property; s:range ui:Form.\n\nui:part a r:Property; s:label \"part\"@en ; s:domain ui:Form; s:range ui:Form. # Used for Multiple field - the subform for each item\nui:parts a r:Property; s:label \"parts\"@en ; s:domain ui:Form; s:range r:Collection. # (of Forms) The ordered set of fields in a group\nui:ordered e r:Property; s:label \"ordered\"; s:range xsd:Boolean . # Could be useful for all kinds of things in future so not restricted to Multiple\n\nui:from a r:Property; s:domain ui:Choice; s:range r:Class;\n    s:label \"from\"; ui:prompt \"from what class\".\n\nui:size a r:Property; s:domain ui:ValueField; s:range xsd:integer;\n    s:label \"size of field\";\n    ui:prompt \"size of field in characters\".\n\nui:maxLength a r:Property; s:domain ui:TextField; s:range xsd:integer;\n    s:label \"max length of value\".\n\nui:minValue a r:Property; s:domain ui:ValueField; s:label \"min\".  # @@ range?\nui:maxValue a r:Property; s:domain ui:ValueField; s:label \"max\".\n\n ui:creationForm a r:Property; s:domain s:Class; s:range ui:Form;\n    s:label \"creation form\";\n    s:comment \"\"\"A form which may be used to collect information about a\n    hitherto locally undocumented instance instance of this class.\"\"\".\n\n ui:annotationForm a r:Property; s:domain s:Class; s:range ui:Form;\n    s:label \"annotation form\";\n    s:comment \"\"\"A form which may be used to add more infromation to an\ninstance of this class which we know something about.  Anything from\nadding just add one more fact, to adding a whole lot of information about a specific\nfacet of the thing.\n\"\"\".\n\n\n#############################################\n#\n# Form for editing Forms\n#\n\nFormForm a ui:Form;\n    dc:title \"Form for editing Forms\";\n    is ui:creationForm of Form;\n    a ui:Group; ui:parts (FF1 FF2 FF3 FieldList) .\n\n    FF1 ui:sequence 1; a ui:Heading;  ui:contents \"Edit Form\"@en .\n    FF2 ui:sequence 2; a ui:SingleLineTextField; ui:property dc:title; ui:size 60 .\n    FF3 ui:sequence 3; a ui:Comment;  ui:contents\n        \"\"\"To add a field to the form, press the plus at the bottom,\n        and then select what sort of field you want.\"\"\"@en; ui:style \"background-color: #ffe;\" .\n\n    FieldList  ui:sequence 10; a ui:Multiple; ui:ordered true; ui:property ui:parts; ui:part FieldForm .\n\nFieldForm a ui:Group;\n    dc:title \"Form for selecting a type of field\";\n    ui:parts (\n\n        [ ui:sequence 1; a ui:Classifier; ui:property r:type; ui:category ui:Form]\n\n        [ a ui:Options; ui:sequence 2; ui:dependingOn r:type;\n\n            ui:case [ ui:for ui:TextField; ui:use [a ui:Group; ui:parts (\n                [ a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label \"property\"; ui:from owl:DatatypeProperty]  # @@@ Needs inference on current web\n                [ a ui:IntegerField; ui:property ui:size; ui:label \"field size\"; ui:min 1; ui:max 4096]\n                [ a ui:IntegerField; ui:property ui:maxLength; ui:label \"Max. length of string\"; ui:min 1]\n            )]];\n\n            ui:case [ ui:for ui:IntegerField; ui:use [a ui:Group; ui:parts (\n                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label \"property\"; ui:from owl:DatatypeProperty]\n                [ ui:sequence 2; a ui:IntegerField; ui:property ui:min; ui:label \"minimum value\"]\n                [ ui:sequence 3; a ui:IntegerField; ui:property ui:max; ui:label \"maximum value\"] ) ]];\n\n            ui:case [ ui:for ui:DecimalField; ui:use [a ui:Group; ui:parts (\n                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label \"property\"; ui:from owl:DatatypeProperty]\n                [ ui:sequence 2; a ui:DecimalField; ui:property ui:min; ui:label \"minimum value\"]\n                [ ui:sequence 3; a ui:DecimalField; ui:property ui:max; ui:label \"maximum value\"] )  ]];\n\n            ui:case [ ui:for ui:FloatField; ui:use [a ui:Group; ui:parts (\n                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label \"property\"; ui:from owl:DatatypeProperty]\n                [ ui:sequence 2; a ui:FloatField; ui:property ui:min; ui:label \"minimum value\"]\n                [ ui:sequence 3; a ui:FloatField; ui:property ui:max; ui:label \"maximum value\"] ) ]];\n\n            ui:case [ ui:for ui:ColorField; ui:use [a ui:Group; ui:parts (\n                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label \"property\"; ui:from owl:DatatypeProperty] )\n            ]];\n\n            ui:case [ ui:for ui:DateField; ui:use [a ui:Group; ui:parts (\n                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label \"property\"; ui:from owl:DatatypeProperty]\n                [ ui:sequence 2; a ui:DateField; ui:property ui:min; ui:label \"min\"]\n                [ ui:sequence 3; a ui:DateField; ui:property ui:max ; ui:label \"max\"]\n            ) ]];\n\n            ui:case [ ui:for ui:DateTimeField; ui:use [a ui:Group; ui:parts (\n                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label \"property\"; ui:from owl:DatatypeProperty]\n                [ ui:sequence 2; a ui:DateTimeField; ui:property ui:min; ui:label \"min\"]\n                [ ui:sequence 3; a ui:DateTimeField; ui:property ui:max ; ui:label \"max\"]\n            ) ]];\n\n            ui:case [ ui:for ui:EmailField; ui:use [a ui:Group; ui:parts (\n                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label \"property\"; ui:from owl:ObjectProperty]\n            ) ]];\n\n            ui:case [ ui:for ui:PhoneField; ui:use [a ui:Group; ui:parts (\n                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label \"property\"; ui:from owl:ObjectProperty]\n            )]];\n\n            ui:case [ ui:for ui:Group; ui:use FieldList];\n\n            ui:case [ ui:for ui:Options; ui:use [a ui:Group; ui:parts (\n                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:dependingOn; ui:label \"depending on\"; ui:from r:Property; ui:default r:type]\n                [ ui:sequence 2; a ui:Multiple; ui:property ui:case; ui:part CaseForm]\n                                ) ]];\n\n            ui:case [ ui:for ui:Choice; ui:use [a ui:Group; ui:parts (\n                [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label \"property\";\n                    ui:canMintNew true; ui:from owl:ObjectProperty]\n                [ ui:sequence 2; a ui:Choice;  ui:canMintNew true; ui:property ui:from; ui:label \"destination class\";\n                                    ui:from s:Class; ui:canMintNew true; ]\n                [ ui:sequence 3; a ui:BooleanField; ui:property ui:canMintNew; # No class form yet\n                            ui:label \"user can add new\"]\n                [ ui:sequence 4; a ui:Choice;  ui:canMintNew true; ui:property ui:use; ui:label \"Nested Form (if any)\";\n                            ui:from ui:Form; ui:optional true; ui:use FormForm] # @@ optional\n\n            ) ]];\n\n            ui:case [ ui:for ui:Classifier; ui:use [a ui:Group; ui:parts (\n                [ ui:sequence 2; a ui:Comment; ui:contents \"\"\"A classifier allows the user to which classes the item belongs to, given a common superclass of the allowed classes.  Give the superclass here:\"\"\" ]\n\n                [ ui:sequence 4; a ui:Choice;  ui:canMintNew true; ui:property ui:category; ui:label \"superclass\"; ui:from s:Class]\n\n                [ ui:sequence 6; a ui:Comment; ui:contents \"\"\"(When the choice is made normally the item is given a rdf:type. Set this to rdf:type unless you want the form to set a different property.)\"\"\" ]\n\n                [ ui:sequence 8; a ui:Choice;  ui:canMintNew true; ui:property ui:property;\n                        ui:label \"property\"; ui:from owl:ObjectProperty; ui:default r:type] # @@ restriction\n\n            ) ]];\n\n            ui:case [ ui:for ui:Multiple; ui:use [a ui:Group; ui:parts (\n                        [ui:sequence 0; a ui:BooleanField;  ui:property ui:ordered; ui:label \"ordered\"] # If this an ordered array or an unordered set?\n                        [ui:sequence 0; a ui:IntegerField;  ui:property ui:min; ui:label \"minimum number\"] # If this an ordered array or an unordered set?\n                        [ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:property; ui:label \"property\"; ui:from r:Property]\n                [ui:sequence 2; a ui:Choice;  ui:canMintNew true; ui:property ui:part; ui:from ui:Form; ui:use FieldForm]   # Form for details of the field part of the multiple\n            ) ]];\n\n            ui:case [ ui:for ui:Heading; ui:use [a ui:SingleLineTextField; ui:property ui:contents]];\n\n            ui:case [ ui:for ui:Comment; ui:use [a ui:MultiLineTextField; ui:property ui:contents]]\n        ]).\n\n\nCaseForm a ui:Group;\n   dc:title \"Form for a conditional case in a form\";\n   ui:parts (\n        [ ui:sequence 1; a ui:Choice;  ui:canMintNew true; ui:property ui:for; ui:label \"when it is\"; ui:canMintNew true; ui:from s:Class]\n        [ui:sequence 2; a ui:Choice;  ui:canMintNew true; ui:property ui:use; ui:from ui:Form; ui:canMintNew true; ui:use FieldForm] ). # Form for details of the field part of the multiple\n\n# ENDS\n";

/***/ },

/***/ 240
(module) {

module.exports = "#   Issue tracking - Workflow application definition ontology\n#\n# Finite state automaton ontology\n#\n# See requirements for tracking tools http://www.w3.org/2005/01/06-tool-req.html\n#\n@keywords a, is, of.\n\n@prefix :   <http://www.w3.org/2005/01/wf/flow#>.\n@prefix wf: <http://www.w3.org/2005/01/wf/flow#>.\n\n@prefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix s: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix owl: <http://www.w3.org/2002/07/owl#>.\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n\n@prefix doc: <http://www.w3.org/2000/10/swap/pim/doc#> .\n@prefix log: <http://www.w3.org/2000/10/swap/log#> .\n@prefix foaf: <http://xmlns.com/foaf/0.1/>.\n@prefix contact: <http://www.w3.org/2000/10/swap/pim/contact#> .\n@prefix doap: <http://usefulinc.com/ns/doap#>.\n@prefix dc: <http://purl.org/dc/elements/1.1/>.\n@prefix dct: <http://purl.org/dc/terms/>.\n@prefix ui: <http://www.w3.org/ns/ui#>.\n\n<> dc:title \"Issue Tracking Ontology\";\n\n    dct:creator <http://www.w3.org/People/Berners-Lee/card#i>;\n\n    s:comment \"\"\"This ontology defines a very general class (Task)\n    which can used for any kind of bug tracking, issue tracking,\n    to-do-list management, action items, goal dependency, and so on.\n    It captures the state of a task as a subclass, so that\n    subsumption can be used.\n    It captures a discussion thread about a task.\n    It captures subtasks structure if necessary.\n    A \"Tracker\" defines actual set of states, categories, etc.,\n    which  a task can be in. The data about the tracker\n    guides the software managing the task.\n\n    There is some workflow modeling finite state machine\n    terms which are optional for  more complex definition\n    of the transitions allowed.\n    \"\"\".\n\nTask a s:Class;\n    s:label \"task\"@en; owl:disjointUnionOf (Open Closed);\n    s:comment \"\"\"Something to be done in a wide sense,\n    an agenda item at a meeting is one example, but any\n    issue, task, action item, goal, product, deliverable, milestone, can such a thing.\n    The requirement for this framework was that it would allow\n    one to customize ontologies for things such as agenda items,\n    action items, working group issues with a spec, w3c Last Call issues,\n    software bugs and administrative requests.\n    In π-calculus, a process.\n    Make your type of issue a subclass of Task.\n    \"\"\".\n\nOpen a s:Class; s:subClassOf Task;\n    s:label \"open\"@en, \"ouvert\"@fr;\n  ui:backgroundColor \"#d6f5d6\"; # green like github for some reason\n    s:comment \"\"\"A task which needs attention. The very crude states of Open and Closed all\n        interoperability between different systems if the states for a given\n        application are made subclasses of either Open or Closed. This allows\n        tasks from different systems to be mixed and treated together with\n        limited but valuable functionality.\n    \"\"\".\n\nClosed a s:Class; s:subClassOf Task;\n    s:label \"closed\"@en, \"fermé\"@fr;\n  ui:backgroundColor \"#f5d6d6\"; # pink\n    s:comment \"\"\"A task which does not need attention. It may be closed because\n        has been abandoned or completed, for example.\n    \"\"\".\n\n\n  ActionItem a s:Class;\n    s:subClassOf Task;\n    s:label \"action item\"@en; owl:disjointUnionOf (Open Closed);\n    s:comment \"\"\"An obligation taken on by a person, typically at a meeting.\n    \"\"\".\n\n\ndescription a rdf:Property;\n        s:label \"description\";\n        s:comment \"\"\"The description, definition,\n        or abstract. Information explaining what this is.\n        Not arbitrary comment about anything, only about the subject.\n        (Use this property for anything. There is no domain restriction.).\"\"\".\n\ndependent a rdf:Property;\n        s:label \"how\";  owl:inverseOf [ s:label \"why\"];\n        s:domain Task; s:range Task;\n        s:comment \"\"\"Another task upon which this depends, in the sense that\n        this task cannot be completed without that task being done.\n        You can't use this for dependencies on anything other than other tasks.\n        (Note the US spelling of the URI. In the UK, a dependant is a something\n        which is dependent on somehing else.)\"\"\".\n\nassignee    a       rdf:Property;\n        s:label     \"assigned to\"; owl:inverseOf [s:label \"assignment\"];\n#       s:domain    Task;\n        s:range     foaf:Agent;\n        s:comment   \"\"\"The person or group to whom this has been assigned.\"\"\".\n\n# use dct:modified\n#modified        a               rdf:Property;\n#                s:label         \"last changed\".\n\nmodifiedBy      a               rdf:Property;\n                s:range         foaf:Agent;\n                s:label         \"changed by\".\n\n# use dct:created instead\n#created         a               rdf:Property;\n#                s:range         xsd:dateTime;\n#\n# Use foaf:maker instead\n#creator         a               rdf:Property;\n#                s:range         foaf:Agent;\n#                s:label         \"changed by\".\n\nsubscriber      a               rdf:Property;\n                s:label         \"subscriber\";\n                s:range         foaf:Agent.\n\n\n################## Products\n#\n#\n# History:  The Tracker system included a cocept of a product,\n# such that an action  could be associated with *either* an issue *or* a product.\n# Noah Mendelsohn for the TAG needed to be able make\n# and to give products: Goals, scuuess criteria,\n#  deliverables with dates, schedules, TAG members assigned, related issues.\n#\n\n\nProduct         a s:Class; s:subClassOf Task;\n                s:label \"product\";\n                s:comment \"\"\"A product is a task which monitors something\n                which must be produced.\"\"\".\n\ndeliverable     a rdf:Property; s:subPropertyOf dependent;\n                s:range Product;\n                s:label \"deliverable\"@en;\n                s:comment \"\"\"Something which must be delivered to accomplish this\"\"\".\n\ngoalDescription a rdf:Property, owl:DatatypeProperty;\n                s:domain Task; s:range xsd:string;\n                s:label \"goals\";\n                s:comment \"\"\"A textual description of the goals of this product, etc.\"\"\".\n\nsuccessCriteria a rdf:Property, owl:DatatypeProperty;\n                s:domain Task; s:range xsd:string;\n                s:label \"success criteria\";\n                s:comment \"\"\"A textual description of the successs critera.\n                How when we know this is done?\"\"\".\n\ndateDue         a rdf:Property, owl:DatatypeProperty;\n                s:domain Task; s:range xsd:date;\n                s:label \"due\"@en;\n                s:comment \"\"\"The date this task is due.\n                \"\"\".\n\n##################  Attachments\n\nattachment      a rdf:Property;\n                s:label \"attachment\";\n                s:comment \"\"\"Something related is attached for information.\"\"\".\n\nscreenShot      a rdf:Property; s:subPropertyOf attachment;\n                s:label \"screen shot\"@en;\n                s:comment \"\"\"An image taken by capturing the state of a\n                 computer screen, for example to demonstrate a problem\"\"\".\n\ntestData        a rdf:Property; s:subPropertyOf attachment;\n                s:label \"test data\"@en;\n                s:comment \"\"\"A file which can be used as inpiut to a test\n                or to demonstrate a problem. \"\"\".\n\n\nterminalOutput      a rdf:Property; s:subPropertyOf attachment;\n                s:label \"terminal output\"@en;\n                s:comment \"\"\"A file showing user interaction from a\n                text terminal or console etc. \"\"\".\n\n\nmessage         a rdf:Property; s:subPropertyOf attachment;\n                s:label \"message\"@en;\n                s:comment \"\"\"A message about this. Attached for information.\"\"\".\n\n\nMessage         a s:Class; s:label \"message\"@en.\nrecipent a rdf:Property; s:label \"to\"; s:domain Message; s:range foaf:Agent.\nsender a rdf:Property; s:label \"from\"; s:domain Message; s:range foaf:Agent.\n\n############################# A Tracker connects and manages issues\n\ntracker         a rdf:Property;\n                s:label \"tracker\";\n                owl:inverseOf [ s:label \"issue\"];\n                s:domain Task;\n                s:range Tracker.\n\nTracker         a s:Class;\n                s:label \"tracker\";\n                s:comment \"\"\"A set of issues and\n                the constraints on how they evolve.\n                To use this ontology, craete a new tracker.\n                Copy an existing one or make up your own.\"\"\".\n\nissueClass      a rdf:Property;\n                s:label \"all issues must be in\";\n                s:domain Tracker;\n                s:range s:Class, State;\n                s:comment \"\"\"The class of issues which are allowed in this tracker.\n                This is essemtial to the operation of the tracker,\n                as it defines which states an issue can be in.\n                (The issueClass must be a disjointUnionOf the state classes)\"\"\".\n\nissueCategory   a rdf:Property;\n                s:label \"issue category\";\n                s:domain Tracker;\n                s:range s:Class;\n                s:comment \"\"\"Issues may be categorized according to the\n                subclasses of this class\"\"\".\n\nstateStore      a rdf:Property;\n                s:label \"state store\";\n                s:domain Tracker;\n                s:range doc:Document;\n                s:comment \"\"\"A read-write document.\n                The state of the issues is modified here.\n                When you set up a trcaker, thgis must be set to point\n                to a writeble data resource on the web.\"\"\".\n\ntransactionStore\n                a rdf:Property;\n                s:label \"transaction store\";\n                s:domain Tracker;\n                s:range doc:Document;\n                s:comment \"\"\"An appendable document. Transactions and messsages\n                    can be written into here\"\"\".\n\nasigneeClass\n                a rdf:Property;\n                s:label \"assignees must be\";\n                s:domain Tracker;\n                s:range s:Class;  # Subclass of foaf:Agent\n                s:comment \"\"\"When an issue is assigned, the assignee must be from this class\"\"\".\n\ninitialState\n                a rdf:Property;\n                s:label \"initial state\"@en;\n                s:label \"état initial\"@fr;\n                s:domain Tracker;\n                s:range State;\n                s:comment \"\"\"The initial state for a new issue\"\"\".\n\n# Use this to link a project to a tracker\ndoap:bug-database owl:inverseOf [ s:label \"project\"@en ].\n\n\n\n\n############################################################\n#\n#           Finite state machines\n#\nChange      a s:Class;\n        s:label \"change\";\n        s:comment \"\"\"The universal class of things which\nchange the state of a task.\nIncluded now: Creation, Transition. (Maybe in the future\nmore π-calculus constructions such as splitting & merging tasks,\nand import/export of obligations to a foreign opaque system.)\n\"\"\".\n\nTransition  a s:Class; s:subClassOf Change;\n        s:label     \"transition\";\n        s:comment \"\"\"A transition is a change of state of\na task. Typical properties include date and/or source\n(a document causing the transition), and a final state.\"\"\".\n\nCreation    a s:Class; s:subClassOf Change;\n        s:label     \"creation\";\n        s:comment \"\"\"A creation is a change from existence\nto non-existence\na task. Typical properties include date and/or source\n(a document causing the transition), and a final state.\"\"\".\n\n\ndate    s:range DateTime.\n\nfinal   a       rdf:Property;\n        s:label     \"to\";\n        s:domain    Transition;\n        s:range State.\n\ntask        a       rdf:Property;\n        s:range     Task;\n        s:label     \"task\".\n\nrequires    a rdf:Property;\n        s:label \"requires\";\n        s:domain    Transition;\n        s:range     rdf:List; # Of properties for validation\n        s:comment   \"\"\"To be a valid transition,\n        a necessary (but not necessarily sufficuent) condition\n        is that there be recorded these properties for the record\"\"\".\n\naffects     a rdf:Property;\n        s:label \"affects\";\n        s:domain    doc:Work;\n        s:range     Task.\n\n\n# { ?x a Transition; task ?t; source ?doc } => { ?doc affects ?t }.\n\n\ncreates     a rdf:Property;\n        s:label \"creates\";\n        s:domain    doc:Work;\n        s:range     Task.\n\n\nallowedTransitions a rdf:Property;\n        s:domain    State;\n        s:range     rdf:List; # @@@ of Action\n        s:label     \"allowed transitions\";\n        s:comment   \"\"\"The state machine is defined\n    by these lists of transition allowed for each issue.\n    (An interesting option in the Web is to make an allowed transition\n    to a state in soemone else's ontology, which in turn allows\n    transitions into many ontologies.  So a finite state maxchine\n    may become very large. In practice this means that a task handed\n    off to another organization may be processed on all kinds of ways.)\"\"\".\n\n#   { ?x a TerminalState} => { ?x allowedTransitions () }.\n\nfinal       a rdf:Property;\n        s:label     \"to\";\n        s:range State.\n\nissue       a       rdf:Property;\n        s:label     \"issue\";\n        s:comment\n        \"\"\"A transition changes the state of the given issue.\"\"\".\n\nsource  a       rdf:Property;\n        s:label     \"source\";\n        s:comment   \"\"\"The source of a transition is\n                the document by which it happened\"\"\";\n        s:range     doc:Work.\nTerminalState a s:Class;\n    s:subClassOf State;\n    s:label \"terminal state\";\n    s:comment \"\"\"A state from which there are no transitions.\"\"\".\n\nNonTerminalState a s:Class;\n    s:label \"non-terminal state\";\n    owl:disjointWith TerminalState;\n    s:comment \"\"\"A state from which there are transitions.\"\"\".\n\n######################################################\n\n#ends\n";

/***/ },

/***/ 264
(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__264__;

/***/ },

/***/ 663
(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__663__;

/***/ },

/***/ 426
(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__426__;

/***/ }

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src)
});

// EXTERNAL MODULE: external "UI"
var external_UI_ = __webpack_require__(426);
// EXTERNAL MODULE: external "SolidLogic"
var external_SolidLogic_ = __webpack_require__(663);
// EXTERNAL MODULE: external "$rdf"
var external_$rdf_ = __webpack_require__(264);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(72);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(56);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/styles/board.css
var board = __webpack_require__(691);
;// ./src/styles/board.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(board/* default */.A, options);




       /* harmony default export */ const styles_board = (board/* default */.A && board/* default */.A.locals ? board/* default */.A.locals : undefined);

;// ./src/board.js
/**  A Board of vertical columns
 *
 * Like a github "project", or a kanbam board, a board allows
 *  you to triage stuff into simple cateories.
 *
  * if an object is added in a refresh, then a new column should be added if needed
  * if its value is previously unseen
  * (Should the coluimn order be defined by user or caller?)
   *
 * @returns dom:Element
*/





function board_board(dom, columnValues, renderItem, options) {
  const board = dom.createElement('div');
  board.classList.add('trackerBoard');
  const table = board.appendChild(dom.createElement('table'));
  table.classList.add('trackerBoardTable');
  const headerRow = table.appendChild(dom.createElement('tr'));
  headerRow.classList.add('trackerBoardHeader');
  const mainRow = table.appendChild(dom.createElement('tr'));
  mainRow.classList.add('trackerBoardMainRow');
  columnValues.forEach(x => {
    const cell = headerRow.appendChild(dom.createElement('th'));
    cell.classList.add('trackerBoardHeaderCell');
    cell.textContent = external_UI_.utils.label(x, true); // Initial capital
    cell.subject = x;
    const column = mainRow.appendChild(dom.createElement('td'));
    column.classList.add('trackerBoardColumn');
    column.subject = x;
    function droppedURIHandler(uris) {
      uris.forEach(function (u) {
        console.log('Dropped on column: ' + u);
        const item = external_SolidLogic_.store.sym(u);
        options.columnDropHandler(item, x);
      });
    }
    if (options.columnDropHandler) {
      external_UI_.widgets.makeDropTarget(column, droppedURIHandler);
    }
  });

  /* Each item on the board
   * normally App will override this
  */
  function defaultRenderItem(item, category) {
    const card = dom.createElement('div');
    card.classList.add('trackerBoardCard');
    const table = card.appendChild(dom.createElement('table'));
    table.classList.add('trackerBoardCardTable');
    const classes = external_SolidLogic_.store.each(item, external_UI_.ns.rdf('type'));
    const catColors = classes.map(cat => external_SolidLogic_.store.any(cat, external_UI_.ns.ui('backgroundColor'))).filter(c => c);
    table.appendChild(external_UI_.widgets.personTR(dom, null, item));
    table.subject = item;
    const backgroundColor = catColors[0] || external_SolidLogic_.store.any(category, external_UI_.ns.ui('backgroundColor'));
    card.style.backgroundColor = backgroundColor ? backgroundColor.value : '#fff';
    return card;
  }
  function sortedBy(values, predicate, defaultSortValue, reverse) {
    const toBeSorted = values.map(x => [external_SolidLogic_.store.any(x, predicate) || defaultSortValue, x]);
    toBeSorted.sort();
    if (reverse) toBeSorted.reverse(); // @@ check
    return toBeSorted.map(pair => pair[1]);
  }
  board.refresh = function () {
    const now = new external_$rdf_.Literal(new Date());
    const actualRenderItem = renderItem || options.renderItem || defaultRenderItem;
    function localRenderItem(subject) {
      const ele = actualRenderItem(subject);
      external_UI_.widgets.makeDraggable(ele, subject);
      ele.subject = subject;
      return ele;
    }
    for (let col = mainRow.firstChild; col; col = col.nextSibling) {
      const category = col.subject;
      let items = external_SolidLogic_.store.each(null, external_UI_.ns.rdf('type'), category);
      const sortBy = options.sortBy || external_UI_.ns.dct('created');
      if (options.filter) {
        items = items.filter(options.filter);
      }
      const sortedItems = sortedBy(items, sortBy, now, true);
      external_UI_.utils.syncTableToArrayReOrdered(col, sortedItems, localRenderItem);
    }
  };

  // kb.query(query, addCellFromBindings, undefined, whenDone) // Populate the board
  board.refresh();
  return board;
}
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/styles/newIssue.css
var newIssue = __webpack_require__(233);
;// ./src/styles/newIssue.css

      
      
      
      
      
      
      
      
      

var newIssue_options = {};

newIssue_options.styleTagTransform = (styleTagTransform_default());
newIssue_options.setAttributes = (setAttributesWithoutAttributes_default());
newIssue_options.insert = insertBySelector_default().bind(null, "head");
newIssue_options.domAPI = (styleDomAPI_default());
newIssue_options.insertStyleElement = (insertStyleElement_default());

var newIssue_update = injectStylesIntoStyleTag_default()(newIssue/* default */.A, newIssue_options);




       /* harmony default export */ const styles_newIssue = (newIssue/* default */.A && newIssue/* default */.A.locals ? newIssue/* default */.A.locals : undefined);

;// ./src/newIssue.js
//  Form to collect data about a New Issue
//



function newIssueForm(dom, kb, tracker, superIssue, showNewIssue, onCancel) {
  const form = dom.createElement('div'); // form is broken as HTML behaviour can resurface on js error
  form.classList.add('trackerNewIssueForm');
  const stateStore = kb.any(tracker, external_UI_.ns.wf('stateStore'));
  onCancel = onCancel || function () {};
  const timestring = function () {
    const now = new Date();
    return '' + now.getTime();
    // http://www.w3schools.com/jsref/jsref_obj_date.asp
  };
  const sendNewIssue = function () {
    titlefield.setAttribute('class', 'pendingedit');
    titlefield.disabled = true;
    const sts = [];
    const expandTemplate = function (template) {
      const now = new external_$rdf_.Literal(new Date());
      const nnnn = '' + new Date().getTime();
      const YYYY = now.value.slice(0, 4);
      const MM = now.value.slice(5, 7);
      const DD = now.value.slice(8, 10);
      return template.replace('{N}', nnnn).replace('{YYYY}', YYYY).replace('{MM}', MM).replace('{DD}', DD);
    };
    // Where to store the new issue?
    const template = kb.anyValue(tracker, external_UI_.ns.wf('issueURITemplate'));
    const issue = template
    // Does each issue do in its own file?
    ? kb.sym(expandTemplate(external_$rdf_.uri.join(template, stateStore.uri))) : kb.sym(stateStore.uri + '#' + 'Iss' + timestring());
    const issueDoc = issue.doc();

    // Basic 9 core predicates are stored in the main stateStore

    const title = kb.literal(titlefield.value);
    sts.push(new external_$rdf_.Statement(issue, external_UI_.ns.wf('tracker'), tracker, stateStore));
    sts.push(new external_$rdf_.Statement(issue, external_UI_.ns.dc('title'), title, stateStore));
    sts.push(new external_$rdf_.Statement(issue, external_UI_.ns.dct('created'), new Date(), stateStore));
    // Copy states from super issue as after all they are subtasks so initially same state same category
    const initialStates = superIssue ? kb.each(superIssue, external_UI_.ns.rdf('type'), null, superIssue.doc()) : kb.each(tracker, external_UI_.ns.wf('initialState'));
    for (const state of initialStates) {
      sts.push(new external_$rdf_.Statement(issue, external_UI_.ns.rdf('type'), state, stateStore));
    }
    if (superIssue) {
      sts.push(new external_$rdf_.Statement(superIssue, external_UI_.ns.wf('dependent'), issue, stateStore));
    }

    // Other things are stores in the individual
    if (template) {
      sts.push(new external_$rdf_.Statement(issue, external_UI_.ns.wf('tracker'), tracker, issueDoc));
      sts.push(new external_$rdf_.Statement(issue, external_UI_.ns.rdfs('seeAlso'), stateStore, issueDoc));
    }
    const sendComplete = function (uri, success, body) {
      if (!success) {
        console.log('Error: can\'t save new issue:' + body);
      } else {
        form.parentNode.removeChild(form);
        showNewIssue(issue);
      }
    };
    kb.updater.update([], sts, sendComplete);
  };
  const states = kb.any(tracker, external_UI_.ns.wf('issueClass'));
  const classLabel = external_UI_.utils.label(states);
  const closeForm = function () {
    if (form.parentNode) {
      form.parentNode.removeChild(form);
    }
    onCancel();
  };
  const header = form.appendChild(dom.createElement('div'));
  header.classList.add('trackerNewIssueHeader');
  const heading = header.appendChild(dom.createElement('h2'));
  heading.textContent = 'Add new ' + (superIssue ? 'sub ' : '') + classLabel;
  const closeButton = header.appendChild(dom.createElement('button'));
  closeButton.classList.add('trackerNewIssueCloseButton');
  closeButton.setAttribute('type', 'button');
  closeButton.setAttribute('aria-label', 'Close new issue form');
  closeButton.textContent = '×';
  closeButton.addEventListener('click', closeForm, false);
  const prompt = form.appendChild(dom.createElement('p'));
  prompt.textContent = 'Title of new ' + classLabel + ':';
  const titlefield = dom.createElement('input');
  titlefield.classList.add('trackerNewIssueTitleField');
  titlefield.setAttribute('type', 'text');
  titlefield.setAttribute('maxLength', '2048'); // No arbitrary limits
  titlefield.select(); // focus next user input
  titlefield.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
      sendNewIssue();
    }
  }, false);
  form.appendChild(titlefield);
  titlefield.focus(); // we want user cursor here
  return form;
}
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/styles/issue.css
var issue = __webpack_require__(993);
;// ./src/styles/issue.css

      
      
      
      
      
      
      
      
      

var issue_options = {};

issue_options.styleTagTransform = (styleTagTransform_default());
issue_options.setAttributes = (setAttributesWithoutAttributes_default());
issue_options.insert = insertBySelector_default().bind(null, "head");
issue_options.domAPI = (styleDomAPI_default());
issue_options.insertStyleElement = (insertStyleElement_default());

var issue_update = injectStylesIntoStyleTag_default()(issue/* default */.A, issue_options);




       /* harmony default export */ const styles_issue = (issue/* default */.A && issue/* default */.A.locals ? issue/* default */.A.locals : undefined);

;// ./src/issue.js
// All the UI for a single issue, without store load or listening for changes
//





const kb = external_SolidLogic_.store;
const SET_MODIFIED_DATES = false;
const TASK_ICON = external_UI_.icons.iconBase + 'noun_17020_gray-tick.svg';
const OPEN_TASK_ICON = external_UI_.icons.iconBase + 'noun_17020_sans-tick.svg';
const CLOSED_TASK_ICON = external_UI_.icons.iconBase + 'noun_17020.svg';
function complain(message, context) {
  console.warn(message);
  context.paneDiv.appendChild(external_UI_.widgets.errorMessageBlock(context.dom, message));
}
function isOpen(issue) {
  const types = kb.findTypeURIs(issue);
  return !!types[external_UI_.ns.wf('Open').uri];
}
function iconForIssue(issue) {
  return isOpen(issue) ? TASK_ICON : CLOSED_TASK_ICON;
}
function getState(issue, classification) {
  const tracker = kb.the(issue, external_UI_.ns.wf('tracker'), null, issue.doc());
  const states = kb.any(tracker, external_UI_.ns.wf('issueClass'));
  classification = classification || states;
  const types = kb.each(issue, external_UI_.ns.rdf('type')).filter(ty => kb.holds(ty, external_UI_.ns.rdfs('subClassOf'), classification));
  if (types.length !== 1) {
    // const initialState = kb.any(tracker, ns.wf('initialState')) No do NOT default
    // if (initialState) return initialState
    throw new Error('Issue must have one type as state: ' + types.length);
  }
  return types[0];
}
function getBackgroundColorFromTypes(issue) {
  const classes = kb.each(issue, external_UI_.ns.rdf('type')); // @@ pick cats in order then state
  const catColors = classes.map(cat => kb.any(cat, external_UI_.ns.ui('backgroundColor'))).filter(c => !!c);
  if (catColors.length) return catColors[0].value; // pick first one
  return null;
}
function renderIssueCard(issue, context) {
  function refresh() {
    const backgroundColor = getBackgroundColorFromTypes(issue) || 'white';
    card.style.backgroundColor = backgroundColor;
    editButton.style.backgroundColor = backgroundColor; // Override white from style sheet
  }
  const dom = context.dom;
  const uncategorized = !getBackgroundColorFromTypes(issue); // This is a suspect issue. Prompt to delete it

  const card = dom.createElement('div');
  card.classList.add('trackerBoardIssueCard');
  const table = card.appendChild(dom.createElement('table'));
  table.classList.add('trackerBoardIssueCardTable');
  const options = {
    draggable: false
  }; // Let the board make the whole card draggable
  table.appendChild(external_UI_.widgets.personTR(dom, null, issue, options));
  table.subject = issue;
  const img = card.firstChild.firstChild.firstChild.firstChild; // div/table/tr/td/img
  img.setAttribute('src', external_UI_.icons.iconBase + 'noun_Danger_1259514.svg'); // override
  // Add a button for viewing the whole issue in overlay
  const buttonsCell = card.firstChild.firstChild.children[2]; // right hand part of card
  buttonsCell.classList.add('trackerBoardIssueCardButtons');
  const editButton = external_UI_.widgets.button(dom, external_UI_.icons.iconBase + 'noun_253504.svg', 'edit', async _event => {
    exposeOverlay(issue, context);
  });
  editButton.classList.add('trackerBoardIssueCardEditButton');
  const editButtonImage = editButton.firstChild;
  editButtonImage.classList.add('trackerBoardIssueCardEditButtonImage');
  editButtonImage.style.width = editButtonImage.style.height = '1.5em';
  buttonsCell.appendChild(editButton);

  // If uncategorized, shortcut to delete issue
  if (uncategorized) {
    const deleteButton = external_UI_.widgets.deleteButtonWithCheck(dom, buttonsCell, 'issue', async function () {
      // noun?
      try {
        await kb.updater.update(kb.connectedStatements(issue));
      } catch (err) {
        complain(`Unable to delete issue: ${err}`, context);
      }
      console.log('User deleted issue ' + issue);
      card.parentNode.removeChild(card); // refresh doesn't work yet because it is not passed though tabs so short cut
      external_UI_.widgets.refreshTree(context.paneDiv); // Should delete the card if nec when tabs pass it though
      // complain('DELETED OK', context)
    });
    buttonsCell.appendChild(deleteButton);
  }
  card.refresh = refresh;
  refresh();
  return card;
}
function exposeOverlay(subject, context) {
  function hideOverlay() {
    overlay.innerHTML = ''; // clear overlay
    overlay.style.visibility = 'hidden';
  }
  const overlay = context.overlay;
  overlay.classList.add('trackerOverlay');
  overlay.innerHTML = ''; // clear existing
  const issuePanel = renderIssue(subject, context);
  overlay.appendChild(issuePanel);
  const button = issuePanel.appendChild(external_UI_.widgets.button(context.dom, external_UI_.icons.iconBase + 'noun_1180156.svg', 'close', hideOverlay));
  button.classList.add('trackerOverlayCloseButton');
  delete button.style.backgroundColor; // do not want white
  overlay.style.visibility = 'visible';
}
function renderSpacer(dom, backgroundColor) {
  const spacer = dom.createElement('div');
  spacer.classList.add('trackerIssueSpacer');
  spacer.style.backgroundColor = backgroundColor; // try that
  return spacer;
}
function renderIssue(issue, context) {
  // Don't bother changing the last modified dates of things: save time
  function setModifiedDate(subj, kb, doc) {
    if (SET_MODIFIED_DATES) {
      if (!getOption(tracker, 'trackLastModified')) return;
      const deletions = kb.statementsMatching(issue, external_UI_.ns.dct('modified')).concat(kb.statementsMatching(issue, external_UI_.ns.wf('modifiedBy')));
      const insertions = [external_$rdf_.st(issue, external_UI_.ns.dct('modified'), new Date(), doc)];
      if (me) insertions.push(external_$rdf_.st(issue, external_UI_.ns.wf('modifiedBy'), me, doc));
      kb.updater.update(deletions, insertions, function (_uri, _ok, _body) {});
    }
  }
  function say(message, style) {
    const pre = dom.createElement('pre');
    pre.setAttribute('style', style || 'color: grey');
    issueDiv.appendChild(pre);
    pre.appendChild(dom.createTextNode(message));
    return pre;
  }
  function timestring() {
    const now = new Date();
    return '' + now.getTime();
    // http://www.w3schools.com/jsref/jsref_obj_date.asp
  }
  function complain(message) {
    console.warn(message);
    issueDiv.appendChild(external_UI_.widgets.errorMessageBlock(dom, message));
  }
  function complainIfBad(ok, body) {
    if (!ok) {
      complain('Sorry, failed to save your change:\n' + body, 'background-color: pink;', context);
    }
  }
  function getOption(tracker, option) {
    // eg 'allowSubIssues'
    const opt = kb.any(tracker, external_UI_.ns.ui(option));
    return !!(opt && opt.value);
  }
  function setPaneStyle() {
    const backgroundColor = getBackgroundColorFromTypes(issue) || '#eee'; // default grey
    const mystyle0 = 'padding: 0.5em 1.5em 1em 1.5em; border: 0.7em;';
    const mystyle = mystyle0 + 'border-color: ' + backgroundColor + '; ';
    issueDiv.setAttribute('style', mystyle);
    issueDiv.style.backgroundColor = 'white';
  }

  /// ////////////// Body of renderIssue

  const dom = context.dom;
  const tracker = kb.the(issue, external_UI_.ns.wf('tracker'), null, issue.doc());
  if (!tracker) throw new Error('No tracker');
  const stateStore = kb.any(tracker, external_UI_.ns.wf('stateStore'));
  const store = issue.doc();
  const issueDiv = dom.createElement('div');
  issueDiv.classList.add('trackerIssue');
  const me = external_SolidLogic_.authn.currentUser();
  const backgroundColor = getBackgroundColorFromTypes(issue) || 'white';
  setPaneStyle();
  external_SolidLogic_.authn.checkUser(); // kick off async operation

  const iconButton = issueDiv.appendChild(external_UI_.widgets.button(dom, iconForIssue(issue)));
  iconButton.classList.add('trackerIssueIconButton');
  external_UI_.widgets.makeDraggable(iconButton, issue); // Drag me wherever you need to do stuff with this issue

  const states = kb.any(tracker, external_UI_.ns.wf('issueClass'));
  if (!states) {
    throw new Error('This tracker ' + tracker + ' has no issueClass');
  }
  const select = external_UI_.widgets.makeSelectForCategory(dom, kb, issue, states, stateStore, function (ok, body) {
    if (ok) {
      setModifiedDate(store, kb, store);
      external_UI_.widgets.refreshTree(issueDiv);
    } else {
      console.log('Failed to change state:\n' + body);
    }
  });
  issueDiv.appendChild(select);
  const cats = kb.each(tracker, external_UI_.ns.wf('issueCategory')); // zero or more
  for (const cat of cats) {
    issueDiv.appendChild(external_UI_.widgets.makeSelectForCategory(dom, kb, issue, cat, stateStore, function (ok, body) {
      if (ok) {
        setModifiedDate(store, kb, store);
        external_UI_.widgets.refreshTree(issueDiv);
      } else {
        console.log('Failed to change category:\n' + body);
      }
    }));
  }

  // For when issue is the main solo subject, include link to tracker itself.
  const a = dom.createElement('a');
  a.classList.add('trackerIssueTrackerLink');
  a.setAttribute('href', tracker.uri);
  issueDiv.appendChild(a).textContent = external_UI_.utils.label(tracker);
  a.addEventListener('click', external_UI_.widgets.openHrefInOutlineMode, true);

  // Main Form for Title, description only
  const coreIssueFormText = `
    @prefix : <http://www.w3.org/ns/ui#> .
    @prefix core: <http://www.w3.org/2005/01/wf/flow#>.
    @prefix dc: <http://purl.org/dc/elements/1.1/>.
    @prefix wf: <http://www.w3.org/2005/01/wf/flow#> .

    core:coreIsueForm     a :Form;
         <http://purl.org/dc/elements/1.1/title> "Core issue data";
         :parts  (
        core:titleField
        core:descriptionField ) .

    core:descriptionField     a :MultiLineTextField;
         :label "Description";
         :property wf:description;
         :size "40" .

    core:titleField     a :SingleLineTextField;
         :label "Title";
         :maxLength "128";
         :property dc:title; # @@ Should move to dct or schema
         :size "40" .

    wf:Task     :creationForm core:coreIsueForm .
`;
  const CORE_ISSUE_FORM = external_UI_.ns.wf('coreIsueForm');
  external_$rdf_.parse(coreIssueFormText, kb, CORE_ISSUE_FORM.doc().uri, 'text/turtle');
  const form = external_UI_.widgets.appendForm(dom, null,
  // was: container
  {}, issue, CORE_ISSUE_FORM, stateStore, complainIfBad);
  form.classList.add('trackerIssueForm');
  issueDiv.appendChild(form);
  form.style.backgroundColor = backgroundColor;

  // Assigned to whom?

  const assignments = kb.statementsMatching(issue, external_UI_.ns.wf('assignee'));
  if (assignments.length > 1) {
    say('Weird, was assigned to more than one person. Fixing ..');
    const deletions = assignments.slice(1);
    kb.updater.update(deletions, [], function (uri, ok, body) {
      if (ok) {
        say('Now fixed.');
      } else {
        complain('Fixed failed: ' + body, context);
      }
    });
  }

  // Who could be assigned to this?
  // Anyone assigned to any issue we know about

  async function getPossibleAssignees() {
    const devGroups = kb.each(issue, external_UI_.ns.wf('assigneeGroup'));
    await kb.fetcher.load(devGroups); // Load them all
    const groupDevs = devGroups.map(group => kb.each(group, external_UI_.ns.vcard('member'), null, group.doc())).flat();
    // Anyone who is a developer of any project which uses this tracker
    const proj = kb.any(null, external_UI_.ns.doap('bug-database'), tracker); // What project?
    if (proj) {
      await kb.fetcher.load(proj);
    }
    const projectDevs = proj ? kb.each(proj, external_UI_.ns.doap('developer')) : [];
    return groupDevs.concat(projectDevs);
  }

  // Super issues first - like parent directories .. maybe use breadcrums from?? @@
  function renderSubIssue(issue) {
    const options = {
      link: false
    };
    return external_UI_.widgets.personTR(dom, external_UI_.ns.wf('dependent'), issue, options);
  }
  getPossibleAssignees().then(devs => {
    if (devs.length) {
      devs.forEach(function (person) {
        kb.fetcher.lookUpThing(person);
      }); // best effort async for names etc
      const opts = {
        // 'mint': '** Add new person **',
        nullLabel: '(unassigned)'
        /* 'mintStatementsFun': function (newDev) {
          var sts = [ $rdf.st(newDev, ns.rdf('type'), ns.foaf('Person')) ]
          if (proj) sts.push($rdf.st(proj, ns.doap('developer'), newDev))
          return sts
        }
        */
      };
      issueDiv.appendChild(external_UI_.widgets.makeSelectForOptions(dom, kb, issue, external_UI_.ns.wf('assignee'), devs, opts, store, function (ok, body) {
        if (ok) setModifiedDate(store, kb, store);else console.log('Failed to change assignee:\n' + body);
      }));
    }
  });

  /*  The trees of super-issues and sub-issues
  */
  function supersOver(issue, stack) {
    stack = stack || [];
    const sup = kb.any(null, external_UI_.ns.wf('dependent'), issue, issue.doc());
    if (sup) return supersOver(sup, [sup].concat(stack));
    return stack;
  }
  if (getOption(tracker, 'allowSubIssues')) {
    const subIssuePanel = issueDiv.appendChild(dom.createElement('div'));
    subIssuePanel.classList.add('trackerIssueSubIssuePanel');
    subIssuePanel.appendChild(dom.createElement('h4')).textContent = 'Super Issues';
    const listOfSupers = subIssuePanel.appendChild(dom.createElement('div'));
    listOfSupers.classList.add('trackerIssueSubIssuePanelSupersList');
    listOfSupers.refresh = function () {
      // const supers = kb.each(null, ns.wf('dependent'), issue, issue.doc())
      const supers = supersOver(issue);
      external_UI_.utils.syncTableToArrayReOrdered(listOfSupers, supers, renderSubIssue);
    };
    listOfSupers.refresh();

    // Sub issues
    subIssuePanel.appendChild(dom.createElement('h4')).textContent = 'Sub Issues';
    const listOfSubs = subIssuePanel.appendChild(dom.createElement('div'));
    listOfSubs.classList.add('trackerIssueSubIssuePanelSubsList');
    listOfSubs.refresh = function () {
      const subs = kb.each(issue, external_UI_.ns.wf('dependent'), null, issue.doc());
      external_UI_.utils.syncTableToArrayReOrdered(listOfSubs, subs, renderSubIssue);
    };
    listOfSubs.refresh();
    const b = dom.createElement('button');
    b.classList.add('trackerIssueSubIssuePanelNewSubButton');
    b.setAttribute('type', 'button');
    subIssuePanel.appendChild(b);
    const classLabel = external_UI_.utils.label(states);
    b.innerHTML = 'New sub ' + classLabel;
    b.addEventListener('click', function (_event) {
      subIssuePanel.insertBefore(newIssueForm(dom, kb, tracker, issue, listOfSubs.refresh), b.nextSibling); // Pop form just after button
    }, false);
  }
  issueDiv.appendChild(dom.createElement('br'));

  // Extras are stored centrally to the tracker
  const extrasForm = kb.any(tracker, external_UI_.ns.wf('extrasEntryForm'));
  if (extrasForm) {
    external_UI_.widgets.appendForm(dom, issueDiv, {}, issue, extrasForm, stateStore, complainIfBad);
    // issueDiv.appendChild(renderSpacer(backgroundColor))
  }

  //   Comment/discussion area

  const spacer = issueDiv.appendChild(renderSpacer(dom, backgroundColor));
  spacer.classList.add('trackerIssueSpacer');
  const template = kb.anyValue(tracker, external_UI_.ns.wf('issueURITemplate'));
  /*
  var chatDocURITemplate = kb.anyValue(tracker, ns.wf('chatDocURITemplate')) // relaive to issue
  var chat
  if (chatDocURITemplate) {
    let template = $rdf.uri.join(chatDocURITemplate, issue.uri) // Template is relative to issue
    chat = kb.sym(expandTemplate(template))
  } else
  */
  let messageStore;
  if (template) {
    messageStore = issue.doc(); // for now. Could go deeper
  } else {
    messageStore = kb.any(tracker, external_UI_.ns.wf('messageStore'));
    if (!messageStore) messageStore = kb.any(tracker, external_UI_.ns.wf('stateStore'));
    kb.sym(messageStore.uri + '#' + 'Chat' + timestring()); // var chat =
  }
  kb.fetcher.nowOrWhenFetched(messageStore, function (ok, body, _xhr) {
    if (!ok) {
      const er = dom.createElement('p');
      er.classList.add('trackerIssueMessageAreaError');
      er.textContent = body; // @@ use nice error message
      issueDiv.insertBefore(er, spacer);
    } else {
      const discussion = (0,external_UI_.messageArea)(dom, kb, issue, messageStore);
      discussion.classList.add('trackerIssueMessageArea');
      issueDiv.insertBefore(discussion, spacer);
      issueDiv.insertBefore(renderSpacer(dom, backgroundColor), discussion);
    } // Not sure why  e stuck this in upwards rather than downwards
  });

  // Draggable attachment list
  const attachmentHint = issueDiv.appendChild(dom.createElement('div'));
  attachmentHint.classList.add('trackerIssueAttachmentHint');
  attachmentHint.innerHTML = `<h4>Attachments</h4>
    <p>Drag files, emails,
    web pages onto the paper clip, or click the file upload button.</p>`;
  const uploadFolderURI = issue.uri.endsWith('/index.ttl#this') // This has a whole folder to itself
  ? issue.uri.slice(0, 14) + 'Files/' // back to slash
  : issue.dir().uri + 'Files/' + issue.uri.split('#')[1] + '/'; // New folder for issue in file with others

  external_UI_.widgets.attachmentList(dom, issue, issueDiv, {
    doc: stateStore,
    promptIcon: external_UI_.icons.iconBase + 'noun_25830.svg',
    uploadFolder: kb.sym(uploadFolderURI),
    // Allow local files to be uploaded
    predicate: external_UI_.ns.wf('attachment')
  });

  // Delete button to delete the issue
  const deleteButton = external_UI_.widgets.deleteButtonWithCheck(dom, issueDiv, 'issue', async function () {
    try {
      await kb.updater.update(kb.connectedStatements(issue));
    } catch (err) {
      complain(`Unable to delete issue: ${err}`, context);
    }
    // @@ refreshTree
    complain('DELETED OK', context);
    issueDiv.style.backgroundColor = '#eee';
    issueDiv.style.color = 'orange';
  });
  deleteButton.classList.add('trackerIssueDeleteButton');

  // Refresh button
  const refreshButton = dom.createElement('button');
  refreshButton.classList.add('trackerIssueRefreshButton');
  refreshButton.textContent = 'refresh messages';
  refreshButton.addEventListener('click', async function (_event) {
    try {
      await kb.fetcher.load(messageStore, {
        force: true,
        clearPreviousData: true
      });
    } catch (err) {
      alert(err);
      return;
    }
    external_UI_.widgets.refreshTree(issueDiv);
  }, false);
  refreshButton.setAttribute('style', external_UI_.style.button);
  issueDiv.appendChild(refreshButton);
  return issueDiv;
} // renderIssue
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/styles/newTracker.css
var newTracker = __webpack_require__(788);
;// ./src/styles/newTracker.css

      
      
      
      
      
      
      
      
      

var newTracker_options = {};

newTracker_options.styleTagTransform = (styleTagTransform_default());
newTracker_options.setAttributes = (setAttributesWithoutAttributes_default());
newTracker_options.insert = insertBySelector_default().bind(null, "head");
newTracker_options.domAPI = (styleDomAPI_default());
newTracker_options.insertStyleElement = (insertStyleElement_default());

var newTracker_update = injectStylesIntoStyleTag_default()(newTracker/* default */.A, newTracker_options);




       /* harmony default export */ const styles_newTracker = (newTracker/* default */.A && newTracker/* default */.A.locals ? newTracker/* default */.A.locals : undefined);

;// ./src/newTracker.js




const ns = external_UI_.ns;
const updater = external_SolidLogic_.store.updater;

/* Button for making a whole new tracker
** This is the least tesetd part of the tracker system at the moment.
*/
function newTrackerButton(thisTracker, context) {
  function timestring() {
    const now = new Date();
    return '' + now.getTime();
    // http://www.w3schools.com/jsref/jsref_obj_date.asp
  }

  // const dom = context.dom
  const button = external_UI_.login.newAppInstance(context.dom, {
    noun: 'tracker'
  }, function (ws, base) {
    function morph(x) {
      // Move any URIs in this space into that space
      if (x.elements !== undefined) return x.elements.map(morph); // Morph within lists
      if (x.uri === undefined) return x;
      let u = x.uri;
      if (u === stateStore.uri) return newStore; // special case
      if (u.slice(0, oldBase.length) === oldBase) {
        u = base + u.slice(oldBase.length);
      }
      return kb.sym(u);
    }
    const appPathSegment = 'issuetracker.w3.org'; // how to allocate this string and connect to
    // console.log("Ready to make new instance at "+ws)
    const sp = external_UI_.ns.space;
    const kb = context.session.store;
    if (!base) {
      base = kb.any(ws, sp('uriPrefix')).value;
      if (base.slice(-1) !== '/') {
        external_$rdf_.log.error(appPathSegment + ': No / at end of uriPrefix ' + base);
        base = base + '/';
      }
      base += appPathSegment + '/' + timestring() + '/'; // unique id
      if (!confirm('Make new tracker at ' + base + '?')) {
        return;
      }
    }
    const stateStore = kb.any(thisTracker, ns.wf('stateStore'));
    const newStore = kb.sym(base + 'store.ttl');
    const here = thisTracker.doc();
    const oldBase = here.uri.slice(0, here.uri.lastIndexOf('/') + 1);
    const there = morph(here);
    const newTracker = morph(thisTracker);
    const myConfig = kb.statementsMatching(undefined, undefined, undefined, here);
    for (let i = 0; i < myConfig.length; i++) {
      const st = myConfig[i];
      kb.add(morph(st.subject), morph(st.predicate), morph(st.object), there);
    }

    // Keep a paper trail   @@ Revisit when we have non-public ones @@ Privacy
    //
    kb.add(newTracker, external_UI_.ns.space('inspiration'), thisTracker, stateStore);
    kb.add(newTracker, external_UI_.ns.space('inspiration'), thisTracker, there);

    // $rdf.log.debug("\n Ready to put " + kb.statementsMatching(undefined, undefined, undefined, there)); //@@

    updater.put(there, kb.statementsMatching(undefined, undefined, undefined, there), 'text/turtle', function (uri2, ok, message) {
      if (ok) {
        updater.put(newStore, [], 'text/turtle', function (uri3, ok, message) {
          if (ok) {
            console.info('Ok The tracker created OK at: ' + newTracker.uri + '\nMake a note of it, bookmark it. ');
          } else {
            console.log('FAILED to set up new store at: ' + newStore.uri + ' : ' + message);
          }
        });
      } else {
        console.log('FAILED to save new tracker at: ' + there.uri + ' : ' + message);
      }
    });

    // Created new data files.
    // @@ Now create initial files - html skin, (Copy of mashlib, css?)
    // @@ Now create form to edit configuation parameters
    // @@ Optionally link new instance to list of instances -- both ways? and to child/parent?
    // @@ Set up access control for new config and store.
  }); // callback to newAppInstance
  button.classList.add('trackerNewTrackerButton');
  return button;
} // newTrackerButton
;// ./src/csvButton.js
// A Button to copy the state of the tracker in CSV format
// Comma-separated Values
//
// Yes this mixes the layers but that is not all bad if it gets it in one file
// one can look at



function quoteString(value) {
  // https://www.rfc-editor.org/rfc/rfc4180
  const stripped = value.replaceAll('\n', ' ');
  if (!stripped.includes(',')) {
    return stripped;
  } // If contains comma then put in quotes and double up internal quotes
  const quoted = '"' + stripped.replaceAll('"', '""') + '"';
  console.log('Quoted:  >>>' + quoted + '<<<');
  const check = quoted.slice(1, -1).replaceAll('""', '');
  if (check.includes('"')) throw new Error('CSV inconsistecy');
  return quoted;
}
function csvText(store, tracker) {
  function columnText(task, column) {
    let thing;
    if (column.predicate) {
      thing = store.any(task, column.predicate);
      return thing ? thing.value : '--';
    } else if (column.category) {
      const types = store.each(task, external_UI_.ns.rdf('type'));
      for (const t of types) {
        // console.log('@@ checking subclass type: ', t, ' category: ', column.category )
        if (store.holds(t, external_UI_.ns.rdfs('subClassOf'), column.category)) {
          thing = t;
        }
      }
      if (!thing) return '?' + external_UI_.utils.label(column.category); // Missing cat OK
      // if (!thing) throw new Error('wot no class of category ', column.category)
    } else {
      throw new Error('wot no pred or cat', column);
    }
    return external_UI_.utils.label(thing);
  }
  function taskLine(task) {
    return columns.map(column => columnText(task, column)).map(quoteString).join(',') + '\n';
  }
  const stateStore = store.any(tracker, external_UI_.ns.wf('stateStore'));
  const tasks = store.each(null, external_UI_.ns.wf('tracker'), tracker, stateStore);
  console.log('  CSV: Tasks:', tasks.length);
  const columns = [{
    label: 'Name',
    predicate: external_UI_.ns.dc('title')
  }
  /*  { label: 'Description',  predicate: ns.wf('description')  }, */

  /*    { label: 'State', category: ns.wf('Task') }
    */];
  const states = store.any(tracker, external_UI_.ns.wf('issueClass')); // Main states are subclasses of this class
  console.log('  CSV: States - main superclass:', states);
  const stateColumn = {
    label: 'State',
    category: states
  }; // better than  'task'
  console.log('  CSV: found column from state', stateColumn);
  columns.push(stateColumn);
  const categories = store.each(tracker, external_UI_.ns.wf('issueCategory'));
  console.log('  CSV: Categories : ', categories);
  console.log('  CSV: Categories : length: ', categories.length);
  console.log('  CSV: Categories : first: ', categories[0]);
  const classifications = categories;
  for (const c of classifications) {
    const column = {
      label: external_UI_.utils.label(c),
      category: c
    };
    console.log('  CSV: found column from classifications', column);
    columns.push(column); // Classes are different
  }

  // const propertyList = ns.wf('propertyList')
  const form = store.any(tracker, external_UI_.ns.wf('extrasEntryForm'), null, null);
  console.log('  CSV: Form : ', form);
  if (form) {
    const parts = store.any(form, external_UI_.ns.ui('parts'), null, form.doc());
    console.log('  CSV: parts : ', parts);
    const fields = parts.elements;
    console.log('  CSV: fields : ', fields);
    for (const field of fields) {
      const prop = store.any(field, external_UI_.ns.ui('property'));
      if (prop) {
        const lab = external_UI_.utils.label(prop);
        const column = {
          label: lab,
          predicate: prop
        };
        console.log('  CSV: found column from form', column);
        columns.push(column);
      }
    }
  }
  // Put description  on the end as it can be long
  columns.push({
    label: 'Description',
    predicate: external_UI_.ns.wf('description')
  });
  console.log('Columns: ', columns.length);
  const header = columns.map(col => col.label).join(',') + '\n';
  console.log('CSV: Header= ', header);
  // Order tasks?? By Creation date? By Status?
  const body = tasks.map(taskLine).join('');
  return header + body;
}
function csvButton(dom, tracker) {
  const wrapper = dom.createElement('div');
  // Add a button
  const button = external_UI_.widgets.button(dom, external_UI_.icons.iconBase + 'noun_Document_998605.svg', 'Copy as CSV', async _event => {
    const div = button.parentNode.parentNode;
    console.log('button gparent div', div);
    div.addEventListener('copy', event => {
      // alert ('Copy caught');
      const csv = csvText(external_SolidLogic_.store, tracker);
      event.clipboardData.setData('text/plain', csv);
      event.clipboardData.setData('text/csv', csv);
      alert('Copy data: ' + csv);
      event.preventDefault();
    });
  });
  wrapper.appendChild(button);
  return wrapper;
}
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/styles/csvButton.css
var styles_csvButton = __webpack_require__(472);
;// ./src/styles/csvButton.css

      
      
      
      
      
      
      
      
      

var csvButton_options = {};

csvButton_options.styleTagTransform = (styleTagTransform_default());
csvButton_options.setAttributes = (setAttributesWithoutAttributes_default());
csvButton_options.insert = insertBySelector_default().bind(null, "head");
csvButton_options.domAPI = (styleDomAPI_default());
csvButton_options.insertStyleElement = (insertStyleElement_default());

var csvButton_update = injectStylesIntoStyleTag_default()(styles_csvButton/* default */.A, csvButton_options);




       /* harmony default export */ const src_styles_csvButton = (styles_csvButton/* default */.A && styles_csvButton/* default */.A.locals ? styles_csvButton/* default */.A.locals : undefined);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/styles/issuePane.css
var issuePane = __webpack_require__(95);
;// ./src/styles/issuePane.css

      
      
      
      
      
      
      
      
      

var issuePane_options = {};

issuePane_options.styleTagTransform = (styleTagTransform_default());
issuePane_options.setAttributes = (setAttributesWithoutAttributes_default());
issuePane_options.insert = insertBySelector_default().bind(null, "head");
issuePane_options.domAPI = (styleDomAPI_default());
issuePane_options.insertStyleElement = (insertStyleElement_default());

var issuePane_update = injectStylesIntoStyleTag_default()(issuePane/* default */.A, issuePane_options);




       /* harmony default export */ const styles_issuePane = (issuePane/* default */.A && issuePane/* default */.A.locals ? issuePane/* default */.A.locals : undefined);

;// ./src/index.js
/*   Issue Tracker Pane
 **
 **  This solid view allows a user to interact with an issue tracker, or individual issue,
 ** to change its state according to an ontology, comment on it, etc.
 **
 */



 // @@ will later be in solid-UI




/* babel-plugin-inline-import './ontology/trackerSettingsForm.ttl' */
const trackerSettingsFormText = "@prefix : <http://www.w3.org/ns/ui#> .\n@prefix core: <http://www.w3.org/2005/01/wf/flow#>.\n@prefix dct: <http://purl.org/dc/terms/>.\n@prefix owl: <http://www.w3.org/2002/07/owl#>.\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.\n@prefix ui: <http://www.w3.org/ns/ui#> .\n@prefix vcard: <http://www.w3.org/2006/vcard/ns#>.\n@prefix wf: <http://www.w3.org/2005/01/wf/flow#> .\n\n  core:TrackerSettingsForm     a :Form;\n     <http://purl.org/dc/elements/1.1/title> \"Tracker Configuration Form\";\n     :parts  (\n\n      [   a ui:Heading;  ui:contents \"About the tracker\"@en ]\n\n      [ a :SingleLineTextField;\n                 :label \"Title of issue tracker\";\n                 :maxLength \"128\";\n                 :property dct:title;\n                 :size \"40\" ]\n\n      [ a :MultiLineTextField; :label \"Description\"; :property wf:description; :size \"40\" ]\n\n      [ a ui:Choice;  ui:canMintNew true; ui:use core:SuperClassForm; ui:follow true;\n          ui:property  wf:issueClass;\n          ui:label \"What states can an issue be in?\";\n          ui:from rdfs:Class;\n          ui:default wf:Task ]\n\n      [   a ui:Comment;  ui:contents \"\"\"You can optionally sort issues using (one or more) classification systems\"\"\"@en ]\n\n\n      [ a ui:Multiple;  ui:canMintNew true;  ui:part core:ClassificationForm;\n          ui:property  wf:issueCategory; ui:label \"Sort them into which category?\"; ui:from rdfs:Class ]\n\n      [ a :BooleanField;\n              :label \"Allow issues to have sub-issues\";\n              :property wf:allowSubIssues;\n              :default false ]\n\n      [ a ui:Heading;  ui:contents \"Table view:\"@en ]\n\n      [ a ui:Comment;  ui:contents \"Any extra properties to include?\"@en ]\n\n\n    [a ui:Multiple; ui:property wf:propertyList; ui:ordered true; ui:part core:PropertyForm; ui:follow true ]\n\n      [ a ui:Heading;  ui:contents \"Details of issues\"@en ]\n\n      # Use a people picker ideally\n      [ a ui:Choice;  ui:canMintNew true; ui:use core:GroupForm;\n          ui:property wf:assigneeGroup;\n          ui:label \"Assign issues to people from which group?\";\n          ui:from vcard:Group;\n          ]\n\n       # Optionally one form for extras\n\n       [ a ui:Choice;  ui:canMintNew true; ui:use ui:FormForm;\n           ui:property wf:extrasEntryForm;\n           ui:label \"Other things to save about each issue?\";\n           ui:from ui:Form;\n           ]\n\n\n    ) .\n\n    # Form for the superclass of all states\n    # @@ also We must require each state class to be stated to be a subclass of EITHER Open OR Closed.\n    core:SuperClassForm a ui:Form; dct:title \"Form for managing states\";\n      ui:parts (\n        [ a :SingleLineTextField;\n                   :label \"Name of set of states\";\n                   :defualt \"States\";\n                   :maxLength \"128\";\n                   :property rdfs:label;\n                   :size \"40\" ]\n          [a ui:Multiple; ui:property owl:disjointUnionOf; ui:ordered true; ui:part core:StateForm ]\n  #      [ a ui:Multiple; ui:property rdfs:subClassOf; ui:reverse true; ui:part core:StateForm ]\n    ) .\n\n    core:StateForm a ui:Form; dct:title \"Form for one state\";\n      ui:parts (\n                [ a :SingleLineTextField;\n                         :label \"Name of state\";\n                         :maxLength \"128\";\n                         :property rdfs:label;\n                         :size \"40\" ]\n                 [ a :ColorField; :label \"Background color\"; :property :backgroundColor ]\n                  # @@ add icon for state\n\n                 ).\n\n\n    # Form for Classification\n\n    core:ClassificationForm a ui:Form; dct:title \"Form for a classification by categpry\";\n      ui:parts (\n        [ a :SingleLineTextField;\n                   :label \"Name of classification:\";\n                   :maxLength \"128\";\n                   :property rdfs:label;\n                   :size \"40\" ]\n         [a ui:Multiple; ui:property owl:disjointUnionOf; ui:ordered true; ui:part core:CategoryForm ]\n    ) .\n\n    core:CategoryForm a ui:Form; dct:title \"Form for a category\";\n      ui:parts (\n                [ a :SingleLineTextField;\n                         :label \"Name of category\";\n                         :maxLength \"128\";\n                         :property rdfs:label;\n                         :size \"40\" ]\n                 [ a :ColorField; :label \"Background color\"; :property :backgroundColor ]\n\n                 ).\n\n   core:PropertyForm a ui:Form; ui:parts ( # Internded for raed only only marking the\n     [ a :SingleLineTextField;\n                :label \"(property name)\";\n                :maxLength \"128\";\n                :property rdfs:label;\n                :size \"40\" ]\n     ).\n\n\n    # Other ontology stuff we are otherwis missing\n\n    # we can usde ui:label to give a decent abel when the ontology uses a really bad one\n    rdfs:subClassOf ui:label \"super class\" .\n    # We can also add a specific nice label for the inverse\n    [] owl:inverse rdfs:subClassOf; rdfs:label \"sub class\" .\n    owl:disjointUnionOf ui:label \"option\" .\n\n    # Form for new group\n\n\n    core:GroupForm a ui:Form; dct:title \"Form for new contacts group\"; ui:parts (\n      [ a :SingleLineTextField;\n                 :label \"Name of new group\";\n                 :maxLength \"128\";\n                 :property vcard:fn;\n                 :size \"60\" ]\n\n      [ a ui:Heading;  ui:contents \"Members of group\"@en ]\n\n      [ a ui:Multiple; ui:label \"contacts in group\"; ui:property vcard:member; ui:part core:PersonForm ]\n\n      ).\n\n  core:PersonForm a ui:Form; dct:title \"New contact details form\"; ui:parts (\n\n  [ a :NamedNodeURIField; ui:label \"Solid ID\"; ui:property owl:sameAs; ui:size 60 ]\n\n  [ a :SingleLineTextField;\n             :label \"Name of contact\";\n             :maxLength \"128\";\n             :property vcard:fn;\n             :size \"60\" ]\n\n  [ a ui:PhoneField; :label \"Phone\"; :property vcard:phone; ] # @@ check property]\n\n  [ a :EmailField; :label \"Email\"; :property vcard:email ] # @@ check property\n\n ).\n\n# classificattion owl:disjointUnionOf ()\n        wf:Tracker     :creationForm core:SettingsForm .\n";







const src_kb = external_SolidLogic_.store;

// const MY_TRACKERS_ICON = UI.icons.iconBase + 'noun_Document_998605.svg'
// const TRACKER_ICON = UI.icons.iconBase + 'noun_list_638112'
// const TASK_ICON = UI.icons.iconBase + 'noun_17020.svg'

const OVERFLOW_CLASS = 'trackerIssuePaneOverflow';
/* harmony default export */ const src = ({
  icon: external_UI_.icons.iconBase + 'noun_122196.svg',
  // was: js/panes/issue/tbl-bug-22.png
  // noun_list_638112 is a checklist document
  // noun_Document_998605.svg is a stack of twpo checklists
  // noun_97839.svg is a ladybug
  // noun_122196.svg is a clipboard with a check list on it
  // noun_17020.svg is a single check box
  name: 'issue',
  audience: [],
  // Anyone.   was [ns.solid('PowerUser')]

  // Does the subject deserve an issue pane?
  label: function (subject, _context) {
    const t = src_kb.findTypeURIs(subject);
    if (t['http://www.w3.org/2005/01/wf/flow#Task'] || src_kb.holds(subject, external_UI_.ns.wf('tracker'))) {
      return 'issue';
    } // in case ontology not available
    if (t['http://www.w3.org/2005/01/wf/flow#Tracker']) return 'tracker';
    // Later: Person. For a list of things assigned to them,
    // open bugs on projects they are developer on, etc
    return null; // No under other circumstances (while testing at least!)
  },
  mintClass: external_UI_.ns.wf('Tracker'),
  mintNew: async function (context, options) {
    /** Perform updates on more than one document   @@ Move to rdflib!
    */
    async function updateMany(deletions, insertions) {
      const docs = deletions.concat(insertions).map(st => st.why);
      const uniqueDocs = Array.from(new Set(docs));
      const updates = uniqueDocs.map(doc => kb.updater.update(deletions.filter(st => st.why.sameTerm(doc)), insertions.filter(st => st.why.sameTerm(doc))));
      return Promise.all(updates);
    }
    const kb = context.session.store;
    let stateStore;
    if (options.newInstance) {
      stateStore = kb.sym(options.newInstance.doc().uri + '_state.ttl');
    } else {
      options.newInstance = kb.sym(options.newBase + 'index.ttl#this');
      stateStore = kb.sym(options.newBase + 'state.ttl');
    }
    const tracker = options.newInstance;
    const appDoc = tracker.doc();
    const me = external_SolidLogic_.authn.currentUser();
    if (me) {
      kb.add(tracker, external_UI_.ns.dc('author'), me, appDoc);
    }
    kb.add(tracker, external_UI_.ns.rdf('type'), external_UI_.ns.wf('Tracker'), appDoc);
    kb.add(tracker, external_UI_.ns.dc('created'), new Date(), appDoc);

    // @@ to do --- adk user what sort of tracker they want

    kb.add(tracker, external_UI_.ns.wf('issueClass'), external_UI_.ns.wf('Task'), appDoc); // @@ ask user
    kb.add(tracker, external_UI_.ns.wf('initialState'), external_UI_.ns.wf('Open'), appDoc);
    kb.add(tracker, external_UI_.ns.wf('stateStore'), stateStore, appDoc);
    kb.add(tracker, external_UI_.ns.wf('assigneeClass'), external_UI_.ns.foaf('Person'), appDoc); // @@ set to people in the meeting?

    kb.add(tracker, external_UI_.ns.wf('stateStore'), stateStore, stateStore); // Back Link

    const ins = kb.statementsMatching(undefined, undefined, undefined, appDoc).concat(kb.statementsMatching(undefined, undefined, undefined, stateStore));
    try {
      await updateMany([], ins);
    } catch (err) {
      return external_UI_.widgets.complain(context, 'Error writing tracker configuration: ' + err);
    }
    /*
    try {
      await kb.updater.updateMany([], kb.statementsMatching(undefined, undefined, undefined, stateStore))
    } catch (err) {
      return widgets.complain(context, 'Error writing tracker state file: ' + err)
    }
    */
    const dom = context.dom;
    const div = options.div;
    const notice = div.appendChild(dom.createElement('div'));
    notice.innerHTML = `<h4>Success</h4>
    <p>Your <a href="${tracker.uri}">new tracker</a> has been made.
    Use the settings tab to configure it.
    </p>
    `;
    // console.log('New tracker created ' + tracker)
    // alert('New tracker created')
    return options;
  },
  render: function (subject, context) {
    const dom = context.dom;
    const paneDiv = dom.createElement('div');
    context.paneDiv = paneDiv;
    paneDiv.setAttribute('class', 'issuePane');
    function complain(message) {
      console.warn(message);
      paneDiv.appendChild(external_UI_.widgets.errorMessageBlock(dom, message));
    }
    function complainIfBad(ok, message) {
      if (!ok) {
        complain(message);
      }
    }

    /** Infer subclass from disjoint Union
    **
    ** This is would not be needed if our quey language
    ** allowed is to query ardf Collection membership.
    */
    async function fixSubClasses(kb, tracker) {
      // 20220228
      async function checkOneSuperclass(klass) {
        const collection = kb.any(klass, external_UI_.ns.owl('disjointUnionOf'), null, doc);
        if (!collection) throw new Error(`Classification ${klass} has no disjointUnionOf`);
        if (!collection.elements) throw new Error(`Classification ${klass} has no array`);
        const needed = new Set(collection.elements.map(x => x.uri));
        const existing = new Set(kb.each(null, external_UI_.ns.rdfs('subClassOf'), klass, doc).map(x => x.uri));
        const superfluous = [...existing].filter(sub => !needed.has(sub));
        const deleteActions = superfluous.map(sub => {
          return {
            action: 'delete',
            st: external_$rdf_.st(kb.sym(sub), external_UI_.ns.rdfs('subClassOf'), klass, doc)
          };
        });
        const missing = [...needed].filter(sub => !existing.has(sub));
        const insertActions = missing.map(sub => {
          return {
            action: 'insert',
            st: external_$rdf_.st(kb.sym(sub), external_UI_.ns.rdfs('subClassOf'), klass, doc)
          };
        });
        return deleteActions.concat(insertActions);
      }
      const doc = tracker.doc();
      const states = kb.any(tracker, external_UI_.ns.wf('issueClass'));
      const cats = kb.each(tracker, external_UI_.ns.wf('issueCategory')).concat([states]);
      let damage = []; // to make totally functionaly  need to deal with map over async.
      for (const klass of cats) {
        damage = damage.concat(await checkOneSuperclass(klass));
      }
      if (damage.length) {
        const insertables = damage.filter(fix => fix.action === 'insert').map(fix => fix.st);
        const deletables = damage.filter(fix => fix.action === 'delete').map(fix => fix.st);
        // alert(`Internal error: s${damage} subclasses inconsistences!`)
        console.log('Damage:', damage);
        if (confirm(`Fix ${damage} inconsistent subclasses in tracker config?`)) {
          await kb.updater.update(deletables, insertables);
        }
      }
    }

    /** /////////////////////////// Board
    */
    function renderBoard(tracker, klass) {
      const states = src_kb.any(tracker, external_UI_.ns.wf('issueClass'));
      klass = klass || states; // default to states
      const doingStates = klass.sameTerm(states);

      // These are states we will show by default: the open issues.
      const stateArray = src_kb.any(klass, external_UI_.ns.owl('disjointUnionOf'));
      if (!stateArray) {
        return complain(`Configuration error: state ${states} does not have substates`);
      }
      let columnValues = stateArray.elements;
      if (doingStates && columnValues.length > 2 // and there are more than two
      ) {
        // strip out closed states
        columnValues = columnValues.filter(state => src_kb.holds(state, external_UI_.ns.rdfs('subClassOf'), external_UI_.ns.wf('Open')) || state.sameTerm(external_UI_.ns.wf('Open')));
      }
      async function columnDropHandler(issue, newState) {
        const currentState = getState(issue, klass);
        const tracker = src_kb.the(issue, external_UI_.ns.wf('tracker'), null, issue.doc());
        const stateStore = src_kb.any(tracker, external_UI_.ns.wf('stateStore'));
        if (newState.sameTerm(currentState)) {
          // alert('Same state ' + utils.label(currentState)) // @@ remove
          return;
        }
        try {
          await src_kb.updater.update([external_$rdf_.st(issue, external_UI_.ns.rdf('type'), currentState, stateStore)], [external_$rdf_.st(issue, external_UI_.ns.rdf('type'), newState, stateStore)]);
        } catch (err) {
          external_UI_.widgets.complain(context, 'Unable to change issue state: ' + err);
        }
        boardDiv.refresh(); // reorganize board to match the new reality
      }
      function isOpen(issue) {
        const types = src_kb.findTypeURIs(issue);
        return !!types[external_UI_.ns.wf('Open').uri];
      }
      const options = {
        columnDropHandler,
        filter: doingStates ? null : isOpen
      };
      options.sortBy = external_UI_.ns.dct('created');
      options.sortReverse = true;
      function localRenderIssueCard(issue) {
        return renderIssueCard(issue, context);
      }
      // const columnValues = states // @@ optionally selected states would work
      const boardDiv = board_board(dom, columnValues, localRenderIssueCard, options);
      boardDiv.classList.add('trackerBoard');
      return boardDiv;
    }

    /** ////////////// Table
    */
    function tableRefreshButton(stateStore, tableDiv) {
      const refreshButton = external_UI_.widgets.button(dom, external_UI_.icons.iconBase + 'noun_479395.svg', 'refresh table', async _event => {
        try {
          await src_kb.fetcher.load(stateStore, {
            force: true,
            clearPreviousData: true
          });
        } catch (err) {
          alert(err);
          return;
        }
        external_UI_.widgets.refreshTree(tableDiv);
      });
      return refreshButton;
    }
    function renderTable(tracker) {
      function newOptionalClause() {
        const clause = new external_$rdf_.IndexedFormula();
        query.pat.optional.push(clause);
        return clause;
      }
      const states = src_kb.any(subject, external_UI_.ns.wf('issueClass'));
      const cats = src_kb.each(tracker, external_UI_.ns.wf('issueCategory')); // zero or more
      const vars = ['issue', 'state', 'created'];
      const query = new external_$rdf_.Query(external_UI_.utils.label(subject));
      for (let i = 0; i < cats.length; i++) {
        vars.push('_cat_' + i);
      }
      const v = {}; // The RDF variable objects for each variable name
      vars.forEach(function (x) {
        query.vars.push(v[x] = external_$rdf_.variable(x));
      });
      query.pat.add(v.issue, external_UI_.ns.wf('tracker'), tracker);
      // query.pat.add(v['issue'], ns.dc('title'), v['title'])
      query.pat.add(v.issue, external_UI_.ns.dct('created'), v.created);
      query.pat.add(v.issue, external_UI_.ns.rdf('type'), v.state);
      query.pat.add(v.state, external_UI_.ns.rdfs('subClassOf'), states);
      query.pat.optional = [];
      for (let i = 0; i < cats.length; i++) {
        const clause = newOptionalClause();
        clause.add(v.issue, external_UI_.ns.rdf('type'), v['_cat_' + i]);
        clause.add(v['_cat_' + i], external_UI_.ns.rdfs('subClassOf'), cats[i]);
      }
      const propertyList = src_kb.any(tracker, external_UI_.ns.wf('propertyList')); // List of extra properties
      if (propertyList) {
        const properties = propertyList.elements;
        for (let p = 0; p < properties.length; p++) {
          const prop = properties[p];
          let vname = '_prop_' + p;
          if (prop.uri.indexOf('#') >= 0) {
            vname = prop.uri.split('#')[1];
          }
          const oneOpt = newOptionalClause();
          query.vars.push(v[vname] = external_$rdf_.variable(vname));
          oneOpt.add(v.issue, prop, v[vname]);
        }
      }
      const selectedStates = {};
      const possible = src_kb.each(undefined, external_UI_.ns.rdfs('subClassOf'), states);
      possible.forEach(function (s) {
        if (src_kb.holds(s, external_UI_.ns.rdfs('subClassOf'), external_UI_.ns.wf('Open')) || s.sameTerm(external_UI_.ns.wf('Open'))) {
          selectedStates[s.uri] = true;
          // console.log('on '+s.uri); // @@
        }
      });
      function exposeThisOverlay(href) {
        const subject = external_$rdf_.sym(href);
        exposeOverlay(subject, context);
      }
      const tableDiv = (0,external_UI_.table)(dom, {
        query,
        keyVariable: '?issue',
        // Charactersic of row
        sortBy: '?created',
        // By default, sort by date
        sortReverse: true,
        //   most recent at the top
        hints: {
          '?issue': {
            linkFunction: exposeThisOverlay,
            label: 'Title'
          },
          '?created': {
            cellFormat: 'shortDate'
          },
          '?state': {
            initialSelection: selectedStates,
            label: 'Status'
          }
        }
      });
      const stateStore = src_kb.any(subject, external_UI_.ns.wf('stateStore'));
      tableDiv.appendChild(tableRefreshButton(stateStore, tableDiv));
      tableDiv.classList.add('trackerBoardTable');
      return tableDiv;
    }

    // Allow user to create new things within the folder
    function renderCreationControl(refreshTarget) {
      const creationDiv = dom.createElement('div');
      const me = external_SolidLogic_.authn.currentUser();
      const creationContext = {
        // folder: subject,
        div: creationDiv,
        dom,
        noun: 'tracker',
        statusArea: creationDiv,
        me,
        refreshTarget
      };
      const issuePane = context.session.paneRegistry.byName('issue');
      const relevantPanes = [issuePane];
      external_UI_.create.newThingUI(creationContext, context, relevantPanes); // Have to pass panes down  newUI
      creationDiv.classList.add('trackerCreationControlContainer');
      return creationDiv;
    }
    function renderInstances(theClass) {
      const instancesDiv = dom.createElement('div');
      const context = {
        dom,
        div: instancesDiv,
        noun: 'tracker'
      };
      external_UI_.login.registrationList(context, {
        public: true,
        private: true,
        type: theClass
      }).then(_context2 => {
        instancesDiv.appendChild(renderCreationControl(instancesDiv));
        /* // keep this code in case we need a form
        const InstancesForm = ns.wf('TrackerInstancesForm')
        const text = trackerInstancesFormText
        $rdf.parse(text, kb, InstancesForm.doc().uri, 'text/turtle')
        widgets.appendForm(dom, instancesDiv, {}, tracker, InstancesForm,
          tracker.doc(), complainIfBad)
        */
      });
      return instancesDiv;
    }
    function renderSettings(tracker) {
      const settingsDiv = dom.createElement('div');
      settingsDiv.appendChild(csvButton(dom, tracker)); // Button to copy the tracker as a CSV file
      const states = src_kb.any(tracker, external_UI_.ns.wf('issueClass'));
      const views = [tableView, states] // Possible default views
      .concat(src_kb.each(tracker, external_UI_.ns.wf('issueCategory')));
      const box = settingsDiv.appendChild(dom.createElement('div'));
      const lhs = external_UI_.widgets.renderNameValuePair(dom, src_kb, box, null, 'Default view'); // @@ use a predicate?
      lhs.appendChild(external_UI_.widgets.makeSelectForOptions(dom, src_kb, tracker, external_UI_.ns.wf('defaultView'), views, {}, tracker.doc()));

      // A registration control allows the to record this tracker in their type index
      const context = {
        dom,
        div: settingsDiv,
        noun: 'tracker'
      };
      external_UI_.login.registrationControl(context, tracker, external_UI_.ns.wf('Tracker')).then(_context2 => {
        const settingsForm = external_UI_.ns.wf('TrackerSettingsForm');
        const text = trackerSettingsFormText;
        external_$rdf_.parse(text, src_kb, settingsForm.doc().uri, 'text/turtle');
        external_UI_.widgets.appendForm(dom, settingsDiv, {}, tracker, settingsForm, tracker.doc(), complainIfBad);
      });
      return settingsDiv;
    }
    function renderTabsTableAndBoard() {
      function renderMain(ele, object) {
        ele.innerHTML = ''; // Clear out "loading message"
        if (object.sameTerm(boardView)) {
          ele.appendChild(renderBoard(tracker));
        } else if (object.sameTerm(tableView)) {
          ele.appendChild(renderTable(tracker));
        } else if (object.sameTerm(settingsView)) {
          ele.appendChild(renderSettings(tracker));
        } else if (object.sameTerm(instancesView)) {
          ele.appendChild(renderInstances(external_UI_.ns.wf('Tracker')));
        } else if (src_kb.holds(tracker, external_UI_.ns.wf('issueCategory'), object) || src_kb.holds(tracker, external_UI_.ns.wf('issueClass'), object)) {
          ele.appendChild(renderBoard(tracker, object));
        } else {
          throw new Error('Unexpected tab type: ' + object);
        }
      }
      const states = src_kb.any(tracker, external_UI_.ns.wf('issueClass'));
      const items = [instancesView, tableView, states].concat(src_kb.each(tracker, external_UI_.ns.wf('issueCategory')));
      items.push(settingsView);
      const selectedTab = src_kb.any(tracker, external_UI_.ns.wf('defaultView'), null, tracker.doc()) || tableView;
      const options = {
        renderMain,
        items,
        selectedTab
      };

      // Add stuff to the ontologies which we believe but they don't say
      const doc = instancesView.doc();
      src_kb.add(instancesView, external_UI_.ns.rdfs('label'), 'My Trackers', doc); // @@ squatting on wf ns
      src_kb.add(settingsView, external_UI_.ns.rdfs('label'), 'Settings', doc); // @@ squatting on wf ns
      src_kb.add(states, external_UI_.ns.rdfs('label'), 'By State', doc); // @@ squatting on wf ns

      const myTabs = external_UI_.tabs.tabWidget(options);
      return myTabs;
    }
    async function renderSingleIssue() {
      tracker = src_kb.any(subject, external_UI_.ns.wf('tracker'));
      if (!tracker) throw new Error('This issue ' + subject + 'has no tracker');

      // Much data is in the tracker instance, so wait for the data from it
      try {
        // eslint-disable-next-line no-unused-vars
        const _xhrs = await context.session.store.fetcher.load(tracker.doc());
      } catch (err) {
        const msg = 'Failed to load tracker config ' + tracker.doc() + ': ' + err;
        return complain(msg);
      }
      const stateStore = src_kb.any(tracker, external_UI_.ns.wf('stateStore'));
      if (!stateStore) {
        return complain('Tracker has no state store: ' + tracker);
      }
      try {
        await context.session.store.fetcher.load(subject);
      } catch (err) {
        return complain('Failed to load issue state ' + stateStore + ': ' + err);
      }
      paneDiv.appendChild(renderIssue(subject, context));
      updater.addDownstreamChangeListener(stateStore, function () {
        external_UI_.widgets.refreshTree(paneDiv);
      }); // Live update
    }
    async function renderTracker() {
      function showNewIssue(issue) {
        external_UI_.widgets.refreshTree(paneDiv);
        exposeOverlay(issue, context);
        newIssueButton.disabled = false; // https://stackoverflow.com/questions/41176582/enable-disable-a-button-in-pure-javascript
      }
      tracker = subject;
      try {
        await fixSubClasses(src_kb, tracker);
      } catch (err) {
        console.log('@@@ Error fixing subclasses in config: ' + err);
      }
      const states = src_kb.any(subject, external_UI_.ns.wf('issueClass'));
      if (!states) throw new Error('This tracker has no issueClass');
      const stateStore = src_kb.any(subject, external_UI_.ns.wf('stateStore'));
      if (!stateStore) throw new Error('This tracker has no stateStore');

      // const me = await authn.currentUser()

      const h = dom.createElement('h2');
      h.setAttribute('style', 'font-size: 150%');
      paneDiv.appendChild(h);
      const classLabel = external_UI_.utils.label(states);
      h.appendChild(dom.createTextNode(classLabel + ' list')); // Use class label @@I18n

      // New Issue button
      const newIssueButton = dom.createElement('button');
      const container = dom.createElement('div');
      newIssueButton.setAttribute('type', 'button');
      newIssueButton.classList.add('trackerIssuePaneNewIssueButton');
      container.classList.add('trackerIssuePaneNewIssueButtonContainer');
      container.appendChild(newIssueButton);
      paneDiv.appendChild(container);
      const img = dom.createElement('img');
      img.classList.add('trackerIssuePaneNewIssueButtonImage');
      img.setAttribute('src', external_UI_.icons.iconBase + 'noun_19460_green.svg');
      newIssueButton.appendChild(img);
      const span = dom.createElement('span');
      span.classList.add('trackerIssuePaneNewIssueButtonText');
      span.innerHTML = 'New ' + classLabel;
      newIssueButton.appendChild(span);
      newIssueButton.addEventListener('click', function (_event) {
        newIssueButton.disabled = true;
        container.appendChild(newIssueForm(dom, src_kb, tracker, null, showNewIssue));
      }, false);

      // Table of issues - when we have the main issue list
      // We also need the ontology loaded
      //
      context.session.store.fetcher.load([stateStore]).then(function (_xhrs) {
        const tableDiv = renderTabsTableAndBoard(tracker);
        // const tableDiv = renderTable(tracker) // was
        paneDiv.appendChild(tableDiv);
        if (tableDiv.refresh) {
          // Refresh function
        } else {
          console.log('No table refresh function?!');
        }
        paneDiv.appendChild(newTrackerButton(subject, context));
        updater.addDownstreamChangeListener(stateStore, tableDiv.refresh); // Live update
      }).catch(function (err) {
        return console.log('Cannot load state store: ' + err);
      });
      // end of Tracker instance
    } // render tracker

    /* Render tabs with both views
    */
    const boardView = external_UI_.ns.wf('BoardView');
    const tableView = external_UI_.ns.wf('TableView');
    const settingsView = external_UI_.ns.wf('SettingsView');
    const instancesView = external_UI_.ns.wf('InstancesView');
    const updater = src_kb.updater;
    const t = src_kb.findTypeURIs(subject);
    let tracker;

    // Whatever we are rendering, lets load the ontology
    const flowOntology = external_UI_.ns.wf('').doc();
    if (!src_kb.holds(undefined, undefined, undefined, flowOntology)) {
      // If not loaded already
      external_$rdf_.parse(__webpack_require__(240), src_kb, flowOntology.uri, 'text/turtle'); // Load ontology directly
    }
    const userInterfaceOntology = external_UI_.ns.ui('').doc();
    if (!src_kb.holds(undefined, undefined, undefined, userInterfaceOntology)) {
      // If not loaded already
      external_$rdf_.parse(__webpack_require__(197), src_kb, userInterfaceOntology.uri, 'text/turtle'); // Load ontology directly
    }

    // Render a single issue
    if (t['http://www.w3.org/2005/01/wf/flow#Task'] || src_kb.holds(subject, external_UI_.ns.wf('tracker'))) {
      renderSingleIssue().then(() => console.log('Single issue rendered'));
    } else if (t['http://www.w3.org/2005/01/wf/flow#Tracker']) {
      //          Render a Tracker instance
      renderTracker().then(() => console.log('Tracker rendered'));
    } else {
      console.log('Error: Issue pane: No evidence that ' + subject + ' is either a bug or a tracker.');
    }
    let loginOutButton;
    const overlay = paneDiv.appendChild(dom.createElement('div'));
    overlay.classList.add(OVERFLOW_CLASS);
    context.overlay = overlay;
    overlay.style.visibility = 'hidden';
    external_SolidLogic_.authn.checkUser().then(webId => {
      if (webId) {
        console.log('Web ID set already: ' + webId);
        context.me = webId;
        // @@ enable things
        return;
      }
      loginOutButton = external_UI_.login.loginStatusBox(dom, webIdUri => {
        if (webIdUri) {
          context.me = src_kb.sym(webIdUri);
          console.log('Web ID set from login button: ' + webIdUri);
          paneDiv.removeChild(loginOutButton);
          // enable things
        } else {
          context.me = null;
        }
      });
      loginOutButton.classList.add('trackerIssuePaneLoginButton');
      paneDiv.appendChild(loginOutButton);
      if (!context.statusArea) {
        context.statusArea = paneDiv.appendChild(dom.createElement('div'));
      }
    });
    return paneDiv;
  }
});
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=issue-pane.js.map