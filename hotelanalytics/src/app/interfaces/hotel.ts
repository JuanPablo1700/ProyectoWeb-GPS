export interface Hotel {
    id:number;
    nombre:string;
    direccion:string;
    correo:string;
    telefono:string;
    estrellas:number;
    estado:string;
    activo:number;
    dias_transcurridos?:number | null;
}