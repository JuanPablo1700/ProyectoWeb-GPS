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
exports.loginController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, password } = req.body;
            if (!user || !password) {
                return res.status(400).json({ error: 'Falta el usuario o la contraseña' });
            }
            try {
                const result = yield database_1.default.query('SELECT id, user, password, activo, tipo_usuario, fk_id_hotel FROM usuario WHERE user = ?', [user]);
                if (!result) {
                    return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
                }
                // Verificar la contraseña hash
                const usuario = result[0];
                const passwordMatch = yield bcrypt_1.default.compare(password, usuario[0][2]);
                if (!passwordMatch) {
                    return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
                }
                const token = jsonwebtoken_1.default.sign({ user: usuario[0][1] }, 'secreto12345', { expiresIn: '1h' });
                // Devolver el token como respuesta
                res.json(token);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error del servidor' });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.clearCookie('token');
            res.json({ message: 'Sesión cerrada' });
        });
    }
}
exports.loginController = new LoginController();
