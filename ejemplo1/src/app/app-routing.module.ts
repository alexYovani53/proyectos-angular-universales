import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { ClienteComponent } from './cliente/cliente.component';
import { SeguroComponent } from './seguro/seguro.component';

const routes: Routes = [
  {path:'seguro',component:SeguroComponent},
  {path:'cliente',component:ClienteComponent},
  {path:'home',component:BienvenidaComponent},
  {path:'',component:BienvenidaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
