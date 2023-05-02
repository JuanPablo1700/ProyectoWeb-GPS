import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewHotelService } from 'src/app/services/new-hotel.service';
import { Hotel } from 'src/app/interfaces/hotel';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-graficasgenerales',
  templateUrl: './graficasgenerales.component.html',
  styleUrls: ['./graficasgenerales.component.css']
})
export class GraficasgeneralesComponent implements OnInit {

  fechaSelect = "";
  tipoGrafica = "";
  fechaInicio:any = "";
  fechaFin:any = "";
  estrellas = "";
  idHotel = "";

  hoteles: Hotel[] = [];
  motivo: any;
  registros: any;

  parametros: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _newHotelService: NewHotelService,
    private _errorService: ErrorService,
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
    this.tipoGrafica = "-1";
    this.fechaSelect = "-1";
    this.fechaInicio = "";
    this.fechaFin = "";
    this.estrellas = "-1";
    this.idHotel = "-1";
    this.getHotels();
  }

  consultar() {

    const hoy = new Date();

    if (this.tipoGrafica == "-1") {
      return this.toastr.error('Seleccione un tipo de gráfica', 'Error');
    }

    if (this.fechaSelect == "-1") {
      return this.toastr.error('Seleccione la fecha de consulta', 'Error');
    }
    
    if (this.fechaSelect == "4" && !this.fechaInicio) {
      return this.toastr.error('Seleccione una fecha de inicio', 'Error');
    }
 
    if (this.fechaSelect == "4" && !this.fechaFin) {
      return this.toastr.error('Seleccione una fecha final', 'Error');
    }

    if (this.tipoGrafica == "1" && this.estrellas == "-1") {
      return this.toastr.error('Seleccione un tipo de hotel', 'Error');
    }

    if (this.tipoGrafica == "2" && this.idHotel == "-1") {
      return this.toastr.error('Seleccione un hotel', 'Error');
    }

    if (this.fechaSelect == "1") { //Este día
      this.fechaInicio = hoy;
      this.fechaFin = hoy;
    }
    if (this.fechaSelect == "2") { //Esta semana
      this.fechaInicio = new Date(hoy.setDate(hoy.getDate() - hoy.getDay())); //inicio de la semana actual empezando por domingo
      this.fechaFin = hoy; //NOTA: mandar el último día de la semana
      this.fechaFin.setDate(this.fechaFin.getDate() + (6 - this.fechaFin.getDay()));
      this.fechaFin = hoy;
    }
    if (this.fechaSelect == "3") { //Este mes
      this.fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1); //inicio de mes actual
      this.fechaFin = new Date(this.fechaInicio.getFullYear(), this.fechaInicio.getMonth() + 1, 0);
      
      
    }
    if (this.fechaSelect == "4") { //Personalizado
      if (this.fechaInicio == "" || this.fechaFin == "") {
        return this.toastr.error('Seleccione fecha inicio y fecha fin correctamente', 'Error');
      }
      if (this.fechaInicio > this.fechaFin) {
        return this.toastr.error('Seleccione fecha inicio y fecha fin correctamente', 'Error');
      }
    }

    if (this.tipoGrafica == "1" && this.estrellas == "0") {
      this.parametros = {
        "fechaInicio": this.fechaInicio,
        "fechaFin": this.fechaFin
      }

      this._dataService.getMotivoGeneral(this.parametros).subscribe(data => { this.motivo = data });
      this._dataService.getRegistrosGeneral(this.parametros).subscribe(data => { this.registros = data });
    }

    this.parametros = {
      "tipoGrafica": this.tipoGrafica,
      "fechaSelect": this.fechaSelect,
      "fechaInicio": this.fechaInicio,
      "fechaFin": this.fechaFin,
      "estrellas": this.estrellas,
      "idHotel": this.idHotel
    }
    return true;
  }

  get multi1() {
    return this.motivo;
  }
  get multi2() {
    return this.registros;
  }

  view: [number, number] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  legendPosition: string = 'below';
  showXAxisLabel: boolean = true;
  yAxisLabel1: string = 'Hotel';
  yAxisLabel2: string = 'Registros';
  showYAxisLabel: boolean = true;
  xAxisLabel1 = 'Cantidad';
  xAxisLabel2 = 'Hotel';

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
    localStorage.removeItem('fk_id_hotel');
    localStorage.removeItem('estrellas');
    localStorage.removeItem('id_usuario');
    this.router.navigate(['/login'])
  }
}
