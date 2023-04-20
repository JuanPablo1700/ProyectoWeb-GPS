import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import pool from '../database';
import nodemailer from 'nodemailer';

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

      const nuevoHotel: any = await pool.query('SELECT id, correo FROM hotel WHERE correo = ?', [correo]);

      if (nuevoHotel) {
        //Crear los nuevos usuarios de gerente y recepcionista
        let gerente = 'gerente-' + nombre.toLowerCase().replace(/\s+/g, "-");
        let recepcion = 'recepcion-' + nombre.toLowerCase().replace(/\s+/g, "-");

        //Crear las contraseñas y aplicar encode con bcrypt
        let passGerente = await bcrypt.hash(gerente, 10);
        let passRecepcion = await bcrypt.hash(recepcion, 10);

        let fk_id_hotel = nuevoHotel[0][0][0];
        
        console.log(fk_id_hotel);

        try {
          //Insertar los usuarios con el fk_id_hotel = id del hotel que acabamos de crear
          const insertGerente = await pool.query('INSERT INTO usuario (user, password, activo, tipo_usuario, pass_actualizada, fk_id_hotel) values (?,?,?,?,?,?)',
            [gerente, passGerente, '1', 'gerente', 0, fk_id_hotel]);
  
          const insertRecepcion = await pool.query('INSERT INTO usuario (user, password, activo, tipo_usuario, pass_actualizada, fk_id_hotel) values (?,?,?,?,?,?)',
            [recepcion, passRecepcion, '1', 'recepcionista', 0, fk_id_hotel]);
        } catch (error) {
          console.log(error);
        }

        //mandar correo al de los usuarios al correo registrado del hotel
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: 'hotelanalyticss@gmail.com',
            pass: 'CR141q$MkBvU3e!CQ'
          }
        });

        let mailOptions = {
          from: 'Remitente <hotelanalyticss@gmail.com>',
          to: 'jcamposcasillas@gmail.com',
          subject: 'Usuarios para accesar a HotelAnalytics',
          text: `El usuario y la contraseña para el gerente es: ${gerente} , y el usuario y la contraseña para el recepcionista es: ${recepcion}. Recuerde que debera actualizar la contraseña la primera vez que inicie sesión.`
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            res.status(500).json({ msg: 'Error al enviar el correo electrónico' });
          } else {
            console.log('Correo electrónico enviado: ' + info.response);
            res.send('Correo electrónico enviado correctamente');
          }
        });

        //Si no hay errores mandar respuesta de exitosa

        return res.json({ msj: 'Correo enviado correctamente' });
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