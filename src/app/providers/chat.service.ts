import { Mensaje } from './../interface/mensaje.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';


import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats:Mensaje[]=[];
  public usuario:any ={ };

   

  constructor( private afs:AngularFirestore,
                public afAuth: AngularFireAuth ) {

                 this.afAuth.authState.subscribe( user=>{ 
                   console.log('Estado del usuario: ', user);

                   if(!user){
                     return;

                   }

                   this.usuario.nombre = user.displayName;
                   this.usuario.uid= user.uid;

                  } ) 
    
     }


     login( proveedor:string ) {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    logout() {
      this.usuario ={ };
      this.afAuth.auth.signOut();
    }


   cargarMensaje(){
     this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(5) );
     

    return this.itemsCollection.valueChanges().pipe( map( (mensajes:Mensaje[])=>{
        console.log(mensajes);
        this.chats=[];
        for(let mensaje of mensajes){
          this.chats.unshift(mensaje);

        }
        return this.chats;
    }))

   }

   agregarMensaje( texto:string ){

      let mensaje:Mensaje = {
        nombre:"Juan",
        mensaje:texto,
        fecha:new Date().getTime()
      }
    
      return  this.itemsCollection.add(mensaje);

   }
}

