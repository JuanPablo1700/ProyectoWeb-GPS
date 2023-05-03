import { Router } from 'express';
import { habitacionesController } from '../controllers/habitacionesController';
import validateToken from './validateToken';

class HabitacionesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/api/habitacion/nuevo', habitacionesController.nuevo);
        /*this.router.get('/api/registros/getRegistros', validateToken, registrosController.getRegistros);
        this.router.get('/api/registros/getRegistro/:id', validateToken, registrosController.getRegistro);
        
        this.router.get('/api/habitacion/getHabitacionesHotel/:id', validateToken, registrosController.getTipoHabitacion);
        this.router.get('/api/getMotivosVisita', validateToken, registrosController.getMotivos); */
    }
}

const habitacionesRoutes = new HabitacionesRoutes();
export default habitacionesRoutes.router;