import { Router } from 'express';
import { newHotelController } from '../controllers/newHotelController';
import validateToken from './validateToken';

class NewHotelRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/api/hotel/newHotel', validateToken, newHotelController.newHotel);
        this.router.get('/api/hotel/getHotels', validateToken, newHotelController.getHotels);
        this.router.get('/api/hotel/getHotel/:id', validateToken, newHotelController.getHotel);
        this.router.put('/api/hotel/updateHotel/:id', validateToken, newHotelController.updateHotel);
    }
}

const newHotelRoutes = new NewHotelRoutes();
export default newHotelRoutes.router;