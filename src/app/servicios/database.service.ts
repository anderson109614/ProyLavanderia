import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList  
} from '@angular/fire/database';
import {Usuario} from '../Models/Usuario';
import {Pedido} from '../Models/Pedido';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  
  constructor(public db: AngularFireDatabase) { 

   
  }

  //Crea un nuevo gato
  public createNewUser(user) {
    console.log('g user',user);
    try {
      let  itemRefU= this.db.object('Usuarios/'+user.UID);
      itemRefU.set(user);
      console.log('dentro',user);
    } catch (error) {
      console.log(error);
    }
   
    

   
  }
  
  public getUsuarioUID(uid:string){
    let  itemRefU= this.db.object<Usuario>('Usuarios/'+uid);
    return itemRefU.valueChanges().pipe(first()).toPromise();
  }
  
  public getPedidoID(id:string){
    let  itemRefU= this.db.object<Pedido>('Pedidos/'+id);
    return itemRefU.valueChanges().pipe(first()).toPromise();
  }
  /*
  public ListaProductos(uid:string) {
    let refL = this.db.list('Pedidos');
    // Use snapshotChanges().map() to store the key
    return refL.valueChanges().pipe(first()).toPromise();
  }
  */
}
