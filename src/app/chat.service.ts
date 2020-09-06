import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io('http://localhost:3000');

  joinRoom(data)
  {
    console.log(data);
      this.socket.emit('join',data);
  }

  newUserJoined()
  {
      let observable = new Observable<{user:String, message:String}>(observer=>{
          this.socket.on('new user joined', (data)=>{
              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }

  leaveRoom(data){
      this.socket.emit('leave',data);
  }

  userLeftRoom(){
      let observable = new Observable<{user:String, message:String}>(observer=>{
          this.socket.on('left room', (data)=>{
              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }

  sendMessage(data)
  {
      this.socket.emit('message',data);
  }

  newMessageReceived(){
      let observable = new Observable<{user:String, message:String}>(observer=>{
          this.socket.on('new message', (data)=>{
              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }
}
