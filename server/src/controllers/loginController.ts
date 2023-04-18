import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import pool from '../database';
import jwt from 'jsonwebtoken';

class LoginController {

    public async login(req: Request, res: Response) {

        const { user, password } = req.body;

        if (!user || !password) {
            return res.status(404).json({ msj: 'Falta el usuario o la contraseña' });
        }

        try {
            const result = await pool.query('SELECT id, user, password, activo, tipo_usuario, pass_actualizada, fk_id_hotel FROM usuario WHERE user = ?', [user]);

            // Verificar la contraseña hash
            const usuario: any = result[0];

            //ver si el usuario existe
            if (usuario == "") {
                return res.status(401).json({ msg: 'Usuario no encontrado' });
            }

            const passwordMatch = await bcrypt.compare(password, usuario[0][2]);

            if (!passwordMatch) {
                return res.status(401).json({ msg: 'Usuario o contraseña incorrectos' });
            }

            const token = jwt.sign({ user: usuario[0][1] }, 'secreto12345', { expiresIn: '1h' });

            const activo = usuario[0][3];
            const tipo_usuario = usuario[0][4];
            const pass_actualizada = usuario[0][5];

            // Devolver el token como respuesta
            return res.json(token + "-" + activo + "-"+ tipo_usuario + "-" + pass_actualizada);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error del servidor' });
        }
    }
}

export const loginController = new LoginController();