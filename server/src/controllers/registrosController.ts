import { Request, Response } from "express";
import pool from '../database';

class RegistrosController {

    public async getTipoHabitacion(req: Request, res: Response) {
        const id = req.params.id;

        const habitaciones: any = await pool.query("SELECT * FROM habitacion_hotel hh LEFT JOIN tipo_habitacion as th on th.id = hh.fk_id_tipoHabitacion WHERE hh.fk_id_hotel = 36", [id]);

        return res.json(habitaciones[0]);
    }

    public async getMotivos(req: Request, res: Response) {
        const motivos: any = await pool.query("SELECT * FROM motivo_visita");

        return res.json(motivos[0]);
    }

    public async nuevo(req: Request, res: Response) {

        const { fecha_ingreso, fecha_salida, ciudad_huesped, fk_id_tipoHabitacion, fk_id_usuario, fk_id_motivo, fk_id_hotel } = req.body;

        let costo = 0;

        try {

            const habitacion_hotel: any = await pool.query('SELECT id, cantidad, disponible, precio FROM habitacion_hotel WHERE fk_id_tipoHabitacion = ? and fk_id_hotel = ?', [fk_id_tipoHabitacion, fk_id_hotel])

            const fecha1: Date = new Date(fecha_ingreso);
            const fecha2: Date = new Date(fecha_salida);

            const diferenciaEnMilisegundos: number = fecha2.getTime() - fecha1.getTime();
            const diferenciaEnDias: number = Math.floor(diferenciaEnMilisegundos / (1000 * 3600 * 24));

            costo = diferenciaEnDias * habitacion_hotel[0][0].precio;

            const registroInsertado: any = await pool.query('INSERT INTO registro_huesped (fecha_ingreso, fecha_salida, ciudad_huesped, costo_estancia, fk_id_habitacion_hotel, fk_id_usuario, fk_id_motivo) values (?,?,?,?,?,?,?)',
            [fecha_ingreso, fecha_salida, ciudad_huesped, costo, habitacion_hotel[0][0].id, fk_id_usuario, fk_id_motivo]);
            
            if (registroInsertado[0].affectedRows >= 1) {
                return res.json({msg: 'Registro insertado correctamente'});
            } else {
                return res.status(401).json({ msg: 'No se pudo insertar el registro' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error del servidor' });
        }
    }

    public async getRegistros(req: Request, res: Response) {
        const listRegistros = await pool.query('SELECT rh.id, rh.fecha_ingreso, rh.fecha_salida, rh.ciudad_huesped, rh.costo_estancia, rh.fk_id_habitacion_hotel, rh.fk_id_usuario, rh.fk_id_motivo, mv.motivo, th.tipo_habitacion FROM registro_huesped rh LEFT JOIN motivo_visita as mv on mv.id = rh.fk_id_motivo LEFT JOIN habitacion_hotel as hh on hh.id = rh.fk_id_habitacion_hotel LEFT JOIN tipo_habitacion as th on th.id = hh.fk_id_tipoHabitacion');
        return res.json(listRegistros[0]);
    }

    public async getRegistro(req: Request, res: Response) {
        const id = req.params.id;
        const idInt = parseInt(id);
        const response: any = await pool.query('SELECT * FROM registro_huesped WHERE id = ?', [idInt]);
        const registro = response[0][0];
        return res.json(registro);
    }

    public async actualizar(req: Request, res: Response) {
        const { fecha_ingreso, fecha_salida, ciudad, fk_id_tipoHabitacion, fk_id_usuario, fk_id_motivo, fk_id_hotel } = req.body;
        const id = req.params.id;
        const idInt = parseInt(id);
        const idUsuarioInt = parseInt(fk_id_usuario);
        const idMotivoInt = parseInt(fk_id_motivo);

        let costo = 0;

        try {
            const habitacion_hotel: any = await pool.query('SELECT id, cantidad, disponible, precio FROM habitacion_hotel WHERE fk_id_tipoHabitacion = ? and fk_id_hotel = ?', [fk_id_tipoHabitacion, fk_id_hotel])

            const fecha1: Date = new Date(fecha_ingreso);
            const fecha2: Date = new Date(fecha_salida);

            const diferenciaEnMilisegundos: number = fecha2.getTime() - fecha1.getTime();
            const diferenciaEnDias: number = Math.floor(diferenciaEnMilisegundos / (1000 * 3600 * 24));

            costo = diferenciaEnDias * habitacion_hotel[0][0].precio;

            await pool.query('UPDATE registro_huesped SET fecha_ingreso = ?, fecha_salida = ?, ciudad_huesped = ?, costo_estancia = ?, fk_id_habitacion_hotel = ?, fk_id_usuario = ?, fk_id_motivo = ? WHERE id = ?',
            [fecha_ingreso, fecha_salida, ciudad, costo, habitacion_hotel[0][0].id, idUsuarioInt, idMotivoInt, idInt]);
            return res.json({ msg: 'Registro actualizado con exito.' });
        } catch (error) {
            return res.status(401).json({ msg: 'Hubo un problema al actualizar los datos.', error });
        }
    }
}

export const registrosController = new RegistrosController();