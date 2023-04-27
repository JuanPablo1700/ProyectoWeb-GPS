import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewHotelService } from 'src/app/services/new-hotel.service';
import { Hotel } from 'src/app/interfaces/hotel';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-graficasgenerales',
  templateUrl: './graficasgenerales.component.html',
  styleUrls: ['./graficasgenerales.component.css']
})
export class GraficasgeneralesComponent implements OnInit {

  fechaSelect = "";
  tipoGrafica = "";

  hoteles: Hotel[] = [];
  nuevo:any;

  constructor(
    private router: Router,
    private _newHotelService: NewHotelService,
    private _errorService: ErrorService,
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
    this.fechaSelect = "-1";
    this.tipoGrafica = "1";
    this.getHotels();

    this.nuevo = this._dataService.getMotivoGeneral();
    console.log(this.nuevo);
  }

  get multi() {
    /* this.nuevo = this._dataService.getMotivoGeneral();
    console.log(this.nuevo); */
    return this.nuevo;
  }

  view: [number, number] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  legendPosition: string = 'below';
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Hotel';
  showYAxisLabel: boolean = true;
  xAxisLabel = 'Cantidad';

  schemeType: string = 'ordinal';

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
