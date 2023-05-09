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
  tipoUsuario:any;

  fechaSelect = "";
  tipoGrafica = "";
  fechaInicio:any = "";
  fechaFin:any = "";
  estrellas = "";
  idHotel = "";

  hoteles: Hotel[] = [];
  motivo: any;
  registros: any;
  ciudades: any;
  habitaciones: any;
  costos: any;

  motivoH: any;
  registrosH: any;
  ciudadesH: any;
  habitacionesH: any;

  parametros: any;

  mostrarGraficas = ""; //Cambiar a 'generales' o 'individuales'

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _newHotelService: NewHotelService,
    private _errorService: ErrorService,
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
    this.tipoUsuario = localStorage.getItem('tipo_usuario');

    if (this.tipoUsuario != "admin") {
      this.logOut();
    }

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
      this.mostrarGraficas = "generales";

      this._dataService.getMotivoGeneral(this.parametros).subscribe(data => { this.motivo = data });
      this._dataService.getRegistrosGeneral(this.parametros).subscribe(data => { this.registros = data });
      this._dataService.getCiudadVisitaGeneral(this.parametros).subscribe(data => { this.ciudades = data });
      this._dataService.getHabitacionesGeneral(this.parametros).subscribe(data => { this.habitaciones = data });
      this._dataService.getCostosHabitacionGeneral().subscribe(data => { this.costos = data });
    }
    
    if (this.tipoGrafica == "1" && this.estrellas != "0") {
      this.parametros = {
        "fechaInicio": this.fechaInicio,
        "fechaFin": this.fechaFin,
        "estrellas": this.estrellas
      }

      let estrellasInt = parseInt(this.estrellas);

      this.mostrarGraficas = "generales";
      this._dataService.getMotivoCategoria(this.parametros).subscribe(data => { this.motivo = data });
      this._dataService.getRegistrosCategoria(this.parametros).subscribe(data => { this.registros = data });
      this._dataService.getCiudadCategoria(this.parametros).subscribe(data => { this.ciudades = data });
      this._dataService.getHabitacionesCategoria(this.parametros).subscribe(data => { this.habitaciones = data });
      this._dataService.getCostosHabitacionCategoria(estrellasInt).subscribe(data => { this.costos = data });
    }
    
    if (this.tipoGrafica == "2" && this.idHotel != "-1") {
      this.parametros = {
        "fechaInicio": this.fechaInicio,
        "fechaFin": this.fechaFin,
        "fk_id_hotel": this.idHotel
      }

      this.mostrarGraficas = "individuales";
      this._dataService.getMotivoHotel(this.parametros).subscribe(data => { this.motivoH = data });
      this._dataService.getRegistrosHotel(this.parametros).subscribe(data => { this.registrosH = data });
      this._dataService.getCiudadHotel(this.parametros).subscribe(data => { this.ciudadesH = data });
      this._dataService.getHabitacionesHotel(this.parametros).subscribe(data => { this.habitacionesH = data });
    }


    return true;
  }

  get motivos() {
    return this.motivo;
  }
  get registross() {
    return this.registros;
  }
  get ciudadess() {
    return this.ciudades;
  }
  get costoss() {
    return this.costos;
  }
  get datosHabitaciones() {
    return this.habitaciones;
  }

  get motivosHotel() {
    return this.motivoH;
  }
  get ciudadesHotel() {
    return this.ciudadesH;
  }
  get registrosHotel() {
    return this.registrosH;
  }
  get habitacionHotel() {
    return this.habitacionesH;
  }

  view: [number, number] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  legendPosition: string = 'below';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  xAxisLabel1: string = 'Hotel';
  yAxisLabel1 = 'Registros';
  
  yAxisLabel2: string = 'Registros';
  xAxisLabel2 = 'Hotel';
  
  yAxisLabel3: string = 'Cantidad por ciudad';
  xAxisLabel3 = 'Hotel';
  
  xAxisLabel4: string = 'Hotel';
  yAxisLabel4 = 'Costo por habitación';
  
  xAxisLabel5: string = 'Hotel';
  yAxisLabel5 = 'Cantidad';

  schemeType: string = 'ordinal';

  //***************************************************************** */
  
  // options
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  showDataLabel: boolean = true;

  //Para gráfica registros
  roundDomains: boolean = false;
  legendTitleR: string = 'Fechas';
  xAxisLabelR = 'Fechas';
  yAxisLabelR: string = 'Registros';

  scaleLogarithmic = { 
    scaleType: 'log',
    
  };
  
  colorScheme = {
    domain: ['#0081A7', '#FED9B7','#00AFB9', '#F7A58F' , '#F07167', '#7FC4B8', '#0098B0'],
  };
  
  //***************************************************************** */
  
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

  imprimir() {
    window.print();
  }

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
