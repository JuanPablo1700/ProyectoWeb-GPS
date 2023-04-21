import { Router } from 'express';
import { newHotelController } from '../controllers/newHotelController';

class NewHotelRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/api/hotel/newHotel', newHotelController.newHotel);
        this.router.get('/api/hotel/getHotels', newHotelController.getHotels);
        this.router.get('/api/hotel/getHotel/:id', newHotelController.getHotel);
        this.router.put('/api/hotel/updateHotels/:id', newHotelController.updateHotel);
    }
}

const newHotelRoutes = new NewHotelRoutes();
export default newHotelRoutes.router;