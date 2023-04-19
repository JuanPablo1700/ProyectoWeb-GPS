import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principaldirector',
  templateUrl: './principaldirector.component.html',
  styleUrls: ['./principaldirector.component.css']
})
export class PrincipaldirectorComponent {
  constructor(
    private router: Router
  ) {}


  nuevo(){
    this.router.navigate(['/nuevohotel']);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tipo_usuario');
    this.router.navigate(['/login'])
  }
}
