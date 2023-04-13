"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/api/users/login', loginController_1.loginController.login);
        this.router.post('/api/users/logout', loginController_1.loginController.logout);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
