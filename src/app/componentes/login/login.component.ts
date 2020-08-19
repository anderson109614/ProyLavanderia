import { Component, OnInit, Input } from '@angular/core';
import {AutenticacionService} from '../../servicios/autenticacion.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(public autenticacionSer:AutenticacionService) { }

  ngOnInit(): void {
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
  async Login(){
    var Usuario=(<HTMLInputElement>document.getElementById('txtMailLog')).value;
    var Pass1=(<HTMLInputElement>document.getElementById('txtPassLog')).value;
    
    try {
      const user = await this.autenticacionSer.IniciarSesion(Usuario,Pass1);
      console.log(user);
      if (user) {
        this.verHome(true);
        location.reload();
      }else{
        alert('usuario u contraseña invalidos');
      }
    } catch (error) {
      console.log(error);
    }

  }

}
