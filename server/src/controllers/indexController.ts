import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../database';

class IndexController {

    public async index(req: Request, res: Response) {
        const hoteles = await pool.query('select * from hotel');
        res.json(hoteles);
    }

    public async newPassword(req: Request, res: Response) {
        const {user, password} = req.body;

        if (!user || !password) {
            return res.status(400).json({ error: 'Ingrese la nueva contraseña' });
        }

        try {
            const hashPassword = await bcrypt.hash(password, 10);

            const result = await pool.query('UPDATE usuario SET password = ?, pass_actualizada = 1 where user = ?', [hashPassword, user]);

            if (!result) {
                return res.status(500).json({ error: 'No se actualizo la contraseña' });
            }
            return res.json({'msg': 'Contraseña actualizada correctamente'});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error del servidor' });
        }
    }
}

export const indexController = new IndexController();