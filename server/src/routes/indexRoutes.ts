import { Router } from 'express';
import { indexController } from '../controllers/indexController';
import validateToken from './validateToken';

class IndexRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', indexController.index);
        this.router.put('/api/inicio/newPassword', validateToken, indexController.newPassword);
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;