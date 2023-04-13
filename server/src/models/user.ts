export class User {
    
    private id:number;
    private user:string;
    private password:string;
    private activo:string;
    private tipo_usuario:string;
    private fk_id_hotel:number;

    constructor(id:number, user:string, password: string, activo:string, tipo_usuario:string, fk_id_hotel:number){
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