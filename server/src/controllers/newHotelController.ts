import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import pool from '../database';

class NewHotelController {

  public async newHotel(req: Request, res: Response) {

    const { nombre, direccion, correo, telefono, estrellas, estado } = req.body;

    try {
      const existe: any = await pool.query('SELECT * FROM hotel WHERE correo = ?', [correo]);

      if (existe[0] != "") {
        return res.status(401).json({ msg: 'El hotel ya existe en el sistema' });
      } else {

        const fechaIngreso = new Date();

        const hotelInsertado: any = await pool.query('INSERT INTO hotel (nombre, fecha_ingreso, activo, estrellas, direccion, telefono, correo) values (?,?,?,?,?,?,?)',
          [nombre, fechaIngreso, estado, estrellas, direccion, telefono, correo]);

        if (hotelInsertado[0].affectedRows >= 1) {

          const nuevoHotel: any = await pool.query('SELECT id, telefono FROM hotel WHERE correo = ?', [correo]);

          if (nuevoHotel[0][0].id != "") {
            //Crear los nuevos usuarios de gerente y recepcionista
            let gerente = 'gerente-' + nombre.toLowerCase().replace(/\s+/g, "-");
            let recepcion = 'recepcion-' + nombre.toLowerCase().replace(/\s+/g, "-");

            //Crear las contraseñas y aplicar encode con bcrypt
            let passGerente = await bcrypt.hash(gerente, 10);
            let passRecepcion = await bcrypt.hash(recepcion, 10);

            let fk_id_hotel = nuevoHotel[0][0].id;
            let telefono = nuevoHotel[0][0].telefono;

            try {
              //Insertar los usuarios con el fk_id_hotel = id del hotel que acabamos de crear
              await pool.query('INSERT INTO usuario (user, password, activo, tipo_usuario, pass_actualizada, fk_id_hotel) values (?,?,?,?,?,?)',
                [gerente, passGerente, '1', 'gerente', 0, fk_id_hotel]);

              await pool.query('INSERT INTO usuario (user, password, activo, tipo_usuario, pass_actualizada, fk_id_hotel) values (?,?,?,?,?,?)',
                [recepcion, passRecepcion, '1', 'recepcionista', 0, fk_id_hotel]);
            } catch (error) {
              return res.status(401).json({ msg: 'Error al guardar los usuarios' });
            }

            //mandar mensaje de los usuarios al telefono registrado del hotel

            const phoneNumber = telefono;
            const message = `Estimado Gerente de ${nombre},
              
              Le escribo para proporcionarle las cuentas para acceder al sitio web Hotel Analytics
              
              Usuario Gerente:
              Nombre de usuario: ${gerente}
              Contraseña: ${gerente}
              
              Usuario Recepcionista:
              Nombre de usuario: ${recepcion}
              Contraseña: ${recepcion}
              
              Espero que les permita acceder a su sitio web sin problemas. Si necesita más información de mi parte, por favor no dude en ponerse en contacto conmigo.
              
              Gracias por su atención y espero que tenga un excelente día.
              
              Atentamente,
              
              Asociación de Hoteles y Moteles de Tepic.`;

            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

            //Si no hay errores mandar respuesta de exitosa

            return res.json(whatsappUrl);
          } else {
            return res.status(401).json({ msg: 'Hotel no encontrado' });
          }
        } else {
          return res.status(401).json({ msg: 'No se pudo insertar el hotel' });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error del servidor' });
    }
  }

  //Consulta para obtener los datos de todos los hoteles ademas de la ultima insercion de registros.
  public async getHotels(req: Request, res: Response) {
    const listHotel = await pool.query('SELECT h.id AS id, h.nombre AS nombre, h.direccion, h.correo, h.telefono, h.estrellas, h.activo, DATEDIFF(CURRENT_DATE, MAX( CASE WHEN rh.id IS NULL THEN NULL ELSE creado END )) AS dias_transcurridos FROM hotel AS h LEFT JOIN habitacion_hotel AS hh ON hh.fk_id_hotel = h.id LEFT JOIN registro_huesped AS rh ON rh.fk_id_habitacion_hotel = hh.id GROUP BY h.id');
    return res.json(listHotel[0]);
  }

  public async getHotel(req: Request, res: Response) {
    const id = req.params.id;
    const idInt = parseInt(id);
    const response:any = await pool.query('SELECT h.id AS id, h.nombre AS nombre, h.direccion, h.correo, h.telefono, h.estrellas, h.activo, DATEDIFF(CURRENT_DATE, MAX( CASE WHEN rh.id IS NULL THEN NULL ELSE creado END )) AS dias_transcurridos FROM hotel AS h LEFT JOIN habitacion_hotel AS hh ON hh.fk_id_hotel = h.id LEFT JOIN registro_huesped AS rh ON rh.fk_id_habitacion_hotel = hh.id WHERE h.id = ? GROUP BY h.id', [idInt]);
    const hotel = response[0][0];
    return res.json(hotel);
  }

  public async updateHotel(req: Request, res: Response) {
    const { nombre, direccion, telefono, estrellas, estado } = req.body;
    const id = req.params.id;
    const idInt = parseInt(id);
    const estrellasInt = parseInt(estrellas);

    try {
      await pool.query('UPDATE hotel SET nombre = ?, direccion = ?, telefono = ?, estrellas = ?, activo = ? WHERE id = ?', [nombre, direccion, telefono, estrellasInt, estado, idInt]);
      await pool.query('UPDATE usuario SET activo = ? where fk_id_hotel = ?', [estado, idInt]);
      return res.json({ msg: 'Hotel actualizado con exito.' });
    } catch (error) {
      return res.status(401).json({ msg: 'Hubo un problema al actualizar los datos.', error });
    }
  }
}

export const newHotelController = new NewHotelController();