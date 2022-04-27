import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PeritoService } from '../servicios/perito/perito.service';
import { FormularioPeritoComponent } from './formulario-perito/formulario-perito.component';

@Component({
  selector: 'app-perito',
  templateUrl: './perito.component.html',
  styleUrls: ['./perito.component.css'],
  
  providers: [MessageService,DialogService],
  encapsulation: ViewEncapsulation.None
})
export class PeritoComponent implements OnInit {

  displayDialog:boolean = false;
  editando:boolean = false;
  mostrarFormulario :boolean  = false;


  
  paginadorPeritos: any = {};

  completo:boolean = true;
  minDate: Date = new Date();
  fecha:Date = new Date();

  fechaMostrar: Date = new Date();


  items: MenuItem[] = [];

  selectedPerito: any = {}

  first  = 0;
  rows  = 4;


  constructor(private servicio:PeritoService,
     public dialogService: DialogService, 
     private route: ActivatedRoute,
     private messageService:MessageService) { 
    
    // cuando la pagina carga su estructura general
  }

  ngOnInit(): void {

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
        this.buscarPeritosPaginador();
        this.items = [
          {
              label:'Editar',
              icon:'pi pi-fw pi-file',
              command:(e)=>{
                this.activarEdicion(this.selectedPerito);
                this.displayDialog = false;
              }
          },
          {
              label:'Eliminar',
              icon:'pi pi-trash',
              
              command:(e)=>{
                this.eliminarPerito(this.selectedPerito.dniPerito);            
                this.displayDialog = false;                
                this.messageService.add({severity:'info', summary: 'Seguro', detail: 'Seguro eliminado'});
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
    const ref = this.dialogService.open(FormularioPeritoComponent, {
        data:{
          id:'dddddddddddddddd'
        },
        header: 'Crear nuevo Perito',
        width: '70%'
    });

    
    ref.onClose.subscribe((e:any) =>{
      this.buscarPeritosPaginador();
      this.messageService.add({severity:'info', summary: 'Peritos', detail: "Se registro con exito"});  
    });
}


  
buscarPeritosPaginador(){
    console.log(this.first +"---> "+ this.rows)
    this.servicio.buscarPeritosPaginador(this.first, this.rows).subscribe(
      (res:any)=>{
        this.paginadorPeritos = res;
        console.log(this.paginadorPeritos)
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
  eliminarPerito(id:number){
    this.servicio.eliminarPerito(id).subscribe((res:any)=>{
      this.buscarPeritosPaginador();
      
      this.messageService.add({severity:'info', summary: 'Peritos', detail: `Se elimino el perito con dni ${id}`});  
    });
  }

  /* EDITANDO UN SEGURO */
  activarEdicion(perito:any){
    const ref = this.dialogService.open(FormularioPeritoComponent, {
        data:{
          perito:perito
        },
        header: 'Administrar perito',
        width: '70%'
    });
    
  }


  /* METODOS DE TABLA*/
  onRowSelect(a:any) {
    console.log(a)
    this.selectedPerito = a.data;
    this.cambiarVisible();
  }

  onRowUnselect(a:any) {    
    console.log(a)
  }


  /* PAGINADOR*/
  
  next() {
    if( this.paginadorPeritos.last) return ;
    this.first = this.first + 1;
    this.buscarPeritosPaginador();
  }

  prev() {
    if( this.paginadorPeritos.first) return;
    this.first = this.first - 1;
    this.buscarPeritosPaginador();
  }

  reset() {
      this.first = 0;
      this.buscarPeritosPaginador();
  }

  isLastPage(): boolean {
      return this.paginadorPeritos.last;
  }

  isFirstPage(): boolean {
      return this.paginadorPeritos.first;
  }


  onPageChange(evento:any){
    this.first = evento.page;
    this.buscarPeritosPaginador();
  }

  /**FILTRO */

  filtrar(event:any){
    if(event.value==null)return;
    this.paginadorPeritos.content =this.paginadorPeritos.content.filter((value:any)=>value.dniCl == event.value);
  }

  // dialog
  cambiarVisible(){
    this.displayDialog = !this.displayDialog;
  }


}
