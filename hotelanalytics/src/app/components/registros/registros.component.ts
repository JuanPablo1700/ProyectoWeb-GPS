import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Motivo } from 'src/app/interfaces/motivo';
import { Registro } from 'src/app/interfaces/registro';
import { TipoHabitacion } from 'src/app/interfaces/tipoHabitacion';
import { ErrorService } from 'src/app/services/error.service';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit{
  ciudad:string="";
  motivo:string="";
  habitacion:string="";
  fecha_ingreso:any="";
  fecha_salida:any="";

  id_hotel:any;

  tipoHabitacion: TipoHabitacion[] = [];
  motivos: Motivo[] = [];
  registros: Registro[] = [];

  newRegistro: Registro;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private _registroService: RegistroService
  ){
    this.newRegistro = {
      fecha_ingreso: "",
      fecha_salida: "",
      ciudad_huesped: "",
      costo_estancia: 0,
      fk_id_habitacion_hotel: 0,
      fk_id_usuario: 0,
      fk_id_motivo: "",
      fk_id_hotel: 0,
      fk_id_tipoHabitacion: ""
    }
  }

  ngOnInit() {
    this.habitacion = "-1";
    this.motivo = "-1";
    this.id_hotel = localStorage.getItem('fk_id_hotel');
    this.getHabitaciones(this.id_hotel);
    this.getMotivos();
    this.getRegistros();
  }

  getHabitaciones(id_hotel:number) {
    this._registroService.getHabitacionesHotel(id_hotel).subscribe({
      next: (data) => {
        this.tipoHabitacion = data;
      },
      error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    })
  }

  getMotivos() {
    this._registroService.getMotivos().subscribe({
      next: (data) => {
        this.motivos = data;
      },
      error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    })
  }

  getRegistros() {
    this._registroService.getRegistros().subscribe({
      next: (data) => {
        this.registros = data;
      },
      error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    })
  }

  nuevoRegistro() {
    this.newRegistro.fecha_ingreso = this.fecha_ingreso;
    this.newRegistro.fecha_salida = this.fecha_salida;
    this.newRegistro.ciudad_huesped = this.ciudad;
    this.newRegistro.fk_id_usuario = localStorage.getItem('id_usuario');
    this.newRegistro.fk_id_hotel = localStorage.getItem('fk_id_hotel');
    this.newRegistro.fk_id_tipoHabitacion = this.habitacion;
    this.newRegistro.fk_id_motivo = this.motivo;
    
    return this._registroService.nuevo(this.newRegistro).subscribe({
      next:() => {
        this.fecha_ingreso = "";
        this.fecha_salida = "";
        this.ciudad = "";
        this.habitacion = "-1";
        this.motivo = "-1";
        this.router.navigate(['/registros']);
        this.toastr.success('Hotel registrado correctamente', 'Correcto');
      },
      error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    })
  }

  actualizar(id: any) {
    this.router.navigate(['/editarregistros', id]);
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
