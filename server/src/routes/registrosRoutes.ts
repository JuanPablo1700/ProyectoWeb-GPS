import { Router } from 'express';
import { registrosController } from '../controllers/registrosController';
import validateToken from './validateToken';

class RegistrosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/api/registros/nuevo', validateToken, registrosController.nuevo);
        this.router.get('/api/registros/getRegistros/:idHotel', validateToken, registrosController.getRegistros);
        this.router.get('/api/registros/getRegistro/:id', validateToken, registrosController.getRegistro);
        this.router.put('/api/registros/actualizar/:id', validateToken, registrosController.actualizar);
        this.router.delete('/api/registros/eliminar/:id', validateToken, registrosController.eliminar);
        
        this.router.get('/api/habitacion/getHabitacionesHotel/:id', validateToken, registrosController.getTipoHabitacion);
        this.router.get('/api/getMotivosVisita', validateToken, registrosController.getMotivos);
    }
}

const registrosRoutes = new RegistrosRoutes();
export default registrosRoutes.router;