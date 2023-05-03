import { Request, Response } from "express";
import pool from "../database";

interface Hotel_motivo {
  name: string;
  series: {
    name: string;
    value: number;
  }[];
}

interface Ciudad {
  name: string;
  series: {
    name: string;
    value: number;
  }[];
}

interface DataRegistros {
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
  //Generales
  public async getMotivoGeneral(req: Request, res: Response) {
    const formulario = req.body;
    let fechaInicio: any = new Date(formulario.fechaInicio);
    let fechaFin: any = new Date(formulario.fechaFin);

    fechaInicio = fechaInicio.getFullYear() + "-" + ("0" + (fechaInicio.getMonth() + 1)).slice(-2) + "-" + ("0" + fechaInicio.getDate()).slice(-2);
    fechaFin = fechaFin.getFullYear() + "-" + ("0" + (fechaFin.getMonth() + 1)).slice(-2) + "-" + ("0" + fechaFin.getDate()).slice(-2);

    console.log(fechaInicio);
    console.log(fechaFin);

    const query = "SELECT h.nombre, mv.motivo, COUNT(*) AS cantidad, rg.fecha_ingreso, rg.fecha_salida FROM registro_huesped AS rg LEFT JOIN habitacion_hotel AS hh ON hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel AS h ON h.id = hh.fk_id_hotel LEFT JOIN motivo_visita AS mv ON mv.id = rg.fk_id_motivo WHERE rg.fecha_ingreso >= '" +
      fechaInicio +
      "' AND rg.fecha_ingreso <= '" +
      fechaFin +
      "' GROUP BY h.nombre, mv.motivo";

    console.log(query);

    const datos: any[] = await pool.query(query);

    const hoteles: Hotel_motivo[] = [];
    const mapaHoteles = new Map<string, Hotel_motivo>();

    datos[0].forEach((dato: any) => {
      const motivo = mapaHoteles.get(dato.nombre);
      if (motivo) {
        motivo.series.push({
          name: dato.motivo,
          value: dato.cantidad,
        });
      } else {
        const nuevoHotel: Hotel_motivo = {
          name: dato.nombre,
          series: [
            {
              name: dato.motivo,
              value: dato.cantidad,
            },
          ],
        };
        mapaHoteles.set(dato.nombre, nuevoHotel);
        hoteles.push(nuevoHotel);
      }
    });

    return res.json(hoteles);
  }

  public async getCostosHabitacionGeneral(req: Request, res: Response) {

    const query = "SELECT h.nombre, th.tipo_habitacion, hh.precio FROM habitacion_hotel AS hh LEFT JOIN hotel AS h ON h.id = hh.fk_id_hotel LEFT JOIN tipo_habitacion as th on th.id = hh.fk_id_tipoHabitacion GROUP BY th.tipo_habitacion, hh.precio ORDER BY h.nombre";

    const datos: any[] = await pool.query(query);

    const hoteles: Hotel_motivo[] = [];
    const mapaHoteles = new Map<string, Hotel_motivo>();

    datos[0].forEach((dato: any) => {
      const motivo = mapaHoteles.get(dato.nombre);
      if (motivo) {
        motivo.series.push({
          name: dato.tipo_habitacion,
          value: dato.precio,
        });
      } else {
        const nuevoHotel: Hotel_motivo = {
          name: dato.nombre,
          series: [
            {
              name: dato.tipo_habitacion,
              value: dato.precio,
            },
          ],
        };
        mapaHoteles.set(dato.nombre, nuevoHotel);
        hoteles.push(nuevoHotel);
      }
    });

    return res.json(hoteles);
  }

