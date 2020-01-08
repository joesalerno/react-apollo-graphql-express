module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/BasicLayout.js":
/*!***********************************!*\
  !*** ./components/BasicLayout.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _NavBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NavBar */ "./components/NavBar.js");
/* harmony import */ var _BasicLayout_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BasicLayout.scss */ "./components/BasicLayout.scss");
/* harmony import */ var _BasicLayout_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_BasicLayout_scss__WEBPACK_IMPORTED_MODULE_2__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


/* harmony default export */ __webpack_exports__["default"] = (props => __jsx("div", {
  className: "Screen"
}, __jsx(_NavBar__WEBPACK_IMPORTED_MODULE_1__["default"], props), __jsx("div", {
  className: "Frame"
}, props.children)));

/***/ }),

/***/ "./components/BasicLayout.scss":
/*!*************************************!*\
  !*** ./components/BasicLayout.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/HomePage.js":
/*!********************************!*\
  !*** ./components/HomePage.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _WindowLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WindowLayout */ "./components/WindowLayout.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const HomePage = ({
  user,
  logout,
  cookie
}) => __jsx(_WindowLayout__WEBPACK_IMPORTED_MODULE_1__["default"], {
  logo: true,
  height: "400px",
  width: "400px",
  user: user,
  logout: logout
}, __jsx("div", {
  style: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "100%"
  }
}, __jsx("h1", {
  style: {
    marginBottom: "0"
  }
}, "Welcome ", user), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], {
  variant: "contained",
  color: "primary",
  onClick: logout,
  style: {
    margin: "auto"
  }
}, " Logout ")));

/* harmony default export */ __webpack_exports__["default"] = (HomePage);

/***/ }),

/***/ "./components/LoginPage.js":
/*!*********************************!*\
  !*** ./components/LoginPage.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/icons/LockOutlined */ "@material-ui/icons/LockOutlined");
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/Visibility */ "@material-ui/icons/Visibility");
/* harmony import */ var _material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons/VisibilityOff */ "@material-ui/icons/VisibilityOff");
/* harmony import */ var _material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_TTMTechnologiesLogo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/TTMTechnologiesLogo */ "./components/TTMTechnologiesLogo.js");
/* harmony import */ var _components_BasicLayout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/BasicLayout */ "./components/BasicLayout.js");
/* harmony import */ var _LoginPage_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./LoginPage.scss */ "./components/LoginPage.scss");
/* harmony import */ var _LoginPage_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_LoginPage_scss__WEBPACK_IMPORTED_MODULE_7__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;









const LoginPage = ({
  login,
  logout,
  user
}) => {
  //------------------------- Initialize Component -----------------------------
  const {
    0: username,
    1: setUsername
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: password,
    1: setPassword
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: showPassword,
    1: setShowPassword
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const inputRefs = {};

  const focusNextInput = () => {
    if (!validUsername().valid) inputRefs.username.focus();else if (!validPassword().valid) inputRefs.password.focus();
  };

  const validUsername = () => username.length > 0 ? {
    valid: true
  } : {
    err: "Please enter a valid username (1 or more characters)"
  };

  const validPassword = () => password.length > 3 ? {
    valid: true
  } : {
    err: "Please enter a valid username (4 or more characters)"
  };

  const validInput = validUsername().valid && validPassword().valid;

  const handleChange = event => {
    const {
      target: {
        id,
        value
      }
    } = event;
    if (id === "username") setUsername(value);
    if (id === "password") setPassword(value);
  };

  const handleKeyDown = event => {
    if (event.key === "Enter") validInput ? login(username, password) : focusNextInput();
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword); //-------------------------------- Render ------------------------------------


  return __jsx(_components_BasicLayout__WEBPACK_IMPORTED_MODULE_6__["default"], {
    user: user,
    logout: logout
  }, __jsx("div", {
    className: "LoginPage"
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["NoSsr"], null, __jsx(_components_TTMTechnologiesLogo__WEBPACK_IMPORTED_MODULE_5__["default"], {
    style: {
      height: "84px",
      width: "500px",
      maxWidth: "100%",
      margin: "auto auto 30px auto"
    }
  }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Avatar"], null, " ", __jsx(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_2___default.a, null), " "), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
    component: "h1",
    variant: "h5",
    style: {
      textAlign: "center",
      margin: "8px 0px 38px 0px"
    }
  }, " CAM Login "), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], {
    value: username,
    id: "username",
    inputRef: ref => {
      inputRefs.username = ref;
    },
    label: "Enter Username",
    variant: "outlined",
    margin: "dense",
    autoComplete: "username",
    autoFocus: true,
    required: true,
    onKeyDown: handleKeyDown,
    onChange: handleChange,
    style: {
      backgroundColor: "white",
      margin: "5px",
      width: "250px"
    }
  }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], {
    value: password,
    id: "password",
    inputRef: ref => {
      inputRefs.password = ref;
    },
    label: "Enter Password",
    variant: "outlined",
    margin: "dense",
    autoComplete: "password",
    required: true,
    onKeyDown: handleKeyDown,
    onChange: handleChange,
    InputProps: {
      type: showPassword ? "text" : "password",
      endAdornment: __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["InputAdornment"], {
        position: "end"
      }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["IconButton"], {
        onClick: handleClickShowPassword
      }, showPassword ? __jsx(_material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_3___default.a, null) : __jsx(_material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_4___default.a, null)))
    },
    style: {
      backgroundColor: "white",
      margin: "5px",
      width: "250px"
    }
  }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    id: "login",
    color: "primary",
    variant: "contained",
    disabled: !validUsername().valid || !validPassword().valid,
    onClick: () => login(username, password),
    style: {
      margin: "8px 5px 8px 5px",
      width: "250px"
    }
  }, " Login "), __jsx("div", {
    className: "Links"
  }, __jsx("a", {
    href: "/"
  }, "Register"), __jsx("a", {
    href: "/"
  }, "Forgot Password")))));
};

