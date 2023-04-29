import { Request, Response } from 'express';
import pool from '../database';

interface Hotel_motivo {
    name: string;
    series: {
        name: string;
        value: number;
    }[];
}

interface DatosHotel {
    name: {
        name: string;
        value: number;
    }[];
}

class DataController {

    public async getMotivoGeneral(req: Request, res: Response) {

        const formulario = req.body;
        let fechaInicio:Date;
        let fechaFin:Date;
        const hoy = new Date();
        console.log(hoy);
        console.log(formulario.tipoGrafica);
        console.log(formulario.fechaSelect);
        console.log(formulario.fechaInicio);
        console.log(formulario.fechaFin);
        console.log(formulario.estrellas);
        console.log(formulario.idHotel);

        if (formulario.fechaSelect == "1") { // Este día
            fechaFin = hoy;
            
            hoy.setDate(hoy.getDate() - 1); // restar un día
            fechaInicio = hoy;

            console.log(fechaInicio); // mostrar la fecha resultante
            console.log(fechaFin); // mostrar la fecha resultante
        }
        if (formulario.fechaSelect == "2") { // Esta semana
            
        }
        if (formulario.fechaSelect == "3") { // Este mes
            
        }
        if (formulario.fechaSelect == "4") { // Personalizado
            
        }

        const datos: any[] = await pool.query('SELECT h.nombre, mv.motivo, COUNT(*) as cantidad FROM registro_huesped as rg LEFT JOIN habitacion_hotel as hh on hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel as h on h.id = hh.fk_id_hotel LEFT JOIN motivo_visita as mv on mv.id = rg.fk_id_motivo GROUP BY h.nombre, mv.motivo ORDER BY h.nombre');

        const hoteles: Hotel_motivo[] = [];
        const mapaHoteles = new Map<string, Hotel_motivo>();

        datos[0].forEach((dato: any) => {
            const motivo = mapaHoteles.get(dato.nombre);
            if (motivo) {
                motivo.series.push({
                    name: dato.motivo,
                    value: dato.cantidad
                });
            } else {
                const nuevoHotel: Hotel_motivo = {
                    name: dato.nombre,
                    series: [
                        {
                            name: dato.motivo,
                            value: dato.cantidad
                        }
                    ]
                };
                mapaHoteles.set(dato.nombre, nuevoHotel);
                hoteles.push(nuevoHotel);
            }
        });

        return res.json(hoteles);
    }

    public async getCiudadVisitaGeneral(req: Request, res: Response) {

        const datos: any[] = await pool.query('SELECT h.nombre, mv.motivo, COUNT(*) as cantidad FROM registro_huesped as rg LEFT JOIN habitacion_hotel as hh on hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel as h on h.id = hh.fk_id_hotel LEFT JOIN motivo_visita as mv on mv.id = rg.fk_id_motivo GROUP BY h.nombre, mv.motivo ORDER BY h.nombre');

        const hoteles: Hotel_motivo[] = [];
        const mapaHoteles = new Map<string, Hotel_motivo>();

        datos[0].forEach((dato: any) => {
            const motivo = mapaHoteles.get(dato.nombre);
            if (motivo) {
                motivo.series.push({
                    name: dato.motivo,
                    value: dato.cantidad
                });
            } else {
                const nuevoHotel: Hotel_motivo = {
                    name: dato.nombre,
                    series: [
                        {
                            name: dato.motivo,
                            value: dato.cantidad
                        }
                    ]
                };
                mapaHoteles.set(dato.nombre, nuevoHotel);
                hoteles.push(nuevoHotel);
            }
        });

        return res.json(hoteles);
    }

    public async getMotivoHotel(req: Request, res:Response){
        const form = req.body;
        let fechaInicio:Date;
        let fechaFin:Date;
        const hoy = new Date();
        console.log(form);
        console.log(hoy);

       // const datos: any[] = await pool.query("SELECT h.nombre, mv.motivo, COUNT(*) AS cantidad FROM registro_huesped AS rg LEFT JOIN habitacion_hotel AS hh ON hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel AS h ON h.id = hh.fk_id_hotel LEFT JOIN motivo_visita AS mv ON mv.id = rg.fk_id_motivo WHERE h.id = 36 AND (fecha_registro >= '2023-04-21' AND fecha_registro <= '2023-04-26' ) GROUP BY h.nombre, mv.motivo;")
       const datos: any[] = await pool.query('SELECT h.nombre, mv.motivo, COUNT(*) as cantidad FROM registro_huesped as rg LEFT JOIN habitacion_hotel as hh on hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel as h on h.id = hh.fk_id_hotel LEFT JOIN motivo_visita as mv on mv.id = rg.fk_id_motivo GROUP BY h.nombre, mv.motivo ORDER BY h.nombre'); 
       console.log(datos[0]);
        /* const hoteles: DatosHotel[] = [];
        const mapaHoteles = new Map<string, DatosHotel>();

        datos[0].forEach((dato: any) => {
            const motivo = mapaHoteles.get(dato.nombre);
            if (motivo) {
                motivo.series.push({
                    name: dato.motivo,
                    value: dato.cantidad
                });
            } else {
                const nuevoHotel: Hotel_motivo = {
                    name: dato.nombre,
                    series: [
                        {
                            name: dato.motivo,
                            value: dato.cantidad
                        }
                    ]
                };
                mapaHoteles.set(dato.nombre, nuevoHotel);
                hoteles.push(nuevoHotel);
            }
        });
        return res.json(hoteles);
        */
    }
}

export const dataController = new DataController();