import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit{
  ciudad:string="";
  motivo:string="";
  dias:number=0;
  habitacion:string="";
  fecha_ingreso:any="";
  fecha_salida:any="";

  constructor(
    private router: Router,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    
  }
}
