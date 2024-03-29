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

interface DatosHotelSimple {
  name: {
    name: string;
    value: number;
  }[];
}

interface DatosHotelMulti {
  name: string;
  series: {
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
  
  public async getHabitacionesGeneral(req: Request, res: Response) {
    const formulario = req.body;
    let fechaInicio: any = new Date(formulario.fechaInicio);
    let fechaFin: any = new Date(formulario.fechaFin);

    fechaInicio = fechaInicio.getFullYear() + "-" + ("0" + (fechaInicio.getMonth() + 1)).slice(-2) + "-" + ("0" + fechaInicio.getDate()).slice(-2);
    fechaFin = fechaFin.getFullYear() + "-" + ("0" + (fechaFin.getMonth() + 1)).slice(-2) + "-" + ("0" + fechaFin.getDate()).slice(-2);

    const query = "SELECT h.nombre as hotel, th.tipo_habitacion as habitacion, COUNT(*) AS cantidad FROM registro_huesped AS rg LEFT JOIN habitacion_hotel AS hh ON hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel AS h ON h.id = hh.fk_id_hotel LEFT JOIN tipo_habitacion as th ON hh.fk_id_tipoHabitacion = th.id WHERE rg.fecha_ingreso >= '" + fechaInicio + "' AND rg.fecha_ingreso <= '" + fechaFin + "' GROUP by habitacion, hotel";

    const datos: any[] = await pool.query(query);

    const registros: DataRegistros[] = [];
    const mapaRegistros = new Map<string, DataRegistros>();

    datos[0].forEach((dato: any) => {

      const registro = mapaRegistros.get(dato.hotel);
      if (registro) {
        registro.series.push({
          name: dato.habitacion,
          value: dato.cantidad,
        });
      } else {
        const nuevoHotel: Hotel_motivo = {
          name: dato.hotel,
          series: [
            {
              name: dato.habitacion,
              value: dato.cantidad,
            },
          ],
        };
        mapaRegistros.set(dato.hotel, nuevoHotel);
        registros.push(nuevoHotel);
      }
    });

    return res.json(registros);
  }

  /****************************************************************************************************************************** */
  //Por Categoría
  public async getMotivoCategoria(req: Request, res: Response) {
    const form = req.body;
    //console.log(form);
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
   /*  console.log(fechaInicio);
    console.log(fechaFin); */
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
    /* console.log(fechaInicio);
    console.log(fechaFin); */
    const estrellas = form.estrellas;
    const query= "SELECT h.nombre, rg.ciudad_huesped AS ciudad, COUNT(*) AS cantidad FROM registro_huesped AS rg LEFT JOIN habitacion_hotel AS hh ON hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel AS h ON h.id = hh.fk_id_hotel LEFT JOIN motivo_visita AS mv ON mv.id = rg.fk_id_motivo WHERE rg.fecha_ingreso >= '" +
    fechaInicio +
    "' AND rg.fecha_ingreso <= '" +
    fechaFin +
    "' AND h.estrellas = " + estrellas + " GROUP BY h.nombre, rg.ciudad_huesped ORDER BY h.nombre";
   // console.log('ciudad categoria: ' + query);
    
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
    //console.log(form);
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
   /*  console.log(fechaInicio);
    console.log(fechaFin); */
    const estrellas = form.estrellas;
    const query = "SELECT h.nombre, COUNT(*) AS cantidad, rg.fecha_ingreso, rg.fecha_salida FROM registro_huesped AS rg LEFT JOIN habitacion_hotel AS hh ON hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel AS h ON h.id = hh.fk_id_hotel WHERE rg.fecha_ingreso >= '" + fechaInicio + "' AND h.estrellas = " + estrellas + " AND rg.fecha_ingreso <= '" + fechaFin + "'GROUP BY h.nombre, rg.fecha_ingreso ORDER BY rg.fecha_ingreso";
    //console.log(query);
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
  public async getHabitacionesCategoria(req: Request, res: Response) {
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
    const query = "SELECT h.nombre as hotel, th.tipo_habitacion as habitacion, COUNT(*) AS cantidad FROM registro_huesped AS rg LEFT JOIN habitacion_hotel AS hh ON hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel AS h ON h.id = hh.fk_id_hotel LEFT JOIN tipo_habitacion as th ON hh.fk_id_tipoHabitacion = th.id WHERE rg.fecha_ingreso >= '" + fechaInicio + "' AND h.estrellas = " + estrellas + " AND rg.fecha_ingreso <= '" + fechaFin + "'GROUP by th.tipo_habitacion, hotel";
    console.log(query);
    const datos: any[] = await pool.query(query);
    const habitaciones: Hotel_motivo[] = [];
    const mapaHoteles = new Map<string, Hotel_motivo>();
    console.log(datos[0]);
    
    datos[0].forEach((dato: any) => {
      const habitacion = mapaHoteles.get(dato.hotel);
      if (habitacion) {
        habitacion.series.push({
          name: dato.habitacion,
          value: dato.cantidad,
        });
      } else {
        const habitacion: Hotel_motivo = {
          name: dato.hotel,
          series: [
            {
              name: dato.habitacion,
              value: dato.cantidad,
            },
          ],
        };
        mapaHoteles.set(dato.hotel, habitacion);
        habitaciones.push(habitacion);
      }
    });
    console.log(habitaciones);
    
    return res.json(habitaciones);
  }

  public async getCostosHabitacionCategoria(req: Request, res: Response) {

    const estrellas = req.params.estrellas;

    const query = "SELECT h.nombre, th.tipo_habitacion, hh.precio FROM habitacion_hotel AS hh LEFT JOIN hotel AS h ON h.id = hh.fk_id_hotel LEFT JOIN tipo_habitacion AS th ON th.id = hh.fk_id_tipoHabitacion WHERE h.estrellas = " + estrellas + " GROUP BY th.tipo_habitacion, hh.precio ORDER BY h.nombre";

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

   /****************************************************************************************************************************** */
  //Por Hotel
  public async getMotivoHotel(req: Request, res: Response) {
    const form = req.body;
    //console.log(form);
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
    //console.log(fechaInicio);
    //console.log(fechaFin);

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
   // console.log(form);
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
  /*  */ /*  console.log(fechaInicio);
    console.log(fechaFin); */
    
    const query = "SELECT h.nombre, COUNT(*) AS cantidad, rg.fecha_ingreso, rg.fecha_salida FROM registro_huesped AS rg LEFT JOIN habitacion_hotel AS hh ON hh.id = rg.fk_id_habitacion_hotel LEFT JOIN hotel AS h ON h.id = hh.fk_id_hotel WHERE rg.fecha_ingreso >= '" + fechaInicio + "' AND h.id = " + idHotel + " AND rg.fecha_ingreso <= '" + fechaFin + "'GROUP BY h.nombre, rg.fecha_ingreso ORDER BY rg.fecha_ingreso";
   // console.log('registro hotel: ' + query);
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
/* 
  public async getCostosHabitacionHotel(req: Request, res: Response) {

    const idHotel = req.params.idHotel;

    const query = "SELECT h.nombre, th.tipo_habitacion, hh.precio FROM habitacion_hotel AS hh LEFT JOIN hotel AS h ON h.id = hh.fk_id_hotel LEFT JOIN tipo_habitacion AS th ON th.id = hh.fk_id_tipoHabitacion WHERE h.id = " + idHotel + " GROUP BY th.tipo_habitacion, hh.precio ORDER BY h.nombre";

    const datos: any[] = await pool.query(query);

    const costosHabitacion = [];

    for (const dato of datos[0]) {
      costosHabitacion.push({
        name: dato.tipo_habitacion,
        value: dato.precio,
      });
    }

    return res.json(costosHabitacion);
  } */

}

export const dataController = new DataController();
