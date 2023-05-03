import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  //Generales
  getMotivoGeneral(data:any): Observable<any[]> {
    return this.http.post<any[]>(`http://localhost:3000/api/data/getMotivoGeneral/`, data);
  }
  
  getRegistrosGeneral(data:any): Observable<any[]> {
    return this.http.post<any[]>(`http://localhost:3000/api/data/getRegistrosGeneral/`, data);
  }
  
  getCiudadVisitaGeneral(data:any): Observable<any[]> {
    return this.http.post<any[]>(`http://localhost:3000/api/data/getCiudadVisitaGeneral/`, data);
  }

  //Por categoria
  getMotivoCategoria(data:any): Observable<any[]> {
    return this.http.post<any[]>(`http://localhost:3000/api/data/getMotivoCategoria/`, data);
  }

  getRegistrosCategoria(data:any): Observable<any[]> {
    return this.http.post<any[]>(`http://localhost:3000/api/data/getRegistrosCategoria/`, data);
  }
  
  //Individuales
  getMotivoHotel(data:any): Observable<any[]> {
    return this.http.post<any[]>(`http://localhost:3000/api/data/getMotivoHotel/`, data);
  }

  getCiudadHotel(data:any): Observable<any[]> {
    return this.http.post<any[]>(`http://localhost:3000/api/data/getCiudadHotel/`, data);
  }
}
