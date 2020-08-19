import { Component, OnInit } from '@angular/core';
import {AutenticacionService} from '../../servicios/autenticacion.service';
import {DatabaseService} from '../../servicios/database.service';
import {Usuario} from '../../Models/Usuario';
import {User} from '../../Models/usrAuth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  constructor(public router: Router,public autenticacionSer:AutenticacionService,public database:DatabaseService) { }

  async ngOnInit(){
    
  }
  verLogin(b:boolean){
    if(b){
      (<HTMLDListElement>document.getElementById('divHome')).style.display='none';
      (<HTMLDListElement>document.getElementById('divLogin')).style.display='block';
      (<HTMLDListElement>document.getElementById('divRegistrar')).style.display='none';
    }else{
      (<HTMLDListElement>document.getElementById('divLogin')).style.display='none';
    }
  }
  verRegistrar(b:boolean){
    if(b){
      (<HTMLDListElement>document.getElementById('divHome')).style.display='none';
      (<HTMLDListElement>document.getElementById('divLogin')).style.display='none';
      (<HTMLDListElement>document.getElementById('divRegistrar')).style.display='block';
    }else{
      (<HTMLDListElement>document.getElementById('divRegistrar')).style.display='none';
    }
  }
  verHome(b:boolean){
    if(b){
      (<HTMLDListElement>document.getElementById('divHome')).style.display='block';
      (<HTMLDListElement>document.getElementById('divLogin')).style.display='none';
      (<HTMLDListElement>document.getElementById('divRegistrar')).style.display='none';
    }else{
      (<HTMLDListElement>document.getElementById('divRegistrar')).style.display='none';
    }
  }
  async Registrar(){
    var Email=(<HTMLInputElement>document.getElementById('txtEmailRef')).value;
    var cont1=(<HTMLInputElement>document.getElementById('txtContrasena1Ref')).value;
    var cont1=(<HTMLInputElement>document.getElementById('txtContrasena2Ref')).value;
    var Ced=(<HTMLInputElement>document.getElementById('txtCedulaRef')).value;
    var Nom=(<HTMLInputElement>document.getElementById('txtNombreRef')).value;
    var Ape=(<HTMLInputElement>document.getElementById('txtApellidoRef')).value;
    
    var Direc=(<HTMLInputElement>document.getElementById('txtDireccionRef')).value;
    
    let NewUser:Usuario={
      Cedula:Ced,
      Nombre:Nom,
      Apellido:Ape,
      Direccion:Direc,
      Email:Email,
      Rol:"CLIENTE",
      UID:""

    }

    if(cont1!=cont1){
      alert('Las contraseñas no coinciden');
    }else{
      
      try {
        const user = await this.autenticacionSer.registrar(Email,cont1);
        NewUser.UID=user.uid;
        if (user) {
          console.log('antes',NewUser);
          this.database.createNewUser(NewUser);
          this.verLogin(true);
        }else{
          alert('Error al intentar registrar');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

}
