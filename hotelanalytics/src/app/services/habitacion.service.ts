import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { TipoHabitacion } from '../interfaces/tipoHabitacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private myAppUrl: string;
  private myApiUrlhabitacion: string;

  constructor(
    private http: HttpClient
  ) { 
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrlhabitacion = 'api/habitacion'
  }

  nuevo(tipo_habitacion: any): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrlhabitacion}/nuevo`, tipo_habitacion);
  }

  getHabitacionesHotel(id: number): Observable<TipoHabitacion[]> {
    return this.http.get<TipoHabitacion[]>(`${this.myAppUrl}${this.myApiUrlhabitacion}/getHabitacionesHotel/${id}`);
  }
  
  getHabitacionById(id: number): Observable<TipoHabitacion> {
    return this.http.get<TipoHabitacion>(`${this.myAppUrl}${this.myApiUrlhabitacion}/getHabitacionById/${id}`);
  }
  
  getTiposHabitaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrlhabitacion}/getTiposHabitaciones/`);
  }
  

}
