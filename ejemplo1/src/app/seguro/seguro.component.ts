import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../servicios/cliente/cliente.service';
import { SeguroService } from '../servicios/seguro/seguro.service';

@Component({
  selector: 'app-seguro',
  templateUrl: './seguro.component.html',
  styleUrls: ['./seguro.component.css']
})
export class SeguroComponent implements OnInit {

  seguros:any=[]
  seguroNuevo:any = {};
  completo:boolean = true;
  minDate: Date = new Date();
  fecha:Date = new Date();

  clientes: any[] = [];

  selectedCity: any;

  constructor(private servicio:SeguroService,private cliente:ClienteService) { 
    
    // cuando la pagina carga su estructura general
    
  }

  ngOnInit(): void {
    this.obtenerSeguros();
    this.obtenerClientes();
    this.minDate = new Date();
  }


  obtenerSeguros(){
    this.servicio.buscarSeguros().subscribe(
      (res:any)=>{
        this.mostrarSeguros(res)
      }
    )
  }

  obtenerClientes(){
    this.cliente.buscarClientes().subscribe(
      (res:any)=>{
        
        res.forEach((element:any) => {
          element.valor = element.dniCl + "  "+  element.nombreCl
        });

        this.clientes = res;
      }
    )
  }

  mostrarSeguros(seguros:any){
    this.seguros = seguros;
    console.log(this.seguros)
  }

  enviarFormulario(){
    let formulario: any = document.getElementById("crearSeguro");
    if(formulario.reportValidity()){
      this.completo = false;

      this.seguroNuevo.dniCl = this.seguroNuevo.dniCl.dniCl;

      this.seguroNuevo.fechaInicio = this.seguroNuevo.fechaInicio.toISOString().split('T')[0];
      this.seguroNuevo.fechaVencimiento = this.seguroNuevo.fechaVencimiento.toISOString().split('T')[0];

      console.log(this.seguroNuevo)

      this.servicio.agregarSeguro(this.seguroNuevo).subscribe((res:any)=>{
        console.log(res);
        this.seguros.push(res);
        setTimeout(() => {          
          this.completo = true;
          this.seguroNuevo = {};
        }, 1000);
      })

    }
  }

}
