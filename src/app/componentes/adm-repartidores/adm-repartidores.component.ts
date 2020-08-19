import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AutenticacionService} from '../../servicios/autenticacion.service'
import { DatabaseService } from '../../servicios/database.service';
declare let $: any;
import {Usuario} from '../../Models/Usuario';
import { Router } from '@angular/router';
import { database } from 'firebase';

@Component({
  selector: 'app-adm-repartidores',
  templateUrl: './adm-repartidores.component.html',
  styleUrls: ['./adm-repartidores.component.css']
})
export class AdmRepartidoresComponent implements OnInit {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  itemEdit;
  constructor(public db: AngularFireDatabase,
  public dbSer: DatabaseService,public router: Router,
  public autenticacion:AutenticacionService,
  public auteticacion: AutenticacionService, public dbServicio: DatabaseService) {
    this.itemsRef = db.list('Usuarios');
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
  
  async GuardarNewProducto() {
    let cedula = (<HTMLInputElement>document.getElementById('txtCedulaNew')).value;
    let nombres = (<HTMLInputElement>document.getElementById('txtNombresNew')).value;
    let apellido = (<HTMLInputElement>document.getElementById('txtApellidoNew')).value;
    let email = (<HTMLInputElement>document.getElementById('txtEmailNew')).value;
    let pass = (<HTMLInputElement>document.getElementById('txtPass')).value;
    let passC = (<HTMLInputElement>document.getElementById('txtPassConfir')).value;
    let usr:Usuario={
      Cedula:cedula,
      Direccion:'',
      Email:email,
      Apellido:apellido,
      Nombre:nombres,
      Rol:'REPARTIDOR',
      UID:''
    }
    if (this.validar(usr)){
      if(pass==passC){
        try {
          const user = await this.autenticacion.registrar(usr.Email,pass);
          
          if (user) {
            usr.UID=user.uid;
            let  itemRefU= this.db.object('Usuarios/'+usr.UID);
            itemRefU.set(usr);
            $('#myModal').modal('hide');
            //this.autenticacion.sendVerificationEmail();
            this.limpiar();
          }
        } catch (error) {
          console.log(error);
          alert('Error al registrar usuario');
        }
      }else{
        alert('Las contraseñas no coinciden');
      }
     
      
    } 
  }
  validar(usr:Usuario){
    if(usr.Cedula.length==0){
      alert('Ingrese una cedula');
      return false;
    }
    if(usr.Nombre.length==0){
      alert('Ingrese Nombre');
      return false;
    }
    if(usr.Apellido.length==0){
      alert('Ingrese Apellido');
      return false;
    }
    if(usr.Email.length==0){
      alert('Ingrese Email');
      return false;
    }

    return true;
  }
  
  selectEdit(item) {
    (<HTMLInputElement>document.getElementById('txtCedulaEdit')).value=item.Cedula;
    (<HTMLInputElement>document.getElementById('txtNombresEdit')).value=item.Nombre;
    (<HTMLInputElement>document.getElementById('txtApellidoEdit')).value=item.Apellido;
    (<HTMLInputElement>document.getElementById('txtEmailedit')).value=item.Email;
    this.itemEdit=item;
  }
  EditarProductoProducto(){
    let nombre = (<HTMLInputElement>document.getElementById('txtNombresEdit')).value;
    let apellido = (<HTMLInputElement>document.getElementById('txtApellidoEdit')).value;
    let cedula = (<HTMLInputElement>document.getElementById('txtCedulaEdit')).value;
    if (nombre.length > 0 && cedula.length > 0 ) {
      
     // this.itemsRef.push(pro);
      this.itemsRef.update(this.itemEdit.key,{Nombres:nombre,Cedula:cedula,Apellido:apellido});
      $('#myModalEdit').modal('hide');
      this.limpiar();
    } else {
      alert('Ingrese toda la informacion');
    }
  }
  limpiar(){
    /*
    (<HTMLInputElement>document.getElementById('txtNombreEdit')).value='';
    (<HTMLInputElement>document.getElementById('txtPrecioEdit')).value='';
    (<HTMLInputElement>document.getElementById('txtNombreNew')).value='';
    (<HTMLInputElement>document.getElementById('txtPrecioNew')).value='';*/
    
    
  }
  async sendMail(){
   try {
    //await this.authSer.resetPassword(this.itemEdit.Email);
    (<HTMLButtonElement>document.getElementById('btnCambio')).disabled=true;
   } catch (error) {
     alert('Error al enviar Email');
   }
    
  }
  deleteItem(key: string) {
    var r = confirm("Seguro que deseas eliminar este producto");
    if (r == true) {
      this.itemsRef.remove(key);
    }

  }
}
