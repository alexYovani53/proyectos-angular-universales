import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PeritoService } from 'src/app/servicios/perito/perito.service';

@Component({
  selector: 'app-formulario-perito',
  templateUrl: './formulario-perito.component.html',
  styleUrls: ['./formulario-perito.component.css']
})
export class FormularioPeritoComponent implements OnInit {

  
  peritoNuevo:any = {};
  editando:boolean =false;

  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    public messageService: MessageService,
    private servicio: PeritoService) { }

  ngOnInit(): void {
    if(this.config.data.perito!= null){
      this.peritoNuevo = this.config.data.perito;
      this.editando = true;
    }
  }


  
  /* GUARDANDO NUEVO SEGURO*/
  
  enviarFormulario(){
    
    let formulario: any = document.getElementById("crearPerito");

    if(formulario.reportValidity()){
      this.servicio.agregarPerito(this.peritoNuevo).subscribe((res:any)=>{
        this.messageService.add({severity:'info', summary: 'Perito', detail: 'Perito registrado'});      
        this.ref.close();
        setTimeout(() => {          
          this.peritoNuevo = {};
        }, 1000);
      })

    }
  }

}
