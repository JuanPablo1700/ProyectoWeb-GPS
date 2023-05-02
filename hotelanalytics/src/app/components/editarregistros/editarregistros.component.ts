import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editarregistros',
  templateUrl: './editarregistros.component.html',
  styleUrls: ['./editarregistros.component.css']
})
export class EditarregistrosComponent {

  constructor(
    private router: Router
  ) {

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
