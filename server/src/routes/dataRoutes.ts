import { Router } from 'express';
import { dataController } from '../controllers/dataController';
import validateToken from './validateToken';

class DataRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/api/data/getMotivoGeneral', dataController.getMotivoGeneral);
    }
}

const dataRoutes = new DataRoutes();
export default dataRoutes.router;