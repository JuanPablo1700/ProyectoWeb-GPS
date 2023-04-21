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
class NewHotelController {
    newHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, direccion, correo, telefono, estrellas, estado } = req.body;
            try {
                const existe = yield database_1.default.query('SELECT * FROM hotel WHERE correo = ?', [correo]);
                if (existe[0] != "") {
                    return res.status(401).json({ msg: 'El hotel ya existe en el sistema' });
                }
                else {
                    const fechaIngreso = new Date();
                    const hotelInsertado = yield database_1.default.query('INSERT INTO hotel (nombre, fecha_ingreso, activo, estrellas, direccion, telefono, correo) values (?,?,?,?,?,?,?)', [nombre, fechaIngreso, estado, estrellas, direccion, telefono, correo]);
                    if (hotelInsertado[0].affectedRows >= 1) {
                        const nuevoHotel = yield database_1.default.query('SELECT id, telefono FROM hotel WHERE correo = ?', [correo]);
                        if (nuevoHotel[0][0].id != "") {
                            //Crear los nuevos usuarios de gerente y recepcionista
                            let gerente = 'gerente-' + nombre.toLowerCase().replace(/\s+/g, "-");
                            let recepcion = 'recepcion-' + nombre.toLowerCase().replace(/\s+/g, "-");
                            //Crear las contraseñas y aplicar encode con bcrypt
                            let passGerente = yield bcrypt_1.default.hash(gerente, 10);
                            let passRecepcion = yield bcrypt_1.default.hash(recepcion, 10);
                            let fk_id_hotel = nuevoHotel[0][0].id;
                            let telefono = nuevoHotel[0][0].telefono;
                            try {
                                //Insertar los usuarios con el fk_id_hotel = id del hotel que acabamos de crear
                                yield database_1.default.query('INSERT INTO usuario (user, password, activo, tipo_usuario, pass_actualizada, fk_id_hotel) values (?,?,?,?,?,?)', [gerente, passGerente, '1', 'gerente', 0, fk_id_hotel]);
                                yield database_1.default.query('INSERT INTO usuario (user, password, activo, tipo_usuario, pass_actualizada, fk_id_hotel) values (?,?,?,?,?,?)', [recepcion, passRecepcion, '1', 'recepcionista', 0, fk_id_hotel]);
                            }
                            catch (error) {
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
                        }
                        else {
                            return res.status(401).json({ msg: 'Hotel no encontrado' });
                        }
                    }
                    else {
                        return res.status(401).json({ msg: 'No se pudo insertar el hotel' });
                    }
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
            const listHotel = yield database_1.default.query('SELECT id, nombre, direccion, correo, telefono, estrellas, activo FROM hotel');
            return res.json(listHotel[0]);
        });
    }
    getHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params;
            const hotel = yield database_1.default.query('SELECT id, nombre, direccion, correo, telefono, estrellas, activo FROM hotel WHERE id = ?', [id]);
            return res.json(hotel[0][0]);
        });
    }
    updateHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, direccion, telefono, estrellas, estado } = req.body;
            const id = req.params.id;
            const idInt = parseInt(id);
            const estrellasInt = parseInt(estrellas);
            try {
                yield database_1.default.query('UPDATE hotel SET nombre = ?, direccion = ?, telefono = ?, estrellas = ?, activo = ? WHERE id = ?', [nombre, direccion, telefono, estrellasInt, estado, idInt]);
                return res.json({ msg: 'Hotel actualizado con exito.' });
            }
            catch (error) {
                return res.status(401).json({ msg: 'Hubo un problema al actualizar los datos.', error });
            }
        });
    }
}
exports.newHotelController = new NewHotelController();
