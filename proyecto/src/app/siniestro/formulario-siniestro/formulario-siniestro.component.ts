import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PeritoService } from 'src/app/servicios/perito/perito.service';
import { SeguroService } from 'src/app/servicios/seguro/seguro.service';
import { SiniestroService } from 'src/app/servicios/siniestro/siniestro.service';

@Component({
  selector: 'app-formulario-siniestro',
  templateUrl: './formulario-siniestro.component.html',
  styleUrls: ['./formulario-siniestro.component.css'],
  
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class FormularioSiniestroComponent implements OnInit {

  styleInput:any = {padding:'8px',height:'39px'};
  styleContainer:any = {padding:'0',height:'39px'};

  siniestroNuevo:any = {};
  editando:boolean =false;

  
  minDate: Date = new Date();
  fecha:Date = new Date();

  peritos:any[] = []
  seguros:any[] = [];
  stateOptions: any[];
  constructor(
    private servicioSeguro:SeguroService,
    private servicioPerito:PeritoService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    public messageService: MessageService,
    private servicio: SiniestroService) { }

  ngOnInit() : void {
    if(this.config.data.siniestro!= null){
      this.siniestroNuevo = this.config.data.siniestro;
      this.editando = true;
    }

    this.stateOptions = [{label: 'No', value: 'no'}, {label: 'Si', value: 'si'}];
    
    this.obtenerSeguros();
    this.obtenerPeritos();

    setTimeout( () => {
      this.siniestroNuevo.seguro = this.seguros.filter(valor =>valor.numeroPoliza == this.siniestroNuevo.numeroPoliza)[0];
      this.siniestroNuevo.perito = this.peritos.filter(valor =>valor.dniPerito == this.siniestroNuevo.dniPerito)[0];

    }, 1000);


    
  }


  
  /* GUARDANDO NUEVO SEGURO*/
  
  enviarFormulario(){
    
    let formulario: any = document.getElementById("crearSiniestro");

    if(formulario.reportValidity()){

      this.siniestroNuevo.dniPerito = this.siniestroNuevo.perito.dniPerito;
      this.siniestroNuevo.numeroPoliza = this.siniestroNuevo.seguro.numeroPoliza;

      this.servicio.agregarSiniestro(this.siniestroNuevo).subscribe((res:any)=>{    
        console.log(res)
        this.ref.close(1);
        setTimeout(() => {          
          this.siniestroNuevo = {};
        }, 1000);
      })

    }
  }


  
  /* DROP-DOWN*/
  obtenerPeritos()  {
    this.servicioPerito.buscarPeritos().subscribe(
      (res:any)=>{        
        res.forEach((element:any) => {
          element.valor = element.dniPerito + "  "+  element.nombrePerito
        });
        this.peritos = res;
      }
    )
  }

  obtenerSeguros(){
    this.servicioSeguro.buscarSeguros().subscribe(
      (res:any)=>{        
        res.forEach((element:any) => {
          element.valor = "#" + element.numeroPoliza + " | Cl: "+  element.dniCl
        });
        this.seguros = res;
      }
    )
  }


}
