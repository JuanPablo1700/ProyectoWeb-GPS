"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newHotelController_1 = require("../controllers/newHotelController");
class NewHotelRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/api/hotel/newHotel', newHotelController_1.newHotelController.newHotel);
        this.router.get('/api/hotel/getHotels', newHotelController_1.newHotelController.getHotels);
        this.router.get('/api/hotel/getHotel/:id', newHotelController_1.newHotelController.getHotel);
        this.router.put('/api/hotel/updateHotel/:id', newHotelController_1.newHotelController.updateHotel);
    }
}
const newHotelRoutes = new NewHotelRoutes();
exports.default = newHotelRoutes.router;
