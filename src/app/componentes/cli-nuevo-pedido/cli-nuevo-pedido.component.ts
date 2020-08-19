import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AutenticacionService} from '../../servicios/autenticacion.service';

import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/servicios/database.service';
import { Usuario } from 'src/app/Models/Usuario';
@Component({
  selector: 'app-cli-nuevo-pedido',
  templateUrl: './cli-nuevo-pedido.component.html',
  styleUrls: ['./cli-nuevo-pedido.component.css']
})
export class CliNuevoPedidoComponent implements OnInit {
  fecha = '';
  total = 0;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  ListaProductosPedido: any = [];
  uid = '';
  constructor(public db: AngularFireDatabase,
    public dbServicio: DatabaseService,
    public router: Router,
    public auteticacion:AutenticacionService) {
    this.itemsRef = db.list('Prendas');

    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }

  async ngOnInit() {
    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var seconds = date.getSeconds();
    this.fecha = year + "/" + (monthIndex + 1) + "/" + day;
    const usr =await this.auteticacion.getUserLogin();
    this.uid=usr.uid;

    
     let us2: Promise<Usuario> = this.dbServicio.getUsuarioUID(usr.uid);
    if ((await us2).Rol != 'CLIENTE') {
      this.router.navigate(['/']);
    }
  }

  SeleccionarPrenda(nombre: string, precio: number, id: string) {
    console.log('entro metodo');
    let cant = Number.parseFloat((<HTMLInputElement>document.getElementById('txtCantidadModal')).value.toString());
    let p = { Nombre: nombre, Precio: precio, Id: id, subTotal: precio * cant, Cantidad: cant }
    this.total += precio * cant;

    for (let index = 0; index < this.ListaProductosPedido.length; index++) {
      if (this.ListaProductosPedido[index].Id == p.Id) {
        this.ListaProductosPedido[index].Cantidad += p.Cantidad;
        this.ListaProductosPedido[index].subTotal += p.subTotal;
        return;
      }

    }
    this.ListaProductosPedido.push(p);
    (<HTMLInputElement>document.getElementById('txtCantidadModal')).value = '1';
    console.log(this.ListaProductosPedido);
  }
  eliminar(id: string) {
    for (let index = 0; index < this.ListaProductosPedido.length; index++) {
      if (this.ListaProductosPedido[index].Id == id) {
        this.total = this.total - this.ListaProductosPedido[index].subTotal;
        this.ListaProductosPedido.splice(index, 1);
        return;
      }

    }

  }
  guardar(){
    let totalPrendas=this.ListaProductosPedido.length;
    if(totalPrendas>0){
      let d={
        Estado: 
        "ENVIADO",
        Fecha: this.fecha,
        Prendas:this.ListaProductosPedido,
        Repartidor:
        '',
        Total: 
        this.total,
        Uid: this.uid}
      this.db.list('Pedidos').push(d);

        
        this.router.navigate(['/ListaPedidos']);
    }else{
      alert('Añada productos');
    }
  }

}
