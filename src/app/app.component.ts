import { Component,OnInit } from '@angular/core';
import {AutenticacionService} from './servicios/autenticacion.service';
import {DatabaseService} from './servicios/database.service';
import {Usuario} from './Models/Usuario';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Lavanderia';
  Rol='';
  Nombre='';
  constructor(public authService:AutenticacionService,public database:DatabaseService){

  }
  Email='';
  async ngOnInit() {
    const usr =await this.authService.getUserLogin();
    console.log(usr);
    if(usr){
      this.verHome(true);
      let us:Promise<Usuario>= this.database.getUsuarioUID(usr.uid);
      this.Rol=(await us).Rol;
      this.Nombre=(await us).Email;
      
    }else{
      this.verLogin(true);
    }
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
  salir(){
    this.authService.CerarSesion();
    this.verLogin(true);
  }



}
