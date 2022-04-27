import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { ClienteService } from '../servicios/cliente/cliente.service';
import { SeguroService } from '../servicios/seguro/seguro.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-seguro',
  templateUrl: './seguro.component.html',
  styleUrls: ['./seguro.component.css'],
  
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class SeguroComponent implements OnInit {

  displayDialog:boolean = false;

  editando:boolean = false;
  mostrarFormulario :boolean  = false;


  seguros:any=[]
  seguroNuevo:any = {};
  completo:boolean = true;
  minDate: Date = new Date();
  fecha:Date = new Date();

  clientes: any[] = [];
  fechaMostrar: Date = new Date();

  selectedSeguro:any = {};

  dniCliente:number = -1;

  items: MenuItem[] = [];

  constructor(private servicio:SeguroService,private cliente:ClienteService,
     private messageService:MessageService, private route:ActivatedRoute) { 
    
    // cuando la pagina carga su estructura general
  }

  ngOnInit(): void {

    this.obtenerClientes();
    this.minDate = new Date();

    this.route.params.subscribe((params:any)=>{
      if(params.cliente){
        this.dniCliente = params.cliente;
        this.obtenerSegurosCliente(this.dniCliente);
        this.seguros =this.seguros.filter((value:any)=>value.dniCl == params.cliente);    
        this.items = [
          {
              label: 'Regresar',
              icon: 'fa-solid fa-address-card',
              command:(event)=>{
                location.href = "/cliente";            
              }
          },
          {
              label: 'Salir',
              icon: 'fa-solid fa-arrow-right-from-bracket',
              command:(event)=>{
                location.href = "/seguro";
              }
          }
        ];
      }else{
        this.obtenerSeguros();
        this.items = [
          {
              label:'Editar',
              icon:'pi pi-fw pi-file',
              command:(e)=>{
                this.activarEdicion(this.selectedSeguro);
                this.displayDialog = false;
              }
          },
          {
              label:'Eliminar',
              icon:'pi pi-trash',
              
              command:(e)=>{
                this.eliminarSeguro(this.selectedSeguro.numeroPoliza);            
                this.displayDialog = false;                
                this.messageService.add({severity:'info', summary: 'Seguro', detail: 'Seguro eliminado'});
              }
          },
          {
              label:'Quit',
              icon:'pi pi-times',
              command:(event)=>{
                this.displayDialog = !this.displayDialog;
              }
          }
        ];
      }
    });

    

  }


  /** OBTENCION DE DATA */
  obtenerSeguros(){
    this.servicio.buscarSeguros().subscribe(
      (res:any)=>{        
        this.seguros = res;
        if(this.dniCliente != -1){
          
        this.seguros =this.seguros.filter((value:any)=>value.dniCl == this.dniCliente);  
        }
      }
    )
  }

  /** OBTENCION DE DATA por CLIENTE*/
  obtenerSegurosCliente(dniCl :number){
    this.servicio.buscarSegurosCliente(dniCl).subscribe(
      (res:any)=>{        
        this.seguros = res;
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
        if( this.dniCliente > -1){            
          this.seguroNuevo.dniCl =this.clientes.find(e=> e.dniCl == this.dniCliente)
        }
      }
    )
  }


  /* GUARDANDO NUEVO SEGURO*/
  
  enviarFormulario(){
    
    let formulario: any = document.getElementById("crearSeguro");

    if(formulario.reportValidity()){
      this.completo = false;
      console.log(this.seguroNuevo)
      this.seguroNuevo.dniCl = this.seguroNuevo.cliente.dniCl; 
      // this.seguroNuevo.fechaInicio = this.seguroNuevo.fechaInicio.toISOString().split('T')[0];
      // this.seguroNuevo.fechaVencimiento = this.seguroNuevo.fechaVencimiento.toISOString().split('T')[0];


      console.log(this.seguroNuevo)

      this.servicio.agregarSeguro(this.seguroNuevo).subscribe((res:any)=>{
        this.messageService.add({severity:'info', summary: 'Seguro', detail: 'Seguro registrado'});

        this.obtenerSeguros();
        this.editando = false;        
        setTimeout(() => {          
          this.completo = true;
          this.seguroNuevo = {};
        }, 1000);
      })

    }
  }

  /* ACTIVAR / DESACTIVAR FORMULARIO */
  activarForm(){
    if ( document.querySelector(".padre")?.classList.contains("activo")) {
      document.querySelector(".padre")?.classList.remove("activo")
    }
    else document.querySelector(".padre")?.classList.add("activo")
  }

  /* ELIMINAR UN SEGURO*/
  eliminarSeguro(id:number){
    console.log(id)
    this.servicio.eliminarSeguro(id).subscribe((res:any)=>{
      console.log(res)
      this.obtenerSeguros();
    });
  }

  /* EDITANDO UN SEGURO */
  activarEdicion(seguro:any){
    console.log(seguro)
    this.seguroNuevo = seguro;

    // const [anio, mes, dia] = seguro.fechaInicio.split("-");
    // const [anio2, mes2, dia2] = seguro.fechaVencimiento.split("-");
    // this.seguroNuevo.fechaInicio = new Date(+anio, mes -1, +dia);
    // this.seguroNuevo.fechaVencimiento = new Date(+anio2, mes2 -1, +dia2)
    this.seguroNuevo.fechaInicio = seguro.fechaInicio
    this.seguroNuevo.fechaVencimiento = seguro.fechaVencimiento
    this.seguroNuevo.cliente =this.clientes.find(e=> e.dniCl == seguro.dniCl)    
  }


  /* METODOS DE TABLA*/
  onRowSelect(a:any) {
    console.log(a)
    this.selectedSeguro = a.data;
    this.cambiarVisible();
  }

  onRowUnselect(a:any) {
  }


  /**FILTRO */

  filtrar(event:any){
    if(event.value==null)return;
    this.seguros =this.seguros.filter((value:any)=>value.dniCl == event.value);
  }


  // Dialog 

  cambiarVisible(){
    this.displayDialog = !this.displayDialog;
  }

}
