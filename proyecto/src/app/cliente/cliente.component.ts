
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService, TreeNode } from 'primeng/api';
import { ClienteService } from '../servicios/cliente/cliente.service';
import { SeguroService } from '../servicios/seguro/seguro.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class ClienteComponent implements OnInit {

  mensaje:boolean = false;
  toast:boolean =false;
  displayDialog:boolean = false;
  display:boolean= false;

  
  items: MenuItem[] = [];

  clientes:any=[];

  paginadorCliente: any = {};

  usuarioNuevo:any = {};
  completo:boolean = true;
  editando:boolean = false;

  first  = 0;
  rows  = 4;

  selectedNode1:TreeNode = {}

  selectedCliente: any = {};

  constructor(
    private servicio:ClienteService, 
    private servicioSeguro:SeguroService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { 
    
    // cuando la pagina carga su estructura general

    
  }

  cambiarVisible(){
    this.displayDialog = !this.displayDialog;
  }
  ngOnInit(): void {
    this.obtenerClientesPaginador();
    this.items = [
      {
          label:'Editar',
          icon:'pi pi-fw pi-file',
          command:(e)=>{
            this.editar(this.selectedCliente);
            this.displayDialog = false;
          }
      },
      {
          label:'Eliminar',
          icon:'pi pi-trash',
          
          command:(e)=>{
            this.eliminarCliente(this.selectedCliente.dniCl);            
            this.displayDialog = false;
          }
      },
      {
          label:'Ver Seguros',
          icon:'pi pi-fw pi-user',
          command:(event)=>{
            location.href = `/seguro/${this.selectedCliente.dniCl}`
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
      this.servicio.guardarUsuario(this.usuarioNuevo).subscribe((res:any)=>{
        this.obtenerClientesPaginador();
        this.showViaService("Guardar","Cliente guardado con exito");
        this.activarForm();
      });
      
    }else{
      console.log("no valido")
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
    document.querySelector(".formulario")?.classList.add("activo")
    this.editando = true;
    this.usuarioNuevo = e;
  }



  activarForm(){
    let form = document.querySelector(".formulario")

    if (form?.classList.contains("activo")) {
      form.classList.remove("activo")
    }
    else form?.classList.add("activo")

  }

  eliminarCliente(id:number){
    
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar?',
      accept: () => {            
        this.servicio.eliminarCliente(id).subscribe((res:any)=>{
          console.log(res)
          
          this.messageService.add({key:"toast", severity:'success', summary:"Eliminando", detail:"Se elimino correctamente el cliente"});
          this.obtenerClientesPaginador();
        })
      }
    });
  }


  showViaService(titulo:string, mensaje:string){
    this.messageService.add({key:"message",severity:'success', summary:titulo, detail:mensaje});
    setTimeout(() => {
      this.messageService.clear();
    }, 1000);
  }


  /*METODOS DE TABLA*/
  onRowSelect(a:any) {

    this.selectedCliente = a.data;
    this.displayDialog  =true;

    // console.log(a.data)

    // this.servicioSeguro.contarSegurosCliente(a.data.dniCl).subscribe((res:any)=>{
    //   if(res[0]!=null){
    //     let cantidad = res[0].total;

    //     this.confirmationService.confirm({
    //       message: `Desea ver los ${cantidad} seguros asociados a este cliente?`,
    //       header: 'Ver seguros',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //           location.href = `/seguro/${a.data.dniCl}`
    //       }
    //     });
    //   }else{
    //     this.display = true;
    //   }
    // })
  
  }
    


  onRowUnselect(a:any) {
    console.log(a.data)
  }


}
