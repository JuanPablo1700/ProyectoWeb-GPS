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
                const fechaIngreso = new Date();
                const hotelInsertado = yield database_1.default.query('INSERT INTO hotel (nombre, fecha_ingreso, activo, estrellas, direccion, telefono, correo) values (?,?,?,?,?,?,?)', [nombre, fechaIngreso, estado, estrellas, direccion, telefono, correo]);
                if (!hotelInsertado) {
                    return res.status(401).json({ msg: 'No se pudo insertar el hotel' });
                }
                const nuevoHotel = yield database_1.default.query('SELECT * FROM hotel WHERE correo = ?', [correo]);
                if (nuevoHotel) {
                    //Crear los nuevos usuarios de gerente y recepcionista
                    let gerente = 'gerente-' + nombre.toLowerCase().replace(/\s+/g, "-");
                    let recepcion = 'recepcion-' + nombre.toLowerCase().replace(/\s+/g, "-");
                    //Crear las contraseñas y aplicar encode con bcrypt
                    let passGerente = yield bcrypt_1.default.hash(gerente, 10);
                    let passRecepcion = yield bcrypt_1.default.hash(recepcion, 10);
                    //Insertar los usuarios con el fk_id_hotel = id del hotel que acabamos de crear
                    //mandar correo al de los usuarios al correo registrado del hotel
                    //Si no hay errores mandar respuesta de exitosa
                    return res.json(gerente);
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
}
exports.newHotelController = new NewHotelController();
