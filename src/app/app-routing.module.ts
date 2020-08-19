import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CliListaPedidosComponent} from './componentes/cli-lista-pedidos/cli-lista-pedidos.component';
import {CliNuevoPedidoComponent} from './componentes/cli-nuevo-pedido/cli-nuevo-pedido.component';
import {CliDestallePedidoComponent} from './componentes/cli-destalle-pedido/cli-destalle-pedido.component';
import {AdmListaPedidosComponent} from './componentes/adm-lista-pedidos/adm-lista-pedidos.component';
import {AdmAsignarPedidoComponent} from './componentes/adm-asignar-pedido/adm-asignar-pedido.component';
import {RepListaPedidosComponent} from './componentes/rep-lista-pedidos/rep-lista-pedidos.component';
import {RepEntregaPedidosComponent} from './componentes/rep-entrega-pedidos/rep-entrega-pedidos.component';
import {AdmPrendasComponent} from './componentes/adm-prendas/adm-prendas.component';
import {AdmRepartidoresComponent} from './componentes/adm-repartidores/adm-repartidores.component';
const routes: Routes = [
  {path:'ListaPedidos',component:CliListaPedidosComponent},
  {path:'NewPedidos',component:CliNuevoPedidoComponent},
  {path:'DetallePedido/:id',component:CliDestallePedidoComponent},
  {path:'AmdListaPedidos',component:AdmListaPedidosComponent},
  {path:'AmdAsignarRepartidor/:id',component:AdmAsignarPedidoComponent},
  {path:'RepListaPedidos',component:RepListaPedidosComponent},
  {path:'RepAsignarRepartidor/:id',component:RepEntregaPedidosComponent},
  {path:'AdmPrendas',component:AdmPrendasComponent},
  {path:'AdmRepartidores',component:AdmRepartidoresComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
