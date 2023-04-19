import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import pool from '../database';

class NewHotelController {

    public async newHotel(req: Request, res: Response) {

        const { nombre, direccion, correo, telefono, estrellas, estado } = req.body;

        try {
            const existe:any = await pool.query('SELECT * FROM hotel WHERE correo = ?', [correo]);

            if (existe[0] != "") {
                return res.status(401).json({ msg: 'El hotel ya existe en el sistema' });
            }
            
            const fechaIngreso = new Date();
            
            const hotelInsertado = await pool.query('INSERT INTO hotel (nombre, fecha_ingreso, activo, estrellas, direccion, telefono, correo) values (?,?,?,?,?,?,?)', 
            [nombre, fechaIngreso, estado, estrellas, direccion, telefono, correo]);
            
            if (!hotelInsertado) {
                return res.status(401).json({ msg: 'No se pudo insertar el hotel' });
            }

            const nuevoHotel = await pool.query('SELECT * FROM hotel WHERE correo = ?', [correo]);

            if (nuevoHotel) {
                //Crear los nuevos usuarios de gerente y recepcionista
                let gerente = 'gerente-' + nombre.toLowerCase().replace(/\s+/g, "-");
                let recepcion = 'recepcion-' + nombre.toLowerCase().replace(/\s+/g, "-");
            
                //Crear las contraseñas y aplicar encode con bcrypt
                let passGerente = await bcrypt.hash(gerente, 10);
                let passRecepcion = await bcrypt.hash(recepcion, 10);

                //Insertar los usuarios con el fk_id_hotel = id del hotel que acabamos de crear
                

                //mandar correo al de los usuarios al correo registrado del hotel


                //Si no hay errores mandar respuesta de exitosa

                return res.json(gerente);
            }else {
                return res.status(401).json({ msg: 'Hotel no encontrado' });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error del servidor' });
        } 
    }
}

export const newHotelController = new NewHotelController();