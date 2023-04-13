"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, user, password, activo, tipo_usuario, fk_id_hotel) {
        this.id = id;
        this.user = user;
        this.password = password;
        this.activo = activo;
        this.tipo_usuario = tipo_usuario;
        this.fk_id_hotel = fk_id_hotel;
    }
    getId() {
        return this.id;
    }
    getUser() {
        return this.user;
    }
    getPassword() {
        return this.password;
    }
    getActivo() {
        return this.activo;
    }
    getTipoUsuario() {
        return this.tipo_usuario;
    }
    getFkIdHotel() {
        return this.fk_id_hotel;
    }
}
exports.User = User;
