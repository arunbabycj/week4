import { Component, OnInit } from '@angular/core';
import {SocketService} from '../services/socket/socket.service';
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username:string;
  messages = [];
  message;
  connection;

  constructor(private sockServ: SocketService, private router:Router) { }

  ngOnInit() {
    //choice for valid user and subscribe to service (chat messages)
    if(!sessionStorage.getItem('username')){
      //No vaid session is available
      console.log('Not validated');
      sessionStorage.clear();
      alert("Not a valid user");
      this.router.navigateByUrl('login');
    } else {
      //we have a valid username. Subscribe to chat service and add chat message
      //to the message array each time you have pushed a message from the server.
      this.username = sessionStorage.getItem('username');
      console.log("session started for:" + this.username);
      this.connection = this.sockServ.getMessages().subscribe(message =>{
        //message is a value of input field
        this.messages.push(message);
        this.message = " ";
      });
    }
  }
  sendMessage(){
    //send a chat message to the server.
    this.sockServ.sendMessage(this.message + '('+this.username+')');
    //this.message = "";
  }

  ngOnDestroy() {
    //when leaving this component close down the subscription
    if(this.connection){
      this.connection.unsubscribe();
    }
  }

  logout(){
    //logout the user and go back to login page
    sessionStorage.clear();
    console.log("session cleared");
    this.router.navigateByUrl('login');
  }
}
