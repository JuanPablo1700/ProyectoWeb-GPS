import { Router } from 'express';
import { habitacionesController } from '../controllers/habitacionesController';
import validateToken from './validateToken';

class HabitacionesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/api/habitacion/nuevo', validateToken, habitacionesController.nuevo);
        this.router.post('/api/habitacion/nuevaHabitacion', validateToken, habitacionesController.nuevaHabitacion);
        this.router.get('/api/habitacion/getHabitacionesHotel/:id', validateToken, habitacionesController.getTipoHabitacion);
        this.router.get('/api/habitacion/getHabitacionById/:id', validateToken, habitacionesController.getHabitacionById);
        this.router.get('/api/habitacion/getTiposHabitaciones', validateToken , habitacionesController.getTiposHabitaciones);
    }
}

const habitacionesRoutes = new HabitacionesRoutes();
export default habitacionesRoutes.router;