export interface TipoHabitacion {
    id: number,
    cantidad: number,
    disponible: number,
    precio: number,
    fk_id_tipoHabitacion: number,
    fk_id_hotel: number,
    tipo_habitacion: String
}