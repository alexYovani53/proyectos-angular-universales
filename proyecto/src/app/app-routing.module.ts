import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { CompaniaComponent } from './compania/compania.component';
import { PeritoComponent } from './perito/perito.component';
import { SeguroComponent } from './seguro/seguro.component';
import { SiniestroComponent } from './siniestro/siniestro.component';

const routes: Routes = [
  
  {path:"cliente",component:ClienteComponent},
  {path:"seguro",component:SeguroComponent},
  {path:"seguro/:cliente",component:SeguroComponent},
  {path:"siniestro",component:SiniestroComponent},
  {path:"compania",component:CompaniaComponent},
  {path:"perito",component:PeritoComponent},
  {path:'',component:ClienteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
