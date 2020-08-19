import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DatabaseService } from '../../servicios/database.service';
declare let $: any;
import {Usuario} from '../../Models/Usuario';
import { Router } from '@angular/router';
import { database } from 'firebase';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-adm-prendas',
  templateUrl: './adm-prendas.component.html',
  styleUrls: ['./adm-prendas.component.css']
})
export class AdmPrendasComponent implements OnInit {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  itemEdit;
  constructor(db: AngularFireDatabase,
  public dbSer: DatabaseService,public router: Router,
  public auteticacion: AutenticacionService, public dbServicio: DatabaseService) {
    this.itemsRef = db.list('Prendas');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    console.log(this.items);
  }
  uidCU;
  async ngOnInit() {
    const usr = await this.auteticacion.getUserLogin();
     let us2: Promise<Usuario> = this.dbServicio.getUsuarioUID(usr.uid);
    if ((await us2).Rol != 'ADMINISTRADOR') {
      this.router.navigate(['/']);
    }
  }
  GuardarNewProducto() {
    let nombre = (<HTMLInputElement>document.getElementById('txtNombreNew')).value;
    let precio = (<HTMLInputElement>document.getElementById('txtPrecioNew')).value;
    if (nombre.length > 0 && precio.length > 0 ) {
      let pro = {
        Nombre: nombre,
        Precio: Number.parseFloat(precio),
        

      }
      this.itemsRef.push(pro);
      this.limpiar();
      $('#myModal').modal('hide');
    } else {
      alert('Ingrese toda la informacion');
    }
  }
 
  selectEdit(item) {
    (<HTMLInputElement>document.getElementById('txtNombreEdit')).value=item.Nombre;
    (<HTMLInputElement>document.getElementById('txtPrecioEdit')).value=item.Precio;
    
    this.itemEdit=item;
  }
  EditarProductoProducto(){
    let nombre = (<HTMLInputElement>document.getElementById('txtNombreEdit')).value;
    let precio = (<HTMLInputElement>document.getElementById('txtPrecioEdit')).value;
    if (nombre.length > 0 && precio.length > 0 ) {
      let pro = {
        Nombre: nombre,
        Precio: Number.parseFloat(precio)
        

      }
     // this.itemsRef.push(pro);
      this.itemsRef.update(this.itemEdit.key, pro);
      this.limpiar();
      $('#myModalEdit').modal('hide');
    } else {
      alert('Ingrese toda la informacion');
    }
  }
  limpiar(){
    (<HTMLInputElement>document.getElementById('txtNombreEdit')).value='';
    (<HTMLInputElement>document.getElementById('txtPrecioEdit')).value='';
    (<HTMLInputElement>document.getElementById('txtNombreNew')).value='';
    (<HTMLInputElement>document.getElementById('txtPrecioNew')).value='';
   

    
  }
  deleteItem(key: string) {
    var r = confirm("Seguro que deseas eliminar este producto");
    if (r == true) {
      this.itemsRef.remove(key);
    }

  }


}