  public async getCiudadVisitaGeneral(req: Request, res: Response) {
    const formulario = req.body;
    let fechaInicio: any = new Date(formulario.fechaInicio);
    let fechaFin: any = new Date(formulario.fechaFin);

    fechaInicio = fechaInicio.getFullYear() + "-" + ("0" + (fechaInicio.getMonth() + 1)).slice(-2) + "-" + ("0" + fechaInicio.getDate()).slice(-2);
    fechaFin = fechaFin.getFullYear() + "-" + ("0" + (fechaFin.getMonth() + 1)).slice(-2) + "-" + ("0" + fechaFin.getDate()).slice(-2);

    const query = "SELECT h.nombre, rg.ciudad_huesped AS ciudad, COUNT(*) AS cantidad FROM registro_huesped AS rg LEFT JOIN habitacion_hotel AS hh ON hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel AS h ON h.id = hh.fk_id_hotel LEFT JOIN motivo_visita AS mv ON mv.id = rg.fk_id_motivo WHERE rg.fecha_ingreso >= '" +
      fechaInicio +
      "' AND rg.fecha_ingreso <= '" +
      fechaFin +
      "' GROUP BY h.nombre, rg.ciudad_huesped ORDER BY h.nombre";

    const datos: any[] = await pool.query(query);

    const ciudades: Ciudad[] = [];
    const mapaCiudades = new Map<string, Ciudad>();

    datos[0].forEach((dato: any) => {
      const ciudad = mapaCiudades.get(dato.nombre);
      if (ciudad) {
        ciudad.series.push({
          name: dato.ciudad,
          value: dato.cantidad,
        });
      } else {
        const nuevaCiudad: Ciudad = {
          name: dato.nombre,
          series: [
            {
              name: dato.ciudad,
              value: dato.cantidad,
            },
          ],
        };
        mapaCiudades.set(dato.nombre, nuevaCiudad);
        ciudades.push(nuevaCiudad);
      }
    });

    return res.json(ciudades);
  }

  public async getRegistrosGeneral(req: Request, res: Response) {
    const formulario = req.body;
    let fechaInicio: any = new Date(formulario.fechaInicio);
    let fechaFin: any = new Date(formulario.fechaFin);

    fechaInicio = fechaInicio.getFullYear() + "-" + ("0" + (fechaInicio.getMonth() + 1)).slice(-2) + "-" + ("0" + fechaInicio.getDate()).slice(-2);
    fechaFin = fechaFin.getFullYear() + "-" + ("0" + (fechaFin.getMonth() + 1)).slice(-2) + "-" + ("0" + fechaFin.getDate()).slice(-2);

    console.log(fechaInicio);
    console.log(fechaFin);

    const query = "SELECT h.nombre, COUNT(*) AS cantidad, rg.fecha_ingreso, rg.fecha_salida FROM registro_huesped AS rg LEFT JOIN habitacion_hotel AS hh ON hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel AS h ON h.id = hh.fk_id_hotel WHERE rg.fecha_ingreso >= '" + fechaInicio + "' AND rg.fecha_ingreso <= '" + fechaFin + "'GROUP BY h.nombre, rg.fecha_ingreso ORDER BY rg.fecha_ingreso";

    console.log(query);

    const datos: any[] = await pool.query(query);

    const registros: DataRegistros[] = [];
    const mapaRegistros = new Map<string, DataRegistros>();

    datos[0].forEach((dato: any) => {

      let fechaIngreso: any = new Date(dato.fecha_ingreso);

      fechaIngreso = fechaIngreso.getFullYear() + "-" + ("0" + (fechaIngreso.getMonth() + 1)).slice(-2) + "-" + ("0" + fechaIngreso.getDate()).slice(-2);

      const registro = mapaRegistros.get(dato.nombre);
      if (registro) {
        registro.series.push({
          name: fechaIngreso,
          value: dato.cantidad,
        });
      } else {
        const nuevoHotel: Hotel_motivo = {
          name: dato.nombre,
          series: [
            {
              name: fechaIngreso,
              value: dato.cantidad,
            },
          ],
        };
        mapaRegistros.set(dato.nombre, nuevoHotel);
        registros.push(nuevoHotel);
      }
    });

    return res.json(registros);
  }

  /**
   * Para ver habitaciones por hotel
   * SELECT h.nombre as hotel, th.tipo_habitacion as habitacion, COUNT(*) AS cantidad FROM registro_huesped AS rg LEFT JOIN habitacion_hotel AS hh ON hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel AS h ON h.id = hh.fk_id_hotel LEFT JOIN tipo_habitacion as th ON hh.fk_id_tipoHabitacion = th.id GROUP by th.tipo_habitacion, hotel;
   */

