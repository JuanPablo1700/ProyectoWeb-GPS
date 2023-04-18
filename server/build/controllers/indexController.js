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
exports.indexController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
class IndexController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const hoteles = yield database_1.default.query('select * from hotel');
            res.json(hoteles);
        });
    }
    newPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, password } = req.body;
            if (!user || !password) {
                return res.status(400).json({ error: 'Ingrese la nueva contraseña' });
            }
            try {
                const hashPassword = yield bcrypt_1.default.hash(password, 10);
                const result = yield database_1.default.query('UPDATE usuario SET password = ?, pass_actualizada = 1 where user = ?', [hashPassword, user]);
                if (!result) {
                    return res.status(500).json({ error: 'No se actualizo la contraseña' });
                }
                return res.json({ 'msg': 'Contraseña actualizada correctamente' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error del servidor' });
            }
        });
    }
}
exports.indexController = new IndexController();
