import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ClienteService } from '../servicios/cliente/cliente.service';
import { CompaniaService } from '../servicios/compania/compania.service';
import { SeguroService } from '../servicios/seguro/seguro.service';
import { SegurocompaniaService } from '../servicios/segurocompania/segurocompania.service';
import { FormularioComponent } from './formulario/formulario.component';

@Component({
  selector: 'app-compania',
  templateUrl: './compania.component.html',
  styleUrls: ['./compania.component.css'],
  
  
  providers: [MessageService,DialogService],
  encapsulation: ViewEncapsulation.None
})
export class CompaniaComponent implements OnInit {

  displayDialog:boolean = false;
  editando:boolean = false;
  mostrarFormulario :boolean  = false;
  completo:boolean = true;


  
  paginadorCompanias: any = {};
  seguros: any[] = [];
  segurosCompaniaArray:any[] = [];
  seguroCompaniaNuevo:any = {};



  minDate: Date = new Date();
  fecha:Date = new Date();
  fechaMostrar: Date = new Date();


  dniCliente:number = -1;
  selectedCompania: any = {};

  items: MenuItem[] = [];


  first  = 0;
  rows  = 4;

  

  constructor(
    private compania:CompaniaService,
    private servicioSeguro:SeguroService,
    private companiaSeguro: SegurocompaniaService,
    private messageService:MessageService, 
    private route:ActivatedRoute,
    public dialogService: DialogService) { 
    
    // cuando la pagina carga su estructura general
  }

  ngOnInit(): void {

    this.minDate = new Date();
    this.obtenerSeguros();

    this.route.params.subscribe((params:any)=>{
      if(params.cliente){
        this.dniCliente = params.cliente;
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
        this.obtenerCompaniasPaginador();
        this.items = [
          {
              label:'Editar',
              icon:'pi pi-fw pi-file',
              command:(e)=>{
                this.activarEdicion(this.selectedCompania);
                this.displayDialog = false;
              }
          },
          {
              label:'Eliminar',
              icon:'pi pi-trash',
              
              command:(e)=>{
                this.eliminarCompania(this.selectedCompania.nombreCompania);            
                this.displayDialog = false;                
                this.messageService.add({severity:'info', summary: 'Companias', detail: 'Compania eliminada'});
              }
          },
          // {
          //     label:'Ver Seguros',
          //     icon:'pi pi-fw pi-user'
          // },
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


  agregarSeguroCompania(){

    
    console.log(this.seguroCompaniaNuevo)
    if(this.seguroCompaniaNuevo.seguro != null){
      this.seguroCompaniaNuevo.numeroPoliza = this.seguroCompaniaNuevo.seguro.numeroPoliza;
      this.seguroCompaniaNuevo.nombreCompania = this.selectedCompania.nombreCompania;
      this.companiaSeguro.agregarrCompaniaSeguro(this.seguroCompaniaNuevo).subscribe((res:any)=>{
        console.log(res);
        this.messageService.add({severity:'info', summary: 'CompaniasSeguros', 
        detail: `Se agrego correctamente el seguro ${this.seguroCompaniaNuevo.seguro.numeroPoliza} a la compania ${this.selectedCompania.nombreCompania}`});
        this.obtenerSegurosCompania(this.selectedCompania.nombreCompania);
        this.seguroCompaniaNuevo = {};
      })
    }
  }

  show() {
    const ref = this.dialogService.open(FormularioComponent, {
        header: 'Crear nueva compania',
        width: '70%'
    });

    ref.onClose.subscribe((e:any) =>{
      this.obtenerCompaniasPaginador();
      this.messageService.add({severity:'info', summary: 'Companias', detail: "Se registro con exito"});  
    });
  } 


  
  obtenerCompaniasPaginador(){
    console.log(this.first +"---> "+ this.rows)
    this.compania.buscarCompaniasPaginador(this.first, this.rows).subscribe(
      (res:any)=>{
        this.paginadorCompanias = res;
        console.log(this.paginadorCompanias)
      }
    )
  }
  obtenerSeguros(){
    this.servicioSeguro.buscarSeguros().subscribe(
      (res:any)=>{        
        console.log(res)
        res.forEach((element:any) => {
          element.valor = "#" + element.numeroPoliza + " | Cl: "+  element.dniCl
        });
        this.seguros = res;
      }
    )
  }

  
  obtenerSegurosCompania(nombre:string){
    console.log(nombre);
    this.compania.buscarSegurosCompanias(nombre).subscribe(
      (res:any)=>{        
        console.log(res)
        this.segurosCompaniaArray = res;
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
  eliminarCompania(id:number){
    this.compania.eliminarCompania(id).subscribe((res:any)=>{
      this.obtenerCompaniasPaginador();
    });
  }

  /* EDITANDO UN SEGURO */
  activarEdicion(compania:any){
    const ref = this.dialogService.open(FormularioComponent, {
        data:{
          compania:compania
        },
        header: 'Administrar seguros',
        width: '70%'
    });
    
  }


  /* METODOS DE TABLA*/
  onRowSelect(a:any) {
    console.log(a)
    this.selectedCompania = a.data;
    this.obtenerSegurosCompania(a.data.nombreCompania)
    this.cambiarVisible();
  }

  onRowUnselect(a:any) {    
    console.log(a)
  }


  /* PAGINADOR*/
  
  next() {
    if( this.paginadorCompanias.last) return ;
    this.first = this.first + 1;
    this.obtenerCompaniasPaginador();
  }

  prev() {
    if( this.paginadorCompanias.first) return;
    this.first = this.first - 1;
    this.obtenerCompaniasPaginador();
  }

  reset() {
      this.first = 0;
      this.obtenerCompaniasPaginador();
  }

  isLastPage(): boolean {
      return this.paginadorCompanias.last;
  }

  isFirstPage(): boolean {
      return this.paginadorCompanias.first;
  }


  onPageChange(evento:any){
    this.first = evento.page;
    this.obtenerCompaniasPaginador();
  }

  /**FILTRO */

  filtrar(event:any){
    if(event.value==null)return;
    this.paginadorCompanias.content =this.paginadorCompanias.content.filter((value:any)=>value.dniCl == event.value);
  }

  //Dialog
  cambiarVisible(){
    this.displayDialog = !this.displayDialog;
  }
}
