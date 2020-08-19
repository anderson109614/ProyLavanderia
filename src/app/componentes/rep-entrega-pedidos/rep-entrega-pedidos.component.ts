import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../../servicios/database.service';
import { Pedido } from '../../Models/Pedido';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from '@angular/fire/database';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Usuario } from '../../Models/Usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-rep-entrega-pedidos',
  templateUrl: './rep-entrega-pedidos.component.html',
  styleUrls: ['./rep-entrega-pedidos.component.css']
})
export class RepEntregaPedidosComponent implements OnInit {

  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;
  constructor(public db: AngularFireDatabase,public auteticacion: AutenticacionService,
    private rutaActiva: ActivatedRoute, public dbSer: DatabaseService,
    public router: Router) {

    this.size$ = new BehaviorSubject(null);
    this.items$ = this.size$.pipe(
      switchMap(size =>
        db.list('Usuarios', ref =>
          size ? ref.orderByChild('Rol').equalTo(size) : ref

        ).snapshotChanges()
      )
    );

  }
  id = '';
  uuid='';
  fecha = '';
  total = 0;
  listaDetalle: any = [];
  cliente;
  listFiltrada = [];
  NombreRepartidor='';
  CedulaRepartidor='';
  KeyRepartidor='';
  Estado='';
  async ngOnInit() {
    this.id = this.rutaActiva.snapshot.params.id;
    console.log('id', this.id);
    let us: Promise<Pedido> = this.dbSer.getPedidoID(this.id);
    this.fecha = (await us).Fecha;
    
    this.total = Number.parseFloat((await us).Total);
    this.listaDetalle = (await us).Prendas;
    this.Estado = (await us).Estado;
    this.cliente = this.dbSer.getUsuarioUID((await us).Uid);
    this.uuid=(await us).Uid;
    let repartidor: Promise<Usuario> = this.dbSer.getUsuarioUID((await us).Repartidor);
    
    
    try {
      this.NombreRepartidor=(await repartidor).Nombre;
    this.CedulaRepartidor=(await repartidor).Cedula;
    this.KeyRepartidor=(await repartidor).UID;
    } catch (error) {
      
    }
    
    ///
    this.filtrar('');
    const usr = await this.auteticacion.getUserLogin();
     let us2: Promise<Usuario> = this.dbSer.getUsuarioUID(usr.uid);
    if ((await us2).Rol != 'REPARTIDOR') {
      this.router.navigate(['/']);
    }
  }

  filtrar(est: string) {
    this.items$.subscribe(queriedItems => {
      console.log(queriedItems);
      this.listFiltrada = [];
      for (let index = 0; index < queriedItems.length; index++) {
        
       

          
          if (queriedItems[index].payload.val().Rol == 'REPARTIDOR') {

            this.listFiltrada.push(queriedItems[index]);
          }
        
        // this.listFiltrada.push(a);


      }
      console.log(this.listFiltrada);
    });

  }
  asignar(nom:string,cedu:string,ke:string){
    this.NombreRepartidor=nom;
    this.CedulaRepartidor=cedu;
    this.KeyRepartidor=ke;
  }

  guardar(){
    if(this.KeyRepartidor.length>0){
      var r = confirm("Seguro que desea entregar?");
      if (r == true) {
        this.db.list('Pedidos').update(this.id,{ Estado:'ENTREGADO'});
        this.router.navigate(['/RepListaPedidos']);
      } 

      
    }else{
      alert('Seleccione un repartidor');
    }
    
  }

}
