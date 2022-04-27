import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from "@angular/forms";
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
  
import { ClienteComponent } from './cliente/cliente.component';
import { SeguroComponent } from './seguro/seguro.component';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    ClienteComponent,
    SeguroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TableModule,
    CalendarModule,
    InputTextModule,
    DropdownModule,
    PaginatorModule,
    ButtonModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