/* harmony default export */ __webpack_exports__["default"] = (LoginPage);

/***/ }),

/***/ "./components/LoginPage.scss":
/*!***********************************!*\
  !*** ./components/LoginPage.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/NavBar.js":
/*!******************************!*\
  !*** ./components/NavBar.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _NavBar_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NavBar.scss */ "./components/NavBar.scss");
/* harmony import */ var _NavBar_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_NavBar_scss__WEBPACK_IMPORTED_MODULE_2__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const NavBar = ({
  user,
  logout
}) => __jsx("div", {
  className: "NavBar",
  style: {
    display: user ? "flex" : "none"
  }
}, __jsx(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default.a, {
  variant: "contained",
  color: "primary",
  onClick: logout
}, "Log Out ", user));

/* harmony default export */ __webpack_exports__["default"] = (NavBar);

/***/ }),

/***/ "./components/NavBar.scss":
/*!********************************!*\
  !*** ./components/NavBar.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/TTMTechnologiesLogo.js":
/*!*******************************************!*\
  !*** ./components/TTMTechnologiesLogo.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-properties */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-properties.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-descriptors */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-descriptor */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-symbols */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _public_ttmvectorlogoblue_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../public/ttmvectorlogoblue.svg */ "./public/ttmvectorlogoblue.svg");
/* harmony import */ var _public_ttmvectorlogoblue_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_public_ttmvectorlogoblue_svg__WEBPACK_IMPORTED_MODULE_8__);








var __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default()(object); if (_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default.a) { var symbols = _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default()(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }); } else if (_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default.a) { _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default()(target, _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default()(source)); } else { ownKeys(Object(source)).forEach(function (key) { _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(target, key, _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(source, key)); }); } } return target; }



