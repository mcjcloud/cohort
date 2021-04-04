"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var redux_thunk_1 = require("redux-thunk");
var auth_1 = require("./auth");
var org_1 = require("./org");
var reducer = redux_1.combineReducers({ auth: auth_1["default"], org: org_1["default"] });
var middlware = redux_1.compose(redux_1.applyMiddleware(redux_thunk_1["default"]), window.devToolsExtension ? window.devToolsExtension() : function (f) { return f; });
// create the redux store
exports["default"] = redux_1.createStore(reducer, {}, middlware);
