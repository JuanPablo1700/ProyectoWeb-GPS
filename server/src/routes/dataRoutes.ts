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
        this.router.post('/api/data/getMotivoGeneral', dataController.getMotivoGeneral);
        this.router.post('/api/data/getRegistrosGeneral', dataController.getRegistrosGeneral);
        this.router.post('/api/data/getCiudadVisitaGeneral', dataController.getCiudadVisitaGeneral);
        this.router.get('/api/data/getCostosHabitacionGeneral', dataController.getCostosHabitacionGeneral);
        
        //Por categoría
        this.router.post('/api/data/getMotivoCategoria', dataController.getMotivoCategoria);
        this.router.post('/api/data/getRegistrosCategoria', dataController.getRegistrosCategoria);
        this.router.post('/api/data/getCiudadCategoria', dataController.getCiudadCategoria);

        //Por hotel
        this.router.post('/api/data/getMotivoHotel', dataController.getMotivoHotel);
        this.router.post('/api/data/getCiudadHotel', dataController.getCiudadHotel);
        this.router.post('/api/data/getRegistrosHotel', dataController.getRegistrosHotel);
    }
}

const dataRoutes = new DataRoutes();
export default dataRoutes.router;