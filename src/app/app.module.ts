import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacionComponent } from './componentes/navegacion/navegacion.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';

import {environment} from '../environments/environment';
import { CliListaPedidosComponent } from './componentes/cli-lista-pedidos/cli-lista-pedidos.component';
import { CliNuevoPedidoComponent } from './componentes/cli-nuevo-pedido/cli-nuevo-pedido.component';
import { AdmListaPedidosComponent } from './componentes/adm-lista-pedidos/adm-lista-pedidos.component';
import { AdmAsignarPedidoComponent } from './componentes/adm-asignar-pedido/adm-asignar-pedido.component';
import { RepListaPedidosComponent } from './componentes/rep-lista-pedidos/rep-lista-pedidos.component';
import { RepEntregaPedidosComponent } from './componentes/rep-entrega-pedidos/rep-entrega-pedidos.component';
import { CliDestallePedidoComponent } from './componentes/cli-destalle-pedido/cli-destalle-pedido.component';
import { AdmPrendasComponent } from './componentes/adm-prendas/adm-prendas.component';
import { AdmRepartidoresComponent } from './componentes/adm-repartidores/adm-repartidores.component';


@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    LoginComponent,
    RegistrarComponent,
    CliListaPedidosComponent,
    CliNuevoPedidoComponent,
    AdmListaPedidosComponent,
    AdmAsignarPedidoComponent,
    RepListaPedidosComponent,
    RepEntregaPedidosComponent,
    CliDestallePedidoComponent,
    AdmPrendasComponent,
    AdmRepartidoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
   AngularFireAuthModule,
   AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
