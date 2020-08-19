import {first, switchMap} from 'rxjs/operators'
import { Injectable } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../Models/usrAuth';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  // user:User;
  
   constructor(public afAuth:AngularFireAuth) { 
    
   }
   async IniciarSesion(email:string,pass:string){
     try {
       const { user } =await this.afAuth.signInWithEmailAndPassword(email,pass);
     return user;
     } catch (error) {
       console.log(error);
     }
     
   }
 
   async registrar(email:string,pass:string){
     try {
       const {user}=await this.afAuth.createUserWithEmailAndPassword(email,pass);
       return user;
     } catch (error) {
       console.log(error);
     }
    
   }
   async CerarSesion(){
     try {
       await this.afAuth.signOut();
     } catch (error) {
       console.log(error);
     }
     
   }
   getUserLogin(){
     return this.afAuth.authState.pipe(first()).toPromise();
   }
  
}
