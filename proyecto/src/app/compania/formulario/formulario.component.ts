import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CompaniaService } from 'src/app/servicios/compania/compania.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {


  
  companiaNueva:any = {};
  editando:boolean =false;

  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    public messageService: MessageService,
    private servicio: CompaniaService) { }

  ngOnInit(): void {
    if(this.config.data.compania!= null){
      this.companiaNueva = this.config.data.compania;
      this.editando = true;
    }
  }


  
  /* GUARDANDO NUEVO SEGURO*/
  
  enviarFormulario(){
    
    let formulario: any = document.getElementById("crearCompania");

    if(formulario.reportValidity()){
      this.servicio.agregarCompania(this.companiaNueva).subscribe((res:any)=>{ 
        this.ref.close();
        setTimeout(() => {          
          this.companiaNueva = {};
        }, 1000);
      })

    }
  }

}
