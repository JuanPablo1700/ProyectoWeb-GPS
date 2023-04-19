import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarioscreados',
  templateUrl: './usuarioscreados.component.html',
  styleUrls: ['./usuarioscreados.component.css']
})
export class UsuarioscreadosComponent {

  constructor(
    private router: Router
  ) {

  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tipo_usuario');
    this.router.navigate(['/login'])
  }

}
