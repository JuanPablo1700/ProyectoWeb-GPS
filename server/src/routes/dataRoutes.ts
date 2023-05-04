import { Router } from 'express';
import { dataController } from '../controllers/dataController';
import validateToken from './validateToken';

class DataRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Generales
        this.router.post('/api/data/getMotivoGeneral', validateToken, dataController.getMotivoGeneral);
        this.router.post('/api/data/getRegistrosGeneral', validateToken, dataController.getRegistrosGeneral);
        this.router.post('/api/data/getCiudadVisitaGeneral', validateToken, dataController.getCiudadVisitaGeneral);
        this.router.get('/api/data/getCostosHabitacionGeneral', validateToken, dataController.getCostosHabitacionGeneral);
        this.router.post('/api/data/getHabitacionesGeneral', validateToken, dataController.getHabitacionesGeneral);
        
        //Por categoría
        this.router.post('/api/data/getMotivoCategoria', validateToken, dataController.getMotivoCategoria);
        this.router.post('/api/data/getRegistrosCategoria', validateToken, dataController.getRegistrosCategoria);
        this.router.post('/api/data/getCiudadCategoria', validateToken, dataController.getCiudadCategoria);
        this.router.post('/api/data/getHabitacionesCategoria', validateToken, dataController.getHabitacionesCategoria);
        this.router.get('/api/data/getCostosHabitacionCategoria/:estrellas', validateToken, dataController.getCostosHabitacionCategoria);

        //Por hotel
        this.router.post('/api/data/getMotivoHotel', validateToken, dataController.getMotivoHotel);
        this.router.post('/api/data/getCiudadHotel', validateToken, dataController.getCiudadHotel);
        this.router.post('/api/data/getRegistrosHotel', validateToken, dataController.getRegistrosHotel);
        this.router.post('/api/data/getHabitacionesHotel', validateToken, dataController.getHabitacionesHotel);
    }
}

const dataRoutes = new DataRoutes();
export default dataRoutes.router;