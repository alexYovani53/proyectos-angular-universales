
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PeritoService } from '../servicios/perito/perito.service';
import { SeguroService } from '../servicios/seguro/seguro.service';
import { SiniestroService } from '../servicios/siniestro/siniestro.service';
import { FormularioSiniestroComponent } from './formulario-siniestro/formulario-siniestro.component';

@Component({
  selector: 'app-siniestro',
  templateUrl: './siniestro.component.html',
  styleUrls: ['./siniestro.component.css'],
  providers: [MessageService,DialogService],
  encapsulation: ViewEncapsulation.None

})
export class SiniestroComponent implements OnInit {

  displayDialog : boolean = false;
  editando:boolean = false;
  mostrarFormulario :boolean  = false;
  
  paginadorSiniestros: any = {};

  completo:boolean = true;
  minDate: Date = new Date();
  fecha:Date = new Date();

  fechaMostrar: Date = new Date();


  items: MenuItem[] = [];

  selectedSiniestro: any = {};

  first  = 0;
  rows  = 4;
 

  ref: any = null;


  constructor(
    private servicio:SiniestroService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private route: ActivatedRoute) { 
    
    // cuando la pagina carga su estructura general
  }

  ngOnInit(): void {

    this.buscarSiniestrosPaginador();
    this.minDate = new Date();
    this.route.params.subscribe((params:any)=>{
      if(params.cliente){  
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
        this.buscarSiniestrosPaginador();
        this.items = [
          {
              label:'Editar',
              icon:'pi pi-fw pi-file',
              command:(e)=>{
                this.activarEdicion(this.selectedSiniestro);
                this.displayDialog = false;
              }
          },
          {
              label:'Eliminar',
              icon:'pi pi-trash',
              
              command:(e)=>{
                this.eliminarSiniestro(this.selectedSiniestro.idSiniestro);            
                this.displayDialog = false;                
                this.messageService.add({severity:'info', summary: 'Seguro', detail: 'Siniestro eliminado'});
              }
          },
          {
              label:'Ver Seguros',
              icon:'pi pi-fw pi-user'
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

  show() {
    this.ref = this.dialogService.open(FormularioSiniestroComponent, {
        data:{
          id:'dddddddddddddddd'
        },
        header: 'Crear nuevo siniestro',
        width: '70%'
    });

    
    this.ref.onClose.subscribe((e:any) =>{
      if(e==1){
        this.messageService.add({severity:'info', summary: 'Siniestro', detail: 'Siniestro registrado'});  
        this.buscarSiniestrosPaginador();
      }
      
    });
}


  
  buscarSiniestrosPaginador(){
    console.log(this.first +"---> "+ this.rows)
    this.servicio.buscarSiniestrosPaginador(this.first, this.rows).subscribe(
      (res:any)=>{
        this.paginadorSiniestros = res;
        console.log(this.paginadorSiniestros)
      }
    )
  }


  /* ACTIVAR / DESACTIVAR FORMULARIO */
  activarForm(){
    if ( document.querySelector(".padre")?.classList.contains("activo")) {
      document.querySelector(".padre")?.classList.remove("activo")
    }
    else document.querySelector(".padre")?.classList.add("activo")
  }

  /* ELIMINAR UN SEGURO*/
  eliminarSiniestro(id:number){
    this.servicio.eliminarSiniestro(id).subscribe((res:any)=>{
      this.buscarSiniestrosPaginador();
    });
  }

  /* EDITANDO UN SEGURO */
  activarEdicion(siniestro:any){
    const ref = this.dialogService.open(FormularioSiniestroComponent, {
        data:{
          siniestro:siniestro
        },
        header: 'Administrar siniestro',
        width: '70%'
    });
   
    ref.onClose.subscribe(e=>{

      
      if(e==1){
        this.messageService.add({severity:'info', summary: 'Siniestro', detail: 'Siniestro actualizado'});  
        this.buscarSiniestrosPaginador();
      }
    })
    
  }



  /* METODOS DE TABLA*/
  onRowSelect(a:any) {
    console.log(a)
    this.selectedSiniestro = a.data;
    this.cambiarVisible();
  }

  onRowUnselect(a:any) {    
    console.log(a)
  }


  /* PAGINADOR*/
  
  next() {
    if( this.paginadorSiniestros.last) return ;
    this.first = this.first + 1;
    this.buscarSiniestrosPaginador();
  }

  prev() {
    if( this.paginadorSiniestros.first) return;
    this.first = this.first - 1;
    this.buscarSiniestrosPaginador();
  }

  reset() {
      this.first = 0;
      this.buscarSiniestrosPaginador();
  }

  isLastPage(): boolean {
      return this.paginadorSiniestros.last;
  }

  isFirstPage(): boolean {
      return this.paginadorSiniestros.first;
  }


  onPageChange(evento:any){
    this.first = evento.page;
    this.buscarSiniestrosPaginador();
  }

  /**FILTRO */

  filtrar(event:any){
    if(event.value==null)return;
    this.paginadorSiniestros.content =this.paginadorSiniestros.content.filter((value:any)=>value.dniCl == event.value);
  }

  //Dialog
  cambiarVisible(){
    this.displayDialog = !this.displayDialog;
  }



}