  /****************************************************************************************************************************** */
  //Por Categoría
  public async getMotivoCategoria(req: Request, res: Response) {
    const form = req.body;
    console.log(form);
    let fechaInicio: any = new Date(form.fechaInicio);
    let fechaFin: any = new Date(form.fechaFin);
    fechaInicio =
      fechaInicio.getFullYear() +
      "-" +
      ("0" + (fechaInicio.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + fechaInicio.getDate()).slice(-2);
    fechaFin =
      fechaFin.getFullYear() +
      "-" +
      ("0" + (fechaFin.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + fechaFin.getDate()).slice(-2);
    console.log(fechaInicio);
    console.log(fechaFin);
    const estrellas = form.estrellas;

    const datos: any[] = await pool.query(
      "SELECT h.nombre, mv.motivo, COUNT(*) as cantidad FROM registro_huesped as rg LEFT JOIN habitacion_hotel as hh on hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel as h on h.id = hh.fk_id_hotel LEFT JOIN motivo_visita as mv on mv.id = rg.fk_id_motivo WHERE h.estrellas = " +
      estrellas +
      " AND ( rg.fecha_ingreso >= '" +
      fechaInicio +
      "' AND rg.fecha_ingreso <= '" +
      fechaFin +
      "') GROUP BY h.nombre, mv.motivo ORDER BY h.nombre"
    );

    const hoteles: Hotel_motivo[] = [];
    const mapaHoteles = new Map<string, Hotel_motivo>();

    datos[0].forEach((dato: any) => {
      const motivo = mapaHoteles.get(dato.nombre);
      if (motivo) {
        motivo.series.push({
          name: dato.motivo,
          value: dato.cantidad,
        });
      } else {
        const nuevoHotel: Hotel_motivo = {
          name: dato.nombre,
          series: [
            {
              name: dato.motivo,
              value: dato.cantidad,
            },
          ],
        };
        mapaHoteles.set(dato.nombre, nuevoHotel);
        hoteles.push(nuevoHotel);
      }
    });

    return res.json(hoteles);
  }

  public async getCiudadCategoria(req: Request, res: Response) {
    const form = req.body;
    console.log(form);
    let fechaInicio: any = new Date(form.fechaInicio);
    let fechaFin: any = new Date(form.fechaFin);
    fechaInicio =
      fechaInicio.getFullYear() +
      "-" +
      ("0" + (fechaInicio.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + fechaInicio.getDate()).slice(-2);
    fechaFin =
      fechaFin.getFullYear() +
      "-" +
      ("0" + (fechaFin.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + fechaFin.getDate()).slice(-2);
    console.log(fechaInicio);
    console.log(fechaFin);
    const estrellas = form.estrellas;
    const query= "SELECT h.nombre, rg.ciudad_huesped AS ciudad, COUNT(*) AS cantidad FROM registro_huesped AS rg LEFT JOIN habitacion_hotel AS hh ON hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel AS h ON h.id = hh.fk_id_hotel LEFT JOIN motivo_visita AS mv ON mv.id = rg.fk_id_motivo WHERE rg.fecha_ingreso >= '" +
    fechaInicio +
    "' AND rg.fecha_ingreso <= '" +
    fechaFin +
    "' AND h.estrellas = " + estrellas + " GROUP BY h.nombre, rg.ciudad_huesped ORDER BY h.nombre";
    console.log('ciudad categoria: ' + query);
    
    const datos: any[] = await pool.query(query);
    const ciudades: Hotel_motivo[] = [];
    const mapaHoteles = new Map<string, Hotel_motivo>();
    datos[0].forEach((dato: any) => {
      const ciudad = mapaHoteles.get(dato.nombre);
      if (ciudad) {
        ciudad.series.push({
          name: dato.ciudad,
          value: dato.cantidad,
        });
      } else {
        const ciudad: Hotel_motivo = {
          name: dato.nombre,
          series: [
            {
              name: dato.ciudad,
              value: dato.cantidad,
            },
          ],
        };
        mapaHoteles.set(dato.nombre, ciudad);
        ciudades.push(ciudad);
      }
    });
    return res.json(ciudades);
  }


  public async getRegistrosCategoria(req: Request, res: Response) {
    const form = req.body;
    console.log(form);
    let fechaInicio: any = new Date(form.fechaInicio);
    let fechaFin: any = new Date(form.fechaFin);
    fechaInicio =
      fechaInicio.getFullYear() + "-" +
      ("0" + (fechaInicio.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + fechaInicio.getDate()).slice(-2);
    fechaFin =
      fechaFin.getFullYear() +
      "-" +
      ("0" + (fechaFin.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + fechaFin.getDate()).slice(-2);
    console.log(fechaInicio);
    console.log(fechaFin);
    const estrellas = form.estrellas;
    const query = "SELECT h.nombre, COUNT(*) AS cantidad, rg.fecha_ingreso, rg.fecha_salida FROM registro_huesped AS rg LEFT JOIN habitacion_hotel AS hh ON hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel AS h ON h.id = hh.fk_id_hotel WHERE rg.fecha_ingreso >= '" + fechaInicio + "' AND h.estrellas = " + estrellas + " AND rg.fecha_ingreso <= '" + fechaFin + "'GROUP BY h.nombre, rg.fecha_ingreso ORDER BY rg.fecha_ingreso";
    console.log(query);
    const datos: any[] = await pool.query(query);
    const registros: DataRegistros[] = [];
    const mapaRegistros = new Map<string, Hotel_motivo>();
    datos[0].forEach((dato: any) => {
      let fechaIngreso: any = new Date(dato.fecha_ingreso);
      fechaIngreso = fechaIngreso.getFullYear() + "-" + ("0" + (fechaIngreso.getMonth() + 1)).slice(-2) + "-" + ("0" + fechaIngreso.getDate()).slice(-2);
      const registro = mapaRegistros.get(dato.nombre);
      if (registro) {
        registro.series.push({
          name: fechaIngreso,
          value: dato.cantidad,
        });
      } else {
        const nuevoHotel: Hotel_motivo = {
          name: dato.nombre,
          series: [
            {
              name: fechaIngreso,
              value: dato.cantidad,
            },
          ],
        };
        mapaRegistros.set(dato.nombre, nuevoHotel);
        registros.push(nuevoHotel);
      }
    });
    return res.json(registros);
  }

   /****************************************************************************************************************************** */
  //Por Hotel
  public async getMotivoHotel(req: Request, res: Response) {
    const form = req.body;
    console.log(form);
    let fechaInicio: any = new Date(form.fechaInicio);
    let fechaFin: any = new Date(form.fechaFin);
    fechaInicio =
      fechaInicio.getFullYear() +
      "-" +
      ("0" + (fechaInicio.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + fechaInicio.getDate()).slice(-2);
    fechaFin =
      fechaFin.getFullYear() +
      "-" +
      ("0" + (fechaFin.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + fechaFin.getDate()).slice(-2);
    const idHotel = form.fk_id_hotel;
    console.log(fechaInicio);
    console.log(fechaFin);

    const datos: any[] = await pool.query(
      "SELECT h.nombre, mv.motivo, COUNT(*) AS cantidad, rg.fecha_ingreso, rg.fecha_salida FROM registro_huesped AS rg LEFT JOIN habitacion_hotel AS hh ON hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel AS h ON h.id = hh.fk_id_hotel LEFT JOIN motivo_visita AS mv ON mv.id = rg.fk_id_motivo WHERE h.id = " +
      idHotel +
      " AND ( rg.fecha_ingreso >= '" +
      fechaInicio +
      "' AND rg.fecha_ingreso <= '" +
      fechaFin +
      "') GROUP BY h.nombre, mv.motivo"
    );
    //console.log(datos[0]);
    const motivo = [];
    for (const dato of datos[0]) {
      motivo.push({
        name: dato.motivo,
        value: dato.cantidad,
      });
    }
    //console.log(motivo);
    return res.json(motivo);
  }

  public async getCiudadHotel(req: Request, res: Response) {
    const form = req.body;
    //console.log(form);
    let fechaInicio: any = new Date(form.fechaInicio);
    let fechaFin: any = new Date(form.fechaFin);
    const idHotel = form.fk_id_hotel;

    fechaInicio =
      fechaInicio.getFullYear() +
      "-" +
      ("0" + (fechaInicio.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + fechaInicio.getDate()).slice(-2);
    fechaFin =
      fechaFin.getFullYear() +
      "-" +
      ("0" + (fechaFin.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + fechaFin.getDate()).slice(-2);
    const query =
      "SELECT h.nombre, rg.ciudad_huesped as ciudad, COUNT(*) AS cantidad FROM registro_huesped AS rg LEFT JOIN habitacion_hotel AS hh ON hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel AS h ON h.id = hh.fk_id_hotel LEFT JOIN motivo_visita AS mv ON mv.id = rg.fk_id_motivo WHERE h.id = " +
      idHotel +
      " AND ( rg.fecha_ingreso >= '" +
      fechaInicio +
      "' AND rg.fecha_ingreso <= '" +
      fechaFin +
      "') GROUP BY h.nombre, rg.ciudad_huesped";
   // console.log(query);
    const datos: any[] = await pool.query(query);
   // console.log(datos[0]);
    const ciudad = [];

    for (const dato of datos[0]) {
      ciudad.push({
        name: dato.ciudad,
        value: dato.cantidad,
      });
    }

    //console.log("ciudad" + ciudad);
    return res.json(ciudad);
  }
  public async getRegistrosHotel(req: Request, res: Response) {
    const form = req.body;
    console.log(form);
    let fechaInicio: any = new Date(form.fechaInicio);
    let fechaFin: any = new Date(form.fechaFin);
    fechaInicio =
      fechaInicio.getFullYear() + "-" +
      ("0" + (fechaInicio.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + fechaInicio.getDate()).slice(-2);
    fechaFin =
      fechaFin.getFullYear() +
      "-" +
      ("0" + (fechaFin.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + fechaFin.getDate()).slice(-2);
    const idHotel = form.fk_id_hotel;
    console.log(fechaInicio);
    console.log(fechaFin);
    
    const query = "SELECT h.nombre, COUNT(*) AS cantidad, rg.fecha_ingreso, rg.fecha_salida FROM registro_huesped AS rg LEFT JOIN habitacion_hotel AS hh ON hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel AS h ON h.id = hh.fk_id_hotel WHERE rg.fecha_ingreso >= '" + fechaInicio + "' AND h.id = " + idHotel + " AND rg.fecha_ingreso <= '" + fechaFin + "'GROUP BY h.nombre, rg.fecha_ingreso ORDER BY rg.fecha_ingreso";
    console.log('registro hotel: ' + query);
    const datos: any[] = await pool.query(query);
    const registros: DataRegistros[] = [];
    const mapaRegistros = new Map<string, Hotel_motivo>();
    datos[0].forEach((dato: any) => {
      let fechaIngreso: any = new Date(dato.fecha_ingreso);
      fechaIngreso = fechaIngreso.getFullYear() + "-" + ("0" + (fechaIngreso.getMonth() + 1)).slice(-2) + "-" + ("0" + fechaIngreso.getDate()).slice(-2);
      const registro = mapaRegistros.get(dato.nombre);
      if (registro) {
        registro.series.push({
          name: fechaIngreso,
          value: dato.cantidad,
        });
      } else {
        const nuevoHotel: Hotel_motivo = {
          name: dato.nombre,
          series: [
            {
              name: fechaIngreso,
              value: dato.cantidad,
            },
          ],
        };
        mapaRegistros.set(dato.nombre, nuevoHotel);
        registros.push(nuevoHotel);
      }
    });
    return res.json(registros);
  }

  public async getHabitacionesHotel(req: Request, res: Response) {
    const form = req.body;
    //console.log(form);
    let fechaInicio: any = new Date(form.fechaInicio);
    let fechaFin: any = new Date(form.fechaFin);
    const idHotel = form.fk_id_hotel;

    fechaInicio =
      fechaInicio.getFullYear() +
      "-" +
      ("0" + (fechaInicio.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + fechaInicio.getDate()).slice(-2);
    fechaFin =
      fechaFin.getFullYear() +
      "-" +
      ("0" + (fechaFin.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + fechaFin.getDate()).slice(-2);
    const query = "SELECT h.nombre as hotel, th.tipo_habitacion as habitacion, COUNT(*) AS cantidad FROM registro_huesped AS rg LEFT JOIN habitacion_hotel AS hh ON hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel AS h ON h.id = hh.fk_id_hotel LEFT JOIN tipo_habitacion as th ON hh.fk_id_tipoHabitacion = th.id WHERE h.id = " +
    idHotel +
    " AND ( rg.fecha_ingreso >= '" +
    fechaInicio +
    "' AND rg.fecha_ingreso <= '" +
    fechaFin +
    "') GROUP by th.tipo_habitacion, hotel"
   // console.log(query);
    const datos: any[] = await pool.query(query);
   // console.log(datos[0]);
    const habitaciones = [];

    for (const dato of datos[0]) {
      habitaciones.push({
        name: dato.habitacion,
        value: dato.cantidad,
      });
    }

    //console.log("ciudad" + ciudad);
    return res.json(habitaciones);
  }
}

export const dataController = new DataController();
