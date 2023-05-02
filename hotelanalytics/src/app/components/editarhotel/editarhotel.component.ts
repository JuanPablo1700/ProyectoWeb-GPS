import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Hotel } from 'src/app/interfaces/hotel';
import { ErrorService } from 'src/app/services/error.service';
import { NewHotelService } from 'src/app/services/new-hotel.service';

@Component({
  selector: 'app-editarhotel',
  templateUrl: './editarhotel.component.html',
  styleUrls: ['./editarhotel.component.css']
})
export class EditarhotelComponent implements OnInit {

  hotel: Hotel = {
    id: 0,
    nombre: '',
    direccion: '',
    correo: '',
    telefono: '',
    estrellas: 0,
    estado: '',
    activo: 0
  };

  id: any;
  nombre: string;
  direccion: string;
  correo: string;
  telefono: string;
  estrellas: number;
  estado: string;
  activo: number;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _newHotelService: NewHotelService,
    private _errorService: ErrorService,
    private route: ActivatedRoute
  ) {
    this.nombre = '';
    this.direccion = '';
    this.correo = '';
    this.telefono = '';
    this.estrellas = 0;
    this.estado = '';
    this.activo = 0;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    const idInt = parseInt(this.id);
    this.getHotel(idInt);
  }

  getHotel(id: number) {
    this._newHotelService.getHotel(id).subscribe({
      next: (data: any) => {
        this.hotel = data;
        this.nombre = this.hotel.nombre;
        this.direccion = this.hotel.direccion;
        this.correo = this.hotel.correo;
        this.telefono = this.hotel.telefono;
        this.estrellas = this.hotel.estrellas;
        this.estado = this.hotel.activo+'';
        this.activo = this.hotel.activo;
      },
      error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    })
  }

  validar() {
    //falta validar selects y que sean teléfonos y correos válidos

    this.nombre = this.nombre.trim();
    this.direccion = this.direccion.trim();
    this.correo = this.correo.trim();
    this.telefono = this.telefono.trim();

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
    if (!telefonoRegex.test(this.telefono)) {
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
    if (this.estado == '-1') {
      this.toastr.error('Campo estado obligatorio', 'Error')
      return false;
    }
    return true;
  }

  async actualizar() {
    if (this.validar()) {
      const hotel: Hotel = {
        id: this.id,
        nombre: this.nombre,
        direccion: this.direccion,
        correo: this.correo,
        telefono: this.telefono,
        estrellas: this.estrellas,
        activo: this.activo,
        estado: this.estado
      }

      await this._newHotelService.updateHotel(this.id, hotel).subscribe({
        next: () => {
          this.toastr.success('Hotel actualizado correctamente', 'Correcto');
        },
        error: (error: HttpErrorResponse) => {
          this._errorService.msjError(error);
        }
      })
      this.router.navigate(['/principaldirector']);
    }
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

