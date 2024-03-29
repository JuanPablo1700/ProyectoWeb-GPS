import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NewHotelService } from 'src/app/services/new-hotel.service';
import { ErrorService } from 'src/app/services/error.service';
import { Hotel } from 'src/app/interfaces/hotel';

@Component({
  selector: 'app-principaldirector',
  templateUrl: './principaldirector.component.html',
  styleUrls: ['./principaldirector.component.css']
})
export class PrincipaldirectorComponent implements OnInit {
  tipoUsuario: any;

  listHotel: Hotel[] = [];
  
  id: number = 0;

  ultimaMod: number = -1;

  constructor(
    private router: Router,
    private _newHotelService: NewHotelService,
    private _errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.tipoUsuario = localStorage.getItem('tipo_usuario');

    if (this.tipoUsuario != "admin") {
      this.logOut();
    }

    this.getHotels();
  }

  getHotels() {
    this._newHotelService.getHotels().subscribe({
      next: (data) => {
        this.listHotel = data;
      },
      error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    })
  }

  nuevo() {
    this.router.navigate(['/nuevohotel']);
  }

  editar(id: number) {
    this.router.navigate(['/editarhotel', id]);
  }

  principaldirector() {
    this.router.navigate(['/principaldirector']);
  };
  
  graficas() {
    this.router.navigate(['/graficasgenerales']);
  };

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tipo_usuario');
    localStorage.removeItem('fk_id_hotel');
    localStorage.removeItem('estrellas');
    localStorage.removeItem('id_usuario');
    this.router.navigate(['/login'])
  }
}
