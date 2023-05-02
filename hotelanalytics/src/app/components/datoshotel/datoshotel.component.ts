import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datoshotel',
  templateUrl: './datoshotel.component.html',
  styleUrls: ['./datoshotel.component.css']
})
export class DatoshotelComponent {
  constructor(private router: Router){}

  nuevoTipoHabitacion= "";
  tipoHabitacion="";
  costo=0;
  cantidad=0;
  
  principal() {
    this.router.navigate(['/graficasmihotel']);
  }
  habitaciones(){
    this.router.navigate(['/datoshotel']);
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tipo_usuario');
    this.router.navigate(['/login']);
  }
}
