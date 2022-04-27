import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from "@angular/forms";
import {HttpClientModule} from "@angular/common/http"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';



import { ConfirmationService } from 'primeng/api';

import {SidebarModule} from 'primeng/sidebar';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {PanelMenuModule} from 'primeng/panelmenu';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {MenubarModule} from 'primeng/menubar';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {FieldsetModule} from 'primeng/fieldset';
import {SelectButtonModule} from 'primeng/selectbutton';



import { ClienteComponent } from './cliente/cliente.component';
import { SeguroComponent } from './seguro/seguro.component';
import { SiniestroComponent } from './siniestro/siniestro.component';
import { PeritoComponent } from './perito/perito.component';
import { CompaniaComponent } from './compania/compania.component';
import { FormularioComponent } from './compania/formulario/formulario.component';
import { FormularioSiniestroComponent } from './siniestro/formulario-siniestro/formulario-siniestro.component';
import { FormularioPeritoComponent } from './perito/formulario-perito/formulario-perito.component';




@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ClienteComponent,
    SeguroComponent,
    SiniestroComponent,
    PeritoComponent,
    CompaniaComponent,
    FormularioComponent,
    FormularioSiniestroComponent,
    FormularioPeritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    InputTextModule,
    TableModule,    
    ButtonModule,
    CalendarModule,
    DropdownModule,
    PaginatorModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    PanelMenuModule,
    ConfirmDialogModule,
    InputNumberModule,
    MenubarModule,
    DialogModule,
    DynamicDialogModule,
    FieldsetModule,
    SelectButtonModule,
    
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
