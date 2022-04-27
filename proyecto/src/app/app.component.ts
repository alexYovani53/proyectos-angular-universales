import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto';
  

  ngOnInit(){
    
  }

  cambiar(){
    
    let ref = document.querySelector(".side-bar")
    let refContent = document.querySelector(".container-fluid")

    if( ref?.classList.contains("activo")){
      
      ref.classList.remove("activo");
      refContent?.classList.add("cerrado")
    }
    else {
      ref?.classList.add("activo");      
      refContent?.classList.remove("cerrado")
    }


  }


  pestana(numero:number){

    
    // let listaItems = document.querySelectorAll(".side-item");

    // for (let index = 0; index < listaItems.length; index++) {
    //   let element = listaItems[index];
      
    //   if( index == numero){
    //     element.classList.add("pestanaActiva")
    //   }else{
        
    //     element.classList.remove("pestanaActiva")
    //   }
      
    // }

  }
}
