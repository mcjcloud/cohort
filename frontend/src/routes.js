"use strict";
exports.__esModule = true;
var EventsPage_1 = require("./pages/EventsPage");
var HomePage_1 = require("./pages/HomePage");
var OrgPage_1 = require("./pages/OrgPage");
var SigninPage_1 = require("./pages/SigninPage");
var routes = [
    { path: "/", component: HomePage_1["default"], exact: true },
    { path: "/signin", component: SigninPage_1["default"] },
    { path: "/events", component: EventsPage_1["default"] },
    { path: "/orgs", component: OrgPage_1["default"] },
];
exports["default"] = routes;
