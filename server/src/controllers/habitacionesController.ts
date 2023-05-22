import { Request, Response } from "express";
import pool from '../database';

class HabitacionesController {

    public async getTipoHabitacion(req: Request, res: Response) {
        const id = req.params.id;

        const habitaciones: any = await pool.query(
            "SELECT hh.id, hh.cantidad, hh.disponible, hh.precio, hh.fk_id_tipoHabitacion, hh.fk_id_hotel, th.tipo_habitacion FROM habitacion_hotel hh LEFT JOIN tipo_habitacion as th on th.id = hh.fk_id_tipoHabitacion WHERE hh.fk_id_hotel = ?",
            [id]);

        return res.json(habitaciones[0]);
    }

    public async getHabitacionById(req: Request, res: Response) {
        const id = req.params.id;

        const habitaciones: any = await pool.query("SELECT hh.id, hh.cantidad, hh.disponible, hh.precio, hh.fk_id_tipoHabitacion, hh.fk_id_hotel, th.tipo_habitacion FROM habitacion_hotel hh LEFT JOIN tipo_habitacion as th on th.id = hh.fk_id_tipoHabitacion WHERE hh.id = ?", [id]);
        console.log(habitaciones[0][0]);

        return res.json(habitaciones[0][0]);
    }

    public async getTiposHabitaciones(req: Request, res: Response) {

        const habitaciones: any = await pool.query("SELECT * FROM tipo_habitacion");

        return res.json(habitaciones[0]);
    }

    public async nuevo(req: Request, res: Response) {

        const { tipo_habitacion } = req.body;

        try {

            const existeTipo: any = await pool.query('SELECT * FROM tipo_habitacion WHERE tipo_habitacion = ?', [tipo_habitacion]);

            if (existeTipo[0] == "") {

                const habitacionInsertada: any = await pool.query('INSERT INTO tipo_habitacion (tipo_habitacion) values (?)', [tipo_habitacion]);

                if (habitacionInsertada[0].affectedRows >= 1) {
                    return res.json({ msg: 'Tipo de habitación insertado correctamente' });
                } else {
                    return res.status(401).json({ msg: 'No se pudo insertar el tipo de habitación' });
                }
            } else {
                return res.status(409).json({ msg: 'El tipo de habitacion ya exixte' });
            }

        } catch (error) {
            res.status(500).json({ msg: 'Error del servidor' });
        }
    }

    public async nuevaHabitacion(req: Request, res: Response) {
        const { cantidad, disponible, precio, fk_id_tipoHabitacion, fk_id_hotel } = req.body;

        const existeHabitacion: any = await pool.query('SELECT * FROM habitacion_hotel WHERE fk_id_tipoHabitacion = ? and fk_id_hotel = ?', [fk_id_tipoHabitacion, fk_id_hotel]);

        if (existeHabitacion[0] == "") {
            
            const habitacionInsertada: any = await pool.query('INSERT INTO habitacion_hotel (cantidad, disponible, precio, fk_id_tipoHabitacion, fk_id_hotel) values (?,?,?,?,?)', [cantidad, disponible, precio, fk_id_tipoHabitacion, fk_id_hotel]);

            if (habitacionInsertada[0].affectedRows >= 1) {
                return res.json({ msg: 'Habitación insertada correctamente' });
            } else {
                return res.status(401).json({ msg: 'No se pudo insertar la habitación' });
            }
        } else {
            const habitacionActualizada: any = await pool.query('UPDATE habitacion_hotel SET cantidad = ?, disponible = ?, precio = ? where fk_id_tipoHabitacion = ? and fk_id_hotel = ?', [cantidad, disponible, precio, fk_id_tipoHabitacion, fk_id_hotel]);

            if (habitacionActualizada[0].affectedRows >= 1) {
                return res.json({ msg: 'Habitación actualizada correctamente' });
            } else {
                return res.status(401).json({ msg: 'No se pudo actualizar la habitación' });
            }
        }
    }

}

export const habitacionesController = new HabitacionesController();