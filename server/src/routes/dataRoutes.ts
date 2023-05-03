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
        
        //Por categoría
        this.router.post('/api/data/getMotivoCategoria', dataController.getMotivoCategoria);

        //Por hotel
        this.router.post('/api/data/getMotivoHotel', dataController.getMotivoHotel);
        this.router.post('/api/data/getCiudadHotel', dataController.getCiudadHotel);
    }
}

const dataRoutes = new DataRoutes();
export default dataRoutes.router;