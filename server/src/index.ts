import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import loginRoutes from "./routes/loginRoutes";
import indexRoutes from './routes/indexRoutes';
import newHotelRoutes from './routes/newHotelRoutes';
import dataRoutes from './routes/dataRoutes';
import registrosRoutes from './routes/registrosRoutes';
import habitacionesRoutes from './routes/habitacionesRoutes';

class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void {
        this.app.use(loginRoutes);
        this.app.use(indexRoutes);
        this.app.use(newHotelRoutes);
        this.app.use(dataRoutes);
        this.app.use(registrosRoutes);
        this.app.use(habitacionesRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port`, this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();
