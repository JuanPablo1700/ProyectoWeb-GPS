import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-graficasmihotel',
  templateUrl: './graficasmihotel.component.html',
  styleUrls: ['./graficasmihotel.component.css'],
})
export class GraficasmihotelComponent implements OnInit {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.filtroConsulta = -1;
  }

  filtroConsulta: number = 0;
  fechaInicio: any = '';
  fechaFin: any = '';

  graficasVisibles = 0;

  motivo: any;
  ciudad: any;
  registro: any;
  parametros: any;

  //Gráficas
  // motivo: any;
  view: [number, number] = [750, 400];

  get motivos() {
    return this.motivo;
  }
  get ciudades() {
    return this.ciudad;
  }
  get registros() {
    return this.registro;
  }

  consultar() {
    const hoy = new Date();

    if (this.filtroConsulta == -1) {
      this.graficasVisibles = 0;
      return this.toastr.error('Seleccione un tipo de gráfica', 'Error');
    }
    if (this.filtroConsulta == 1) {
      //Este día
      this.fechaInicio = hoy;
      this.fechaFin = hoy;
    }
    if (this.filtroConsulta == 2) {
      //Esta semana
      this.fechaInicio = new Date(hoy.setDate(hoy.getDate() - hoy.getDay())); //inicio de la semana actual empezando por domingo
      this.fechaFin = hoy; //NOTA: mandar el último día de la semana
      this.fechaFin.setDate(
        this.fechaFin.getDate() + (6 - this.fechaFin.getDay())
      );
      console.log(this.fechaFin);
    }
    if (this.filtroConsulta == 3) {
      //Este mes
      this.fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1); //inicio de mes actual
      this.fechaFin = new Date(
        this.fechaInicio.getFullYear(),
        this.fechaInicio.getMonth() + 1,
        0
      );
    }
    if (this.filtroConsulta == 4) {
      //Personalizado
      if (this.fechaInicio == '' || this.fechaFin == '') {
        this.graficasVisibles = 0;
        return this.toastr.error(
          'Seleccione fecha inicio y fecha fin correctamente',
          'Error'
        );
      }
      if (this.fechaInicio > this.fechaFin) {
        this.graficasVisibles = 0;
        return this.toastr.error(
          'Seleccione fecha inicio y fecha fin correctamente',
          'Error'
        );
      }
    }
    console.log('inicio: ' + this.fechaInicio);
    console.log('fin: ' + this.fechaFin);

    this.parametros = {
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      fk_id_hotel: localStorage.getItem('fk_id_hotel'),
    };

    this.graficasVisibles = 1;

    this.ciudad = this.dataService.getCiudadHotel(this.parametros).subscribe(data => {
      this.ciudad = data;
      });
    this.dataService.getMotivoHotel(this.parametros).subscribe((data) => {
      this.motivo = data;
    });
    this.dataService.getRegistrosHotel(this.parametros).subscribe((data) => {
      this.registro = data;
    });
    return true;
  }

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  showDataLabel:boolean=true;

    //Para gráfica registros
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    legendPosition: string = 'below';
    showXAxisLabel: boolean = true;
    showYAxisLabel: boolean = true;
    schemeType: string = 'ordinal';
    roundDomains: boolean = false;
    legendTitleR:string='Fechas';
    xAxisLabelR = 'Fechas';
    yAxisLabelR: string = 'Registros';
    

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
