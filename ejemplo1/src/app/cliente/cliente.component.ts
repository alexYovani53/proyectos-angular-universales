import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../servicios/cliente/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes:any=[];

  paginadorCliente: any = {};

  usuarioNuevo:any = {};
  completo:boolean = true;
  editando:boolean = false;

  first  = 0;
  rows  = 4;

  constructor(private servicio:ClienteService) { 
    
    // cuando la pagina carga su estructura general

    
  }

  ngOnInit(): void {
    this.obtenerClientes();
    this.obtenerClientesPaginador();
  }


  obtenerClientes(){
    this.servicio.buscarClientes().subscribe(
      (res:any)=>{        
        this.clientes = res;
      }
    )
  }

  obtenerClientesPaginador(){
    console.log(this.first +"---> "+ this.rows)
    this.servicio.buscarClientesPaginador(this.first, this.rows).subscribe(
      (res:any)=>{
        this.paginadorCliente = res;
        console.log(this.paginadorCliente)
      }
    )
  }

  enviarFormulario(){
    let formulario: any = document.getElementById("crearUsuario");
    if(formulario.reportValidity()){

      if( this.editando){
        this.usuarioNuevo = {};
        this.editando = false;
        return;
      }

      this.completo = false;
      this.servicio.guardarUsuario(this.usuarioNuevo).subscribe((res:any)=>{

        this.obtenerClientesPaginador();
        this.obtenerClientes();

        setTimeout(() => {          
          this.completo = true;
          this.usuarioNuevo = {};
        }, 1000);
      })

    }
  }


  next() {
    if( this.paginadorCliente.last) return ;
    this.first = this.first + 1;
    this.obtenerClientesPaginador();
  }

  prev() {
    if( this.paginadorCliente.first) return;
    this.first = this.first - 1;
    this.obtenerClientesPaginador();
  }

  reset() {
      this.first = 0;
      this.obtenerClientesPaginador();
  }

  isLastPage(): boolean {
      return this.paginadorCliente.last;
  }

  isFirstPage(): boolean {
      return this.paginadorCliente.first;
  }


  onPageChange(evento:any){
    console.log(evento)
    this.first = evento.page;
    this.obtenerClientesPaginador();
  }


  editar(e:any){
    console.log(e)
    this.editando = true;
    this.usuarioNuevo = e;
  }

}
