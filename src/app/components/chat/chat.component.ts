import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {
  mensaje:string="";
  elemento:any;

  constructor( public _cs:ChatService ) {  
    this._cs.cargarMensaje()
        .subscribe();

       
  }


  
  ngOnInit(){

    this.elemento=document.getElementById('app-mensaje');


  }


   enviar_mensaje(){
    console.log(this.mensaje);
    if(this.mensaje.length == 0){
      return;
    }

    this._cs.agregarMensaje(this.mensaje)
      .then( ()=>{ console.log("Mensaje enviado")  
                    this.mensaje="" ;} )
      .catch((err)=>{ console.error( ` Error: ${err}`  ); })
  }

}
