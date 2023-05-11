import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Hotel } from 'src/app/interfaces/hotel';
import { DataService } from 'src/app/services/data.service';
import { NewHotelService } from 'src/app/services/new-hotel.service';

@Component({
  selector: 'app-micategoria',
  templateUrl: './micategoria.component.html',
  styleUrls: ['./micategoria.component.css']
})
export class MicategoriaComponent implements OnInit {

  tipoUsuario:any;
  idHotel:any;
  datosHotel:any;

  constructor(
    private router: Router, 
    private toastr: ToastrService, 
    private dataService: DataService,
    private _hotelService: NewHotelService
  ) { }

  ngOnInit(): void {
    this.tipoUsuario = localStorage.getItem('tipo_usuario');
    this.idHotel = localStorage.getItem('fk_id_hotel');
    const idHotelInt = parseInt(this.idHotel);
    if (this.tipoUsuario != "gerente") {
      this.logOut();
    }

    this.getHotel(idHotelInt);
  }

  filtroConsulta: number = 0;
  fechaInicio: any = "";
  fechaFin: any = "";

  graficasVisibles = 0;

  motivo: any;
  ciudades: any;
  registros:any;
  habitacion:any;
  parametros: any;

  isPressed = false;
  
  getHotel(idHotel: number) {
    this._hotelService.getHotel(idHotel).subscribe({
      next: (data)=>{
        if (data.dias_transcurridos == null || data.dias_transcurridos > 14) {
          this.filtroConsulta = -2;
        } else {
          this.filtroConsulta = -1;
        }
      },
      error: (error) => {
        this.toastr.error("Error al obtener datos del hotel", error)
      }
    })
  }

  consultar() {
    const hoy = new Date();

    if (this.filtroConsulta == -1) {
      this.graficasVisibles = 0;
      return this.toastr.error('Seleccione un tipo de gráfica', 'Error');
    }
    if (this.filtroConsulta == 1) { //Este día
      this.fechaInicio = hoy;
      this.fechaFin = hoy;
    }
    if (this.filtroConsulta == 2) { //Esta semana
      this.fechaInicio = new Date(hoy.setDate(hoy.getDate() - hoy.getDay())); //inicio de la semana actual empezando por domingo
      this.fechaFin = hoy; //NOTA: mandar el último día de la semana
      this.fechaFin.setDate(this.fechaFin.getDate() + (6 - this.fechaFin.getDay()));
      this.fechaFin = hoy;
    }
    if (this.filtroConsulta == 3) { //Este mes
      this.fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1); //inicio de mes actual
      this.fechaFin = new Date(this.fechaInicio.getFullYear(), this.fechaInicio.getMonth() + 1, 0);
    }
    if (this.filtroConsulta == 4) { //Personalizado
      if (this.fechaInicio == "" || this.fechaFin == "") {
        this.graficasVisibles = 0;
        return this.toastr.error('Seleccione fecha inicio y fecha fin correctamente', 'Error');
      }
      if (this.fechaInicio > this.fechaFin) {
        this.graficasVisibles = 0;
        return this.toastr.error('Seleccione fecha inicio y fecha fin correctamente', 'Error');
      }
    }
    this.isPressed = true;
    console.log('inicio: ' + this.fechaInicio);
    console.log('fin: ' + this.fechaFin);

    this.parametros = {
      "fechaInicio": this.fechaInicio,
      "fechaFin": this.fechaFin,
      "estrellas": localStorage.getItem('estrellas')
    }

    this.graficasVisibles = 1;

    this.dataService.getMotivoCategoria(this.parametros).subscribe(data => {
      this.motivo = data;
    })
    this.dataService.getCiudadCategoria(this.parametros).subscribe(data => {
      this.ciudades = data;
    })
    this.dataService.getRegistrosCategoria(this.parametros).subscribe(data => {
      this.registros = data;
    })
    this.dataService.getHabitacionesCategoria(this.parametros).subscribe(data => {
      this.habitacion = data;
    })

    return true;
  }

  //Gráficas
  // motivo: any;
  view: [number, number] = [750, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  legendPosition: string = 'below';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  
  xAxisLabelMotivo = 'Cantidad';
  yAxisLabelMotivo: string = 'Hotel';
  
  xAxisLabel2 = 'Hotel';
  yAxisLabel2: string = 'Registros';

  schemeType: string = 'ordinal';

  get multi() {
    return this.motivo;
  }
  get multi2() {
    return this.registros;
  }
  get multi3() {
    return this.ciudades;
  }
  get habitacions() {
    return this.habitacion;
  }

  colorScheme = {
    //domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    domain: ['#0081A7', '#FED9B7','#00AFB9', '#F7A58F' , '#F07167', '#7FC4B8', '#0098B0'],
  };

  onSelect(data: any): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  //finGráficas

  principal() {
    this.router.navigate(['/graficasmihotel']);
  }
  habitaciones() {
    this.router.navigate(['/datoshotel']);
  }
  micategoria() {
    this.router.navigate(['/micategoria']);
  }

  imprimir() {
    window.print();
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('fk_id_hotel');
    localStorage.removeItem('estrellas');
    localStorage.removeItem('tipo_usuario');
    localStorage.removeItem('id_usuario');
    this.router.navigate(['/login']);
  }
}
