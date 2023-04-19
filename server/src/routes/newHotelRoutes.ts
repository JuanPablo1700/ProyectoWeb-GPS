import { Router } from 'express';
import { newHotelController } from '../controllers/newHotelController';

class NewHotelRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/api/hotel/newHotel', newHotelController.newHotel);
    }
}

const newHotelRoutes = new NewHotelRoutes();
export default newHotelRoutes.router;