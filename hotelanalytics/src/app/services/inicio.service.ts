import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(
    private http: HttpClient
  ) { 
    this.myAppUrl = 'http://localhost:3000';
    this.myApiUrl = '/api/inicio';
  }

  newPassword(user: User): Observable<string> {
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/newPassword`,user);
}
}
