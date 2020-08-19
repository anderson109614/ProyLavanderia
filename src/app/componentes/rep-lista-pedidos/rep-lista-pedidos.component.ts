import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from '@angular/fire/database';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, first, switchMap } from 'rxjs/operators';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { DatabaseService } from '../../servicios/database.service';

import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/Usuario';

@Component({
  selector: 'app-rep-lista-pedidos',
  templateUrl: './rep-lista-pedidos.component.html',
  styleUrls: ['./rep-lista-pedidos.component.css']
})
export class RepListaPedidosComponent implements OnInit {

  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;
  uid;
  ListaPedidosCli: any = [];
  constructor(public router: Router,
    db: AngularFireDatabase, public auteticacion: AutenticacionService, public dbServicio: DatabaseService) {

    this.size$ = new BehaviorSubject(null);
    this.items$ = this.size$.pipe(
      switchMap(size =>
        db.list('Pedidos', ref =>
          size ? ref.orderByChild('Estado').equalTo(size) : ref ||
            ref.equalTo(this.uid)

        ).snapshotChanges()
      )
    );
  }

  async ngOnInit() {
    const usr = await this.auteticacion.getUserLogin();
    this.uid = usr.uid;
    let us: Promise<Usuario> = this.dbServicio.getUsuarioUID(this.uid);
    if ((await us).Rol != 'REPARTIDOR') {
      this.router.navigate(['/']);
    }
    this.filtrar('');
  }
  filtrar(est: string) {
    this.items$.subscribe(queriedItems => {
      console.log(queriedItems);
      this.ListaPedidosCli = [];
      for (let index = 0; index < queriedItems.length; index++) {
        let a = {
          User: this.dbServicio.getUsuarioUID(queriedItems[index].payload.val().Uid),
          data: queriedItems[index]
        }
        if (est.length != 0) {


          if (queriedItems[index].payload.val().Estado == est &&queriedItems[index].payload.val().Repartidor==this.uid) {

            this.ListaPedidosCli.push(a);
          }
        } else {
          if(queriedItems[index].payload.val().Repartidor==this.uid){
            this.ListaPedidosCli.push(a);
          }
          
        }
        // this.listFiltrada.push(a);


      }
      console.log(this.ListaPedidosCli);
    });

  }

}
