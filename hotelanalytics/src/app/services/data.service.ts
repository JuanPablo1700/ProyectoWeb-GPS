import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  getMotivoGeneral(data:any): Observable<any[]> {
    return this.http.post<any[]>(`http://localhost:3000/api/data/getMotivoGeneral/`, data);
  }

}
