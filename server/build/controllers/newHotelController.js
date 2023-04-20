"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newHotelController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class NewHotelController {
    newHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, direccion, correo, telefono, estrellas, estado } = req.body;
            try {
                const existe = yield database_1.default.query('SELECT * FROM hotel WHERE correo = ?', [correo]);
                if (existe[0] != "") {
                    return res.status(401).json({ msg: 'El hotel ya existe en el sistema' });
                }
                const fechaIngreso = new Date();
                const hotelInsertado = yield database_1.default.query('INSERT INTO hotel (nombre, fecha_ingreso, activo, estrellas, direccion, telefono, correo) values (?,?,?,?,?,?,?)', [nombre, fechaIngreso, estado, estrellas, direccion, telefono, correo]);
                if (!hotelInsertado) {
                    return res.status(401).json({ msg: 'No se pudo insertar el hotel' });
                }
                const nuevoHotel = yield database_1.default.query('SELECT id, correo FROM hotel WHERE correo = ?', [correo]);
                if (nuevoHotel) {
                    //Crear los nuevos usuarios de gerente y recepcionista
                    let gerente = 'gerente-' + nombre.toLowerCase().replace(/\s+/g, "-");
                    let recepcion = 'recepcion-' + nombre.toLowerCase().replace(/\s+/g, "-");
                    //Crear las contraseñas y aplicar encode con bcrypt
                    let passGerente = yield bcrypt_1.default.hash(gerente, 10);
                    let passRecepcion = yield bcrypt_1.default.hash(recepcion, 10);
                    let fk_id_hotel = nuevoHotel[0][0][0];
                    console.log(fk_id_hotel);
                    try {
                        //Insertar los usuarios con el fk_id_hotel = id del hotel que acabamos de crear
                        const insertGerente = yield database_1.default.query('INSERT INTO usuario (user, password, activo, tipo_usuario, pass_actualizada, fk_id_hotel) values (?,?,?,?,?,?)', [gerente, passGerente, '1', 'gerente', 0, fk_id_hotel]);
                        const insertRecepcion = yield database_1.default.query('INSERT INTO usuario (user, password, activo, tipo_usuario, pass_actualizada, fk_id_hotel) values (?,?,?,?,?,?)', [recepcion, passRecepcion, '1', 'recepcionista', 0, fk_id_hotel]);
                    }
                    catch (error) {
                        console.log(error);
                    }
                    //mandar correo al de los usuarios al correo registrado del hotel
                    let transporter = nodemailer_1.default.createTransport({
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
                        }
                        else {
                            console.log('Correo electrónico enviado: ' + info.response);
                            res.send('Correo electrónico enviado correctamente');
                        }
                    });
                    //Si no hay errores mandar respuesta de exitosa
                    return res.json({ msj: 'Correo enviado correctamente' });
                }
                else {
                    return res.status(401).json({ msg: 'Hotel no encontrado' });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ msg: 'Error del servidor' });
            }
        });
    }
    getHotels(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listHotel = yield database_1.default.query('SELECT nombre, direccion, correo, telefono, estrellas, activo FROM hotel');
            return res.json(listHotel[0]);
        });
    }
}
exports.newHotelController = new NewHotelController();
