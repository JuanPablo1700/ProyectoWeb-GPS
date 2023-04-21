import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Hotel } from './../../interfaces/hotel';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NewHotelService } from 'src/app/services/new-hotel.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-nuevohotel',
  templateUrl: './nuevohotel.component.html',
  styleUrls: ['./nuevohotel.component.css']
})
export class NuevohotelComponent implements OnInit {
  listHotel: Hotel[] = [];

  id:number=0;
  nombre: string = '';
  direccion: string = '';
  correo: string = '';
  telefono: string = '';
  estrellas: number = 0;
  estado: string = '';
  activo:number = 0;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _newHotelService: NewHotelService,
    private _errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.getHotels();
  }

  private validar() {
    //falta validar selects y que sean teléfonos y correos válidos

    this.nombre= this.nombre.trim() ;
    this.direccion= this.direccion.trim() ;
    this.correo= this.correo.trim() ;
    this.telefono= this.telefono.trim() ;

    const telefonoRegex = /^(\+?\d{1,2}\s)?(\d{10,13})$/;
    const correoRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


    if (this.nombre == '') {
      this.toastr.error('Campo nombre obligatorio', 'Error')
      return false;
    }
    if (this.direccion == '') {
      this.toastr.error('Campo direccion obligatorio', 'Error')
      return false;
    }
    if (this.telefono == '') {
      this.toastr.error('Campo teléfono obligatorio', 'Error')
      return false;
    }
    if(!telefonoRegex.test(this.telefono)){
      this.toastr.error('Teléfono inválido', 'Error')
      return false;
    }
    if (this.correo == '') {
      this.toastr.error('Campo correo obligatorio', 'Error')
      return false;
    }
    if (!correoRegex.test(this.correo)) {
      this.toastr.error('Correo inválido', 'Error')
      return false;
    }
    if (this.estrellas == -1) {
      this.toastr.error('Campo estrellas obligatorio', 'Error')
      return false;
    }
    if (this.estado.trim() == '') {
      this.toastr.error('Campo estado obligatorio', 'Error')
      return
    }
    return true;
  }

  insertar() {
    if(this.validar()){
      const hotel: Hotel = {
        id: this.id,
        nombre: this.nombre,
        direccion: this.direccion,
        correo: this.correo,
        telefono: this.telefono,
        estrellas: this.estrellas,
        estado: this.estado,
        activo: this.activo
      }
  
      this._newHotelService.newHotel(hotel).subscribe({
        next: (whatsappUrl) => {
          window.open(whatsappUrl);
          this.toastr.success('Hotel registrado correctamente', 'Correcto');
        },
        error: (error: HttpErrorResponse) => {
          this._errorService.msjError(error);
        }
      })
      this.router.navigate(['/principaldirector']);
    }
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

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tipo_usuario');
    this.router.navigate(['/login'])
  }
}
