"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
const validateToken_1 = __importDefault(require("./validateToken"));
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', indexController_1.indexController.index);
        this.router.put('/api/inicio/newPassword', validateToken_1.default, indexController_1.indexController.newPassword);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
