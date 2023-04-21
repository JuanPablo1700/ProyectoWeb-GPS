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
      }

      const fechaIngreso = new Date();

      const hotelInsertado = await pool.query('INSERT INTO hotel (nombre, fecha_ingreso, activo, estrellas, direccion, telefono, correo) values (?,?,?,?,?,?,?)',
        [nombre, fechaIngreso, estado, estrellas, direccion, telefono, correo]);

      if (!hotelInsertado) {
        return res.status(401).json({ msg: 'No se pudo insertar el hotel' });
      }

      const nuevoHotel: any = await pool.query('SELECT id, telefono FROM hotel WHERE correo = ?', [correo]);

      if (nuevoHotel[0][0]) {
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
        const message = `Estimado Gerente de Hotel ${nombre},
        
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

    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error del servidor' });
    }
  }

  public async getHotels(req: Request, res: Response) {
    const listHotel = await pool.query('SELECT nombre, direccion, correo, telefono, estrellas, activo FROM hotel');
    return res.json(listHotel[0]);
  }
}

export const newHotelController = new NewHotelController();