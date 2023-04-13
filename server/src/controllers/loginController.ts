import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import pool from '../database';
import jwt from 'jsonwebtoken';

class LoginController {

    public async login(req: Request, res: Response) {

        const { user, password } = req.body;

        if (!user || !password) {
            return res.status(400).json({ error: 'Falta el usuario o la contraseña' });
        }

        try {
            const result = await pool.query('SELECT id, user, password, activo, tipo_usuario, fk_id_hotel FROM usuario WHERE user = ?', [user]);

            if (!result) {
                return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
            }

            // Verificar la contraseña hash
            const usuario: any = result[0];

            const passwordMatch = await bcrypt.compare(password, usuario[0][2]);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
            }

            const token = jwt.sign({ user: usuario[0][1] }, 'secreto12345', { expiresIn: '1h' });

            // Devolver el token como respuesta
            res.json(token);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error del servidor' });
        }
    }

    public async logout(req: Request, res: Response) {
        res.clearCookie('token');
        res.json({ message: 'Sesión cerrada' });
    }
}

export const loginController = new LoginController();