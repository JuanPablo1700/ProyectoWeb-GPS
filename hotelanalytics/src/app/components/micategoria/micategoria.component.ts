import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-micategoria',
  templateUrl: './micategoria.component.html',
  styleUrls: ['./micategoria.component.css']
})
export class MicategoriaComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, private dataService: DataService) { }

  ngOnInit(): void {
    this.filtroConsulta = -1;
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
    console.log('inicio: ' + this.fechaInicio);
    console.log('fin: ' + this.fechaFin);

    this.parametros = {
      "fechaInicio": this.fechaInicio,
      "fechaFin": this.fechaFin,
      "estrellas": localStorage.getItem('estrellas')
    }

    console.log(this.parametros);
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
    console.log("habitacion: "+ this.habitacion);
    return this.habitacion;
  }

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
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
