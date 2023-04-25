import { Component, OnInit } from '@angular/core';
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
export class GraficasgeneralesComponent implements OnInit{

  fechaSelect = "";
  tipoGrafica = "";

  hoteles: Hotel[] = [];

  single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
      {
      "name": "UK",
      "value": 6200000
    }
  ];

  constructor(
    private router: Router,
    private _newHotelService: NewHotelService,
    private _errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.fechaSelect = "-1";
    this.tipoGrafica = "1";
    this.getHotels();
  }

  view: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
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