const TTMTechnologiesLogo = ({
  style
}) => __jsx("div", {
  style: _objectSpread({}, style, {
    background: `url(${_public_ttmvectorlogoblue_svg__WEBPACK_IMPORTED_MODULE_8___default.a})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  })
});

/* harmony default export */ __webpack_exports__["default"] = (TTMTechnologiesLogo);

/***/ }),

/***/ "./components/WindowLayout.js":
/*!************************************!*\
  !*** ./components/WindowLayout.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-properties */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-properties.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-descriptors */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-descriptor */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-symbols */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_TTMTechnologiesLogo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/TTMTechnologiesLogo */ "./components/TTMTechnologiesLogo.js");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Paper */ "@material-ui/core/Paper");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _NavBar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./NavBar */ "./components/NavBar.js");
/* harmony import */ var _WindowLayout_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./WindowLayout.scss */ "./components/WindowLayout.scss");
/* harmony import */ var _WindowLayout_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_WindowLayout_scss__WEBPACK_IMPORTED_MODULE_11__);








var __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default()(object); if (_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default.a) { var symbols = _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default()(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }); } else if (_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default.a) { _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default()(target, _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default()(source)); } else { ownKeys(Object(source)).forEach(function (key) { _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(target, key, _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(source, key)); }); } } return target; }





/* harmony default export */ __webpack_exports__["default"] = (props => __jsx("div", {
  className: "Screen"
}, __jsx(_NavBar__WEBPACK_IMPORTED_MODULE_10__["default"], props), __jsx("div", {
  className: "Frame"
}, !props.logo ? null : __jsx(_components_TTMTechnologiesLogo__WEBPACK_IMPORTED_MODULE_8__["default"], {
  style: {
    margin: "auto auto 30px auto",
    height: props.windowStyle && props.windowStyle.width || props.width ? `calc(${props.windowStyle && props.windowStyle.width || props.width}/6)` : "63px",
    width: props.windowStyle && props.windowStyle.width || props.width ? `${props.windowStyle && props.windowStyle.width || props.width}` : "380px"
  }
}), __jsx(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9___default.a, {
  className: "Window",
  component: "main",
  style: _objectSpread({
    margin: props.logo ? "0 auto auto auto" : "auto",
    height: props.height || "",
    width: props.width || "380px"
  }, props.windowStyle)
}, props.children))));

/***/ }),

/***/ "./components/WindowLayout.scss":
/*!**************************************!*\
  !*** ./components/WindowLayout.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/define-properties.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/define-properties.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/define-properties */ "core-js/library/fn/object/define-properties");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/define-property */ "core-js/library/fn/object/define-property");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-descriptor */ "core-js/library/fn/object/get-own-property-descriptor");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-descriptors */ "core-js/library/fn/object/get-own-property-descriptors");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-symbols */ "core-js/library/fn/object/get-own-property-symbols");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/keys.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/keys */ "core-js/library/fn/object/keys");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _defineProperty; });
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./pages/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_LoginPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/LoginPage */ "./components/LoginPage.js");
/* harmony import */ var _components_HomePage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/HomePage */ "./components/HomePage.js");

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const Index = ({
  user,
  setUser,
  cookie,
  setCookie,
  removeCookie
}) => {
  const login = (username, password) => {
    setUser(username);
    setCookie("user", username);
  };

  const logout = () => {
    setUser(undefined);
    removeCookie("user");
  };

  if (!user) return __jsx(_components_LoginPage__WEBPACK_IMPORTED_MODULE_2__["default"], {
    user: user,
    login: login,
    logout: logout
  });
  return __jsx(_components_HomePage__WEBPACK_IMPORTED_MODULE_3__["default"], {
    user: user,
    login: login,
    logout: logout,
    cookie: cookie
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ }),

/***/ "./pages/index.scss":
/*!**************************!*\
  !*** ./pages/index.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./public/ttmvectorlogoblue.svg":
/*!**************************************!*\
  !*** ./public/ttmvectorlogoblue.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAyMDAxMDkwNC8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwcHgiIGhlaWdodD0iMTk5cHgiIHZpZXdCb3g9IjAgMCAxMjAwMCAxOTkwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij4KPGcgaWQ9ImxheWVyMTAxIiBmaWxsPSIjMDA1MjkxIiBzdHJva2U9Im5vbmUiPgogPHBhdGggZD0iTTk0NTUgMTk3OCBjLTE2IC02IC00OCAtMTcgLTcxIC0yNSAtMjIgLTggLTUzIC0yNSAtNjkgLTM3IGwtMjkgLTIzIDM5IC0xMDIgYzIxIC01NiA0MiAtMTA0IDQ3IC0xMDcgNCAtMyAyMyA3IDQxIDIyIDUwIDQzIDEwNiA2NCAxNzAgNjQgOTcgMCAxNTggLTQxIDE3MyAtMTE5IGw2IC0zMSAtNDIgMTUgYy02MCAyMSAtMTY1IDE5IC0yMTUgLTQgLTkyIC00NCAtMTQwIC0xMTcgLTE0NyAtMjI4IC0xIC0xOCAtNSAtMzMgLTggLTMzIC0zIDAgLTE3IDI3IC0zMiA1OSAtODYgMTg0IC0zMjMgMjczIC01NDMgMjA0IC0xMzYgLTQzIC0yMDUgLTE0NyAtMjA1IC0zMDggMCAtMTkzIDExMCAtMzgwIDI1NSAtNDM0IDEyNSAtNDcgMjc0IC00NiAzODEgMyA2NCAyOSA5OSA2NiAxMzIgMTM2IDIxIDQ1IDI2IDcwIDI2IDE0MSBsMSA4NyAyNSAtNzIgYzU2IC0xNTggMTUyIC0yNDcgMzE1IC0yOTIgNzIgLTE5IDUxMCAtMzMgNTI2IC0xNyA3IDcgMSA0OCAtMTkgMTI0IC00MCAxNTYgLTQ2IDE4MiAtMTM0IDU4OSAtNTEgMjM5IC0xMTUgMzIxIC0yOTcgMzgwIC02NCAyMSAtMjc1IDI2IC0zMjYgOHogbS00ODAgLTU0NCBjNTkgLTYwIDExMCAtMzA5IDczIC0zNTYgLTQ5IC02MCAtMTE5IDEyIC0xNTMgMTU0IC0xNyA3MyAtMTkgMTcxIC01IDE5OSAxMyAyNCA2MiAyNiA4NSAzeiBtODEyIC0yIGMxOCAtMTMgMjkgLTUwIDU4IC0xNzggMTkgLTg4IDM1IC0xNjMgMzUgLTE2NyAwIC0xMiAtNDkgLTggLTgzIDcgLTcxIDMwIC0xMTkgMTIxIC0xMjEgMjI5IC0xIDY2IDAgNzAgMzIgOTggMzcgMzMgNDkgMzUgNzkgMTF6Ii8+CiA8cGF0aCBkPSJNNzY1OSAxNjUwIGMtMjA1IC0zNSAtMzAzIC0yMDEgLTI1NSAtNDMwIDUwIC0yMzUgMjAzIC0zNjMgNDM2IC0zNjMgMTYwIDAgMjYwIDUwIDMxNSAxNTggMjkgNTYgMzAgNjQgMjkgMTg0IDAgMTA3IC00IDEzNSAtMjQgMTg2IC01OSAxNTMgLTE3MSAyNDEgLTMzNSAyNjUgLTc5IDExIC0xMDEgMTEgLTE2NiAweiBtMTQwIC0yMTkgYzMxIC0zMSA1MCAtNzQgNjcgLTE1MyAxOSAtOTMgMjIgLTE4MSA2IC0yMDEgLTM1IC00MiAtOTYgLTExIC0xMjYgNjQgLTM5IDk2IC01NyAyNDkgLTM2IDI5MCAxNCAyNSA2NCAyNSA4OSAweiIvPgogPHBhdGggZD0iTTExNTQwIDE2NTQgYy0xMjAgLTEzIC0yMzMgLTUwIC0yNDUgLTgyIC0zIC04IDcgLTU3IDIxIC0xMDggMjkgLTEwMSA0MyAtMTE0IDgwIC03MyA0NSA1MCAxNTMgODEgMjA3IDYwIDYxIC0yNCA0MiAtNjEgLTU3IC0xMTIgLTg0IC00NCAtMTExIC02NCAtMTM1IC0xMDIgLTYzIC0xMDIgLTE5IC0yNTUgOTYgLTMyNyAxMDQgLTY2IDMwNSAtNzAgNDUxIC04IDQ5IDIwIDQ5IDE4IDEyIDE0MiAtMjYgOTIgLTMzIDk3IC03MiA1OSAtMTggLTE4IC00NiAtMzcgLTYzIC00MyAtNDEgLTE2IC0xMTUgLTE0IC0xMzMgNCAtMjEgMjEgLTQgNDAgNjcgNzYgMTI1IDYzIDE3MSAxMTUgMTg1IDIxMCAxMCA3MiAtMTYgMTQyIC03NyAyMDUgLTQ0IDQ1IC02MyA1NiAtMTIyIDczIC03NCAyMiAtMTU3IDMyIC0yMTUgMjZ6Ii8+CiA8cGF0aCBkPSJNNDYzMCAxNjM2IGMtNjggLTE5IC0xMTQgLTQ0IC0xNTUgLTg0IC02NSAtNjUgLTk1IC0xNDkgLTk1IC0yNjcgMCAtMTc3IDg0IC0zMTcgMjMxIC0zODUgNjAgLTI4IDg3IC0zNCAxNjUgLTM4IDExMSAtNiAxNzIgNyAyMzYgNTAgNjggNDcgMTA5IDEyMCAxMTYgMjA4IDIgMzkgOCA3MCAxMiA3MCA0IDAgMTIgLTE5IDE5IC00MiAyNiAtODkgMTE0IC0xOTQgMTk4IC0yMzYgODAgLTQxIDE1MCAtNTUgMjU3IC01MCA3NiA0IDExNCAxMSAxNTUgMjggNjEgMjcgNjAgMjIgMjEgMTY5IC0xOCA2NSAtMjYgODEgLTQxIDgxIC0xMCAwIC0xOSAtNCAtMTkgLTkgMCAtMjAgLTY4IC01MSAtMTEyIC01MSAtODYgMCAtMTU0IDc2IC0xNjUgMTg0IC03IDY1IDIyIDEzNiA2MyAxNTQgNDEgMTkgMTA3IDE0IDE1NiAtMTIgNjggLTM2IDc1IC0yNSA1MCA3NSAtMTEgNDYgLTIzIDk2IC0yNiAxMTEgLTggMzggLTgwIDU4IC0yMDIgNTggLTEyOCAwIC0xOTAgLTIzIC0yNjUgLTk5IC01OSAtNjAgLTgxIC0xMDggLTk0IC0yMDQgLTYgLTQyIC04IC00NiAtMjEgLTMyIC0xMyAxMiAtNTEgMTUgLTIyMyAxNSAtMTE0IDAgLTIxMCAzIC0yMTQgNiAtMyA0IDAgMTkgOCAzNCAzMSA1OSAxNjIgNzggMjc4IDM5IDM0IC0xMSA3MCAtMjggODAgLTM3IDEzIC0xMiAyMCAtMTMgMjkgLTQgOSA5IDYgMzUgLTExIDEwOSAtMTMgNTQgLTI4IDEwNiAtMzIgMTE1IC01IDEwIC0zOSAyNiAtNzUgMzggLTc3IDIzIC0yNDkgMjcgLTMyNCA2eiBtMjMwIC01MDEgYzE4IC0yMiAtNSAtNzAgLTQwIC04NSAtMjIgLTkgLTM0IC05IC01NiAyIC0yNiAxMiAtNzQgNzAgLTc0IDg5IDAgNSAzNSA5IDc5IDkgNTggMCA4MiAtNCA5MSAtMTV6Ii8+CiA8cGF0aCBkPSJNMTA4MDAgMTYyOCBjLTEzOSAtNDkgLTIwOCAtMTQ2IC0yMTggLTMwNiAtMTAgLTE4MiA1MyAtMzE2IDE4OCAtNDAyIDY0IC00MCAxNDEgLTYwIDIzNSAtNjAgMTE4IDAgMTc3IDIwIDIzOSA4MyA3MSA3MSA5MCAxMzIgODQgMjY4IC0zIDc0IC04IDEwMyAtMTggMTA5IC04IDYgLTEwOCAxMCAtMjIyIDEwIC0xMzMgMCAtMjA5IDQgLTIxMyAxMCAtMTEgMTggMjQgNjEgNjMgNzcgNjEgMjUgMTg0IDE1IDI2MCAtMjMgODYgLTQyIDkxIC0zNiA2MyA3OCAtMTIgNTEgLTI2IDEwMyAtMzEgMTE0IC0xNCAzNyAtOTAgNTYgLTIzNSA2MSAtMTE2IDMgLTEzNyAxIC0xOTUgLTE5eiBtMjYwIC01MTEgYzAgLTQ5IC0yMSAtNzEgLTY1IC03MSAtMzAgMCAtNDQgNyAtNzEgMzcgLTU0IDU5IC00OCA2NyA1MSA2NyBsODUgMCAwIC0zM3oiLz4KIDxwYXRoIGQ9Ik0xMDM2IDE2MzIgYy0zIC01IDYgLTQ5IDE4IC05OCA2NiAtMjUxIDE1NSAtNjUxIDE0OCAtNjU5IC0zIC0zIC01NCAtNSAtMTE0IC01IC0xMDEgMCAtMTA4IC0xIC0xMDggLTIwIDAgLTI2IDQ4IC0xOTAgNTkgLTIwNCA3IC04IDIyOSAtMTEgNzQ4IC0xMCA2OTggMSA3MzggMiA3NDEgMTggNCAxOCAtNiA2NyAtMzQgMTYzIGwtMTQgNTIgLTEwNyAzIC0xMDcgMyAtMzMgMTQ1IGMtMTggODAgLTU0IDI0NiAtODAgMzcwIC0yNSAxMjQgLTUwIDIzMSAtNTYgMjM4IC0xNCAxOCAtMzE2IDE3IC0zMjMgLTEgLTIgLTcgMTMgLTg0IDM1IC0xNzIgNTQgLTIxNiAxMzEgLTU1MiAxMzEgLTU3MCAwIC0xMyAtMzEgLTE1IC0yMDQgLTE1IGwtMjA0IDAgLTE1IDY4IGMtOSAzNyAtMzAgMTMwIC00NyAyMDcgLTE3IDc3IC0zNSAxNTggLTQwIDE4MCAtNiAyMiAtMjEgOTggLTM1IDE2OCAtMTMgNzEgLTI3IDEzMiAtMzAgMTM4IC03IDExIC0zMjIgMTIgLTMyOSAxeiIvPgogPHBhdGggZD0iTTIzMTEgMTYzMiBjLTkgLTYgLTExIC0xNyAtNyAtMjggMTYgLTQxIDEzNiAtNDg3IDIwMSAtNzQ5IDI1IC05OSA1MCAtMTkwIDU1IC0yMDIgOSAtMjMgMTIgLTIzIDIwOSAtMjMgMTE0IDAgMjAyIDQgMjA2IDkgMyA2IDEyIDEyOCAyMCAyNzIgOSAxNDUgMTcgMjY0IDE4IDI2NSAxIDIgMzYgLTcwIDc3IC0xNTkgNDEgLTg5IDk4IC0yMTMgMTI3IC0yNzQgbDUyIC0xMTMgMjAwIDAgYzExOCAwIDIwMiA0IDIwNiAxMCAzIDUgLTEyIDEyNSAtMzUgMjY3IC0yMiAxNDIgLTQ3IDMwMyAtNTUgMzU4IC0zNSAyNDAgLTU1IDM1OCAtNjEgMzY0IC0zIDMgLTcyIDYgLTE1MiA2IGwtMTQ3IDAgMSAtMjUgYzAgLTE0IDI0IC0xNDggNTMgLTI5OCAyOSAtMTUxIDUxIC0yNzggNDkgLTI4NCAtNCAtMTIgLTcgLTggLTE2OSAzMzYgLTYwIDEyNiAtMTE1IDIzOSAtMTIzIDI1MSAtMTMgMjAgLTIzIDIyIC0xMzQgMjQgLTY2IDEgLTEyMyAtMiAtMTI2IC03IC0zIC01IC0xMCAtMTEwIC0xNiAtMjMzIC0xNSAtMzEzIC0yMSAtMzg5IC0yOSAtMzg5IC0zIDAgLTQwIDEzOCAtODEgMzA2IC00MSAxNjggLTc4IDMwNyAtODIgMzEwIC0xNiAxMCAtMjQzIDE1IC0yNTcgNnoiLz4KIDxwYXRoIGQ9Ik0zODk2IDE2MzIgYy0yIC00IDE5IC0xMDcgNDggLTIyNyAyOSAtMTIxIDY3IC0yODMgODUgLTM2MCAxOCAtNzcgMzUgLTE0OCAzNyAtMTU3IDUgLTE2IC01IC0xOCAtMTEwIC0xOCAtMTM0IDAgLTEyNiA5IC05NSAtMTEzIDM0IC0xMzYgLTExIC0xMjMgNDEzIC0xMjEgMjM5IDEgMzcxIDUgMzc4IDEyIDcgNyA0IDMxIC0xMCA3OSAtMTEgMzcgLTI0IDg0IC0yOSAxMDMgbC05IDM1IC0xMDYgMyAtMTA2IDMgLTI3IDEwNyBjLTE0IDU5IC01MSAyMjYgLTgxIDM3MiAtMzAgMTQ2IC01NiAyNzEgLTU5IDI3OCAtMyA5IC00NSAxMiAtMTY0IDEyIC04OCAwIC0xNjIgLTQgLTE2NSAtOHoiLz4KIDxwYXRoIGQ9Ik01NzE2IDE2MzEgYy0zIC00IDE1IC05OCA0MCAtMjA3IDI1IC0xMDkgNDkgLTIxOSA1NCAtMjQ0IDUgLTI1IDIyIC0xMDMgMzggLTE3NSAzMCAtMTMzIDU2IC0yNzMgNjkgLTM4MCBsOCAtNjAgNjAgLTEyIGMxMjkgLTI2IDI2MCAtNDIgMjY5IC0zMyA4IDggLTM2IDIyNiAtNzAgMzQ0IC04IDI3IC0xMiA1MSAtMTAgNTMgMiAyIDE5IC01IDM3IC0xNiAxOSAtMTEgNjEgLTI3IDk0IC0zNiA3NCAtMTkgMTUwIC03IDE5NiAzMyAzOSAzMiA2OSAxMDEgNjkgMTU1IDAgNDYgLTEwMSA1NTQgLTExMyA1NzUgLTYgOSAtNDkgMTIgLTE1OCAxMiAtMTM2IDAgLTE0OSAtMiAtMTQ5IC0xOCAwIC0xMCAxOCAtMTAxIDQwIC0yMDIgNTAgLTIyNyA1OSAtMzEwIDM3IC0zMjkgLTE4IC0xNCAtNzAgLTcgLTg1IDEyIC05IDEyIC00NiAxODMgLTg3IDM5OCAtMTIgNjQgLTI1IDEyMSAtMjkgMTI3IC05IDE0IC0zMDIgMTcgLTMxMCAzeiIvPgogPHBhdGggZD0iTTY1MzQgMTYyNSBjLTMgLTggLTMgLTE4IDAgLTIzIDMgLTUgMTIgLTQwIDIwIC03OCA4IC0zOCAyNCAtMTEyIDM2IC0xNjQgMzUgLTE1OCA2MCAtMjkxIDcwIC0zNjkgMTEgLTgzIDIxIC0xMDEgNTkgLTEwMSAxNCAwIDgwIC05IDE0NSAtMjAgMTI5IC0yMiAxNDIgLTE5IDEzMSAyOCAtNyAyNyAtNyAyNyA0NiAtMiAxNzUgLTk2IDM0OSAtMTUgMzQ5IDE2MiAwIDI3IC0xNSAxMTggLTM0IDIwMyAtMTggODUgLTQyIDE5OSAtNTEgMjU0IC0xMCA1NSAtMjMgMTA2IC0yOCAxMTMgLTcgOSAtNTEgMTIgLTE1OCAxMiAtMTM3IDAgLTE0OSAtMSAtMTQ5IC0xOCAwIC0xMCAyMCAtMTEyIDQ1IC0yMjYgMjUgLTExNSA0NSAtMjI2IDQ1IC0yNDcgMCAtNDkgLTI1IC02NiAtNzQgLTQ5IGwtMzMgMTAgLTM2IDE3OCBjLTIwIDk3IC00MiAyMTEgLTQ4IDI1MiAtNyA0MSAtMTYgODEgLTIyIDg4IC0xNSAxOSAtMzA2IDE3IC0zMTMgLTN6Ii8+CiA8cGF0aCBkPSJNODE0NCAxNjI1IGMtMyAtOCAyMSAtMTI2IDU1IC0yNjIgNzYgLTMxMyAxMjUgLTUzNyAxNDcgLTY3OCA5IC02MCAyMCAtMTE0IDI0IC0xMTggOSAtMTEgMzA5IC01OSAzMjEgLTUxIDE0IDggMTIgMjQgLTM3IDIyNyAtNTcgMjM1IC02MSAyNTAgLTExOCA1MTcgLTYzIDI5NiAtNzcgMzUzIC04OSAzNjggLTE1IDE5IC0yOTYgMTcgLTMwMyAtM3oiLz4KIDxwYXRoIGQ9Ik0xMDEzNyAxNjI3IGMtMiAtNiA0IC00NCAxNCAtODIgMzggLTE0MSA4MSAtMzM0IDEwOSAtNDgzIDE1IC04NCAzMCAtMTU1IDMyIC0xNTcgMyAtNCAzMDEgLTU1IDMxOCAtNTUgMTUgMCAxOSAyOSA5IDYyIC0yOSAxMDEgLTk2IDQwNiAtMTMwIDU5OCAtMTEgNjMgLTI1IDExOCAtMzIgMTIyIC03IDQgLTgwIDggLTE2MyA4IC0xMTMgMCAtMTUzIC0zIC0xNTcgLTEzeiIvPgogPHBhdGggZD0iTTE4MCA5NDcgYy03NCAtNTggLTExNCAtMTA2IC0xNTAgLTE3OCAtMjYgLTUxIC0zMCAtNzAgLTI5IC0xMjcgMiAtNTcgNyAtNzUgMzQgLTExNyAxMDIgLTE2MCAzMzEgLTI3OCA3MzEgLTM3OSAyNDEgLTYxIDQ4NiAtOTcgOTM0IC0xMzUgMTg0IC0xNiA4OTEgLTggMTEyMCAxMiA0MjUgMzggNzA2IDc2IDExMDAgMTQ4IDE3MSAzMiA1NTAgMTE2IDU1OCAxMjQgMTIgMTIgLTkgMTIgLTEwMiAtMSAtMjQyIC0zNCAtNzA0IC03NyAtMTA1MSAtOTggLTc3NSAtNDggLTE0MDAgLTM5IC0xOTEwIDI1IC03MTcgOTAgLTExNjAgMjU4IC0xMjUxIDQ3NCAtMjkgNzEgLTE1IDE0MyA0NyAyMzggMjAgMzEgMzQgNTcgMzEgNTcgLTQgMCAtMzIgLTE5IC02MiAtNDN6Ii8+CiA8cGF0aCBkPSJNMTAzMjQgODE2IGMtNiAtMTcgMzUgLTIyNSA0OCAtMjQyIDQgLTYgMzQgLTE0IDY2IC0xOCAzMSAtMyA5NiAtMTEgMTQ1IC0xOCA1OCAtOCA5MCAtOSA5NyAtMiAxMSAxMSAtMzMgMjMxIC00OSAyNDcgLTcgNyAtMjQ1IDQ3IC0yODMgNDcgLTEwIDAgLTIxIC02IC0yNCAtMTR6Ii8+CiA8L2c+Cgo8L3N2Zz4="

/***/ }),

/***/ 3:
/*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Code\js\testnext\pages\index.js */"./pages/index.js");


/***/ }),

/***/ "@material-ui/core":
/*!************************************!*\
  !*** external "@material-ui/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core");

/***/ }),

/***/ "@material-ui/core/Button":
/*!*******************************************!*\
  !*** external "@material-ui/core/Button" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Button");

/***/ }),

/***/ "@material-ui/core/Paper":
/*!******************************************!*\
  !*** external "@material-ui/core/Paper" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Paper");

/***/ }),

/***/ "@material-ui/icons/LockOutlined":
/*!**************************************************!*\
  !*** external "@material-ui/icons/LockOutlined" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/LockOutlined");

/***/ }),

/***/ "@material-ui/icons/Visibility":
/*!************************************************!*\
  !*** external "@material-ui/icons/Visibility" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Visibility");

/***/ }),

/***/ "@material-ui/icons/VisibilityOff":
/*!***************************************************!*\
  !*** external "@material-ui/icons/VisibilityOff" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/VisibilityOff");

/***/ }),

/***/ "core-js/library/fn/object/define-properties":
/*!**************************************************************!*\
  !*** external "core-js/library/fn/object/define-properties" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-properties");

/***/ }),

/***/ "core-js/library/fn/object/define-property":
/*!************************************************************!*\
  !*** external "core-js/library/fn/object/define-property" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-property");

/***/ }),

/***/ "core-js/library/fn/object/get-own-property-descriptor":
/*!************************************************************************!*\
  !*** external "core-js/library/fn/object/get-own-property-descriptor" ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-descriptor");

/***/ }),

/***/ "core-js/library/fn/object/get-own-property-descriptors":
/*!*************************************************************************!*\
  !*** external "core-js/library/fn/object/get-own-property-descriptors" ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-descriptors");

/***/ }),

/***/ "core-js/library/fn/object/get-own-property-symbols":
/*!*********************************************************************!*\
  !*** external "core-js/library/fn/object/get-own-property-symbols" ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-symbols");

/***/ }),

/***/ "core-js/library/fn/object/keys":
/*!*************************************************!*\
  !*** external "core-js/library/fn/object/keys" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/keys");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map