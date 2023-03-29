import { Request, Response } from 'express';

import pool from '../database';

class IndexController {

    public index(req: Request, res: Response) {
        res.json('games');
    }
}

export const indexController = new IndexController();