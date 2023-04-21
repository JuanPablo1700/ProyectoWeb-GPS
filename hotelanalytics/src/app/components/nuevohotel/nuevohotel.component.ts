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

  nombre: string = '';
  direccion: string = '';
  correo: string = '';
  telefono: string = '';
  estrellas: number = 0;
  estado: string = '';

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
    if (this.nombre.trim() == '') {
      this.toastr.error('Campo nombre obligatorio', 'Error')
      return
    }
    if (this.direccion.trim() == '') {
      this.toastr.error('Campo direccion obligatorio', 'Error')
      return
    }
    if (this.correo.trim() == '') {
      this.toastr.error('Campo correo obligatorio', 'Error')
      return
    }
    if (this.telefono.trim() == '') {
      this.toastr.error('Campo teléfono obligatorio', 'Error')
      return
    }
    if (this.estrellas == -1) {
      this.toastr.error('Campo estrellas obligatorio', 'Error')
      return
    }
    if (this.estado.trim() == '') {
      this.toastr.error('Campo estado obligatorio', 'Error')
      return
    }
    return true;
  }

  insertar() {

    this.validar();

    const hotel: Hotel = {
      nombre: this.nombre,
      direccion: this.direccion,
      correo: this.correo,
      telefono: this.telefono,
      estrellas: this.estrellas,
      estado: this.estado
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
