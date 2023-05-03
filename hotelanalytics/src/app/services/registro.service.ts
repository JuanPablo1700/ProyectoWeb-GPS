import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Registro } from '../interfaces/registro';
import { Observable } from 'rxjs';
import { TipoHabitacion } from "../interfaces/tipoHabitacion";
import { Motivo } from "../interfaces/motivo";

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private myAppUrl: string;
  private myApiUrlRegistros: string;
  private myApiUrlhabitacion: string;

  constructor(
    private http: HttpClient
  ) { 
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrlRegistros = 'api/registros'
    this.myApiUrlhabitacion = 'api/habitacion'
  }

  nuevo(registro: Registro): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrlRegistros}/nuevo`, registro);
  }

  getRegistros(): Observable<Registro[]> {
    return this.http.get<Registro[]>(`${this.myAppUrl}${this.myApiUrlRegistros}/getRegistros`);
  }
  
  getRegistro(id: number): Observable<Registro> {
    return this.http.get<Registro>(`${this.myAppUrl}${this.myApiUrlRegistros}/getRegistro/${id}`);
  }

  deleteRegistro(id:number):Observable<string> {
    return this.http.delete<string>(`${this.myAppUrl}${this.myApiUrlRegistros}/eliminar/${id}`);
  }
  
  actualizar(id: number, registro:Registro): Observable<Registro> {
    return this.http.put<Registro>(`${this.myAppUrl}${this.myApiUrlRegistros}/actualizar/${id}`, registro);
  }

  getHabitacionesHotel(id: number): Observable<TipoHabitacion[]> {
    return this.http.get<TipoHabitacion[]>(`${this.myAppUrl}${this.myApiUrlhabitacion}/getHabitacionesHotel/${id}`);
  }
  
  getMotivos(): Observable<Motivo[]> {
    return this.http.get<Motivo[]>(`${this.myAppUrl}api/getMotivosVisita`);
  }


}
