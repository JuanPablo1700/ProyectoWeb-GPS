import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Hotel } from './../../interfaces/hotel';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevohotel',
  templateUrl: './nuevohotel.component.html',
  styleUrls: ['./nuevohotel.component.css']
})
export class NuevohotelComponent implements OnInit {

  nombre: string = '';
  direccion: string = '';
  correo: string = '';
  telefono: string = '';
  estrellas: number = 0;
  estado: string = '';

  constructor(
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {

  }

  private validar() {
    //falta validar selects y que sean teléfonos y correos válidos
    if (this.nombre.trim() == '') {
      this.toast.error('Campo nombre obligatorio', 'Error')
      return
    }
    if (this.direccion.trim() == '') {
      this.toast.error('Campo direccion obligatorio', 'Error')
      return
    }
    if (this.correo.trim() == '') {
      this.toast.error('Campo correo obligatorio', 'Error')
      return
    }
    if (this.telefono.trim() == '') {
      this.toast.error('Campo teléfono obligatorio', 'Error')
      return
    }
    if (this.estrellas == -1) {
      this.toast.error('Campo estrellas obligatorio', 'Error')
      return
    }
    if (this.estado.trim() == '') {
      this.toast.error('Campo estado obligatorio', 'Error')
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
  }
}
