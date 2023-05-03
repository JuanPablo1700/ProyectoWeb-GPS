import { Request, Response } from "express";
import pool from '../database';

class HabitacionesController {

    public async getTipoHabitacion(req: Request, res: Response) {
        const id = req.params.id;

        const habitaciones: any = await pool.query("SELECT hh.id, hh.cantidad, hh.disponible, hh.precio, hh.fk_id_tipoHabitacion, hh.fk_id_hotel, th.tipo_habitacion FROM habitacion_hotel hh LEFT JOIN tipo_habitacion as th on th.id = hh.fk_id_tipoHabitacion WHERE hh.fk_id_hotel = ?", [id]);

        return res.json(habitaciones[0]);
    }
    
    public async getHabitacionById(req: Request, res: Response) {
        const id = req.params.id;

        const habitaciones: any = await pool.query("SELECT hh.id, hh.cantidad, hh.disponible, hh.precio, hh.fk_id_tipoHabitacion, hh.fk_id_hotel, th.tipo_habitacion FROM habitacion_hotel hh LEFT JOIN tipo_habitacion as th on th.id = hh.fk_id_tipoHabitacion WHERE hh.id = ?", [id]);

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
                    return res.json({msg: 'Tipo de habitación insertado correctamente'});
                } else {
                    return res.status(401).json({ msg: 'No se pudo insertar el tipo de habitación' });
                }
            } else {
                return res.status(401).json({ msg: 'El tipo de habitacion ya exixte' });
            }
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error del servidor' });
        }
    }


    public async getRegistro(req: Request, res: Response) {
        const id = req.params.id;
        const idInt = parseInt(id);
        const response: any = await pool.query('SELECT rh.id, rh.fecha_ingreso, rh.fecha_salida, rh.ciudad_huesped, rh.costo_estancia, rh.fk_id_habitacion_hotel, rh.fk_id_usuario, rh.fk_id_motivo, mv.motivo, th.id as id_tipoHabitacion, th.tipo_habitacion FROM registro_huesped rh LEFT JOIN motivo_visita as mv on mv.id = rh.fk_id_motivo LEFT JOIN habitacion_hotel as hh on hh.id = rh.fk_id_habitacion_hotel LEFT JOIN tipo_habitacion as th on th.id = hh.fk_id_tipoHabitacion WHERE rh.id = ?', [idInt]);
        const registro = response[0][0];
        return res.json(registro);
    }
    
}

export const habitacionesController = new HabitacionesController();