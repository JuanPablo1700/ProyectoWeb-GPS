export interface Registro {
    id?:number;
    fecha_ingreso:string;
    fecha_salida:string;
    ciudad_huesped:string;
    costo_estancia:number;
    fk_id_habitacion_hotel:number;
    fk_id_usuario:any;
    fk_id_motivo:string;
    motivo?:string;
    tipo_habitacion?:string;
    fk_id_hotel?:any;
    fk_id_tipoHabitacion?:string;
}