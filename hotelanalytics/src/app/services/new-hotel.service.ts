import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Hotel } from "../interfaces/hotel";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewHotelService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/hotel'
  }

  newHotel(hotel: Hotel): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/newHotel`, hotel);
  }

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.myAppUrl}${this.myApiUrl}/getHotels`);
  }
  
  getHotel(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.myAppUrl}${this.myApiUrl}/getHotel/${id}`);
  }
  
  updateHotel(id: number, hotel:Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.myAppUrl}${this.myApiUrl}/updateHotel/${id}`, hotel);
  }
}
