import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewHotelService } from 'src/app/services/new-hotel.service';
import { Hotel } from 'src/app/interfaces/hotel';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-graficasgenerales',
  templateUrl: './graficasgenerales.component.html',
  styleUrls: ['./graficasgenerales.component.css']
})
export class GraficasgeneralesComponent implements OnInit, DoCheck{

  fechaSelect = "";
  tipoGrafica = "";

  hoteles: Hotel[] = [];

  constructor(
    private router: Router,
    private _newHotelService: NewHotelService,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.fechaSelect = "-1";
    this.tipoGrafica = "1";
  
    this.getHotels();
  }

  ngDoCheck(): void {
    
  }

  getHotels() {
    this._newHotelService.getHotels().subscribe({
      next: (data) => {
        this.hoteles = data;
      },
      error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    })
  }

  principaldirector() {
    this.router.navigate(['/principaldirector']);
  };

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tipo_usuario');
    this.router.navigate(['/login'])
  }
}
