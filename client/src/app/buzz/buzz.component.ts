import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Message } from '../shared/model/message';
import { SocketService } from '../shared/services/socket.service';

@Component({
  selector: 'app-buzz',
  templateUrl: './buzz.component.html',
  styleUrls: ['./buzz.component.scss']
})
export class BuzzComponent implements OnInit {

  public username: string;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;

  constructor(
    private router: Router,
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');

    if (!this.username)
      this.router.navigate(['']);

      this.initIoConnection();
  }

  reset() {
    
  }

  goHome() {
    localStorage.removeItem('username');
    this.router.navigate(['']);
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
      });
  }

  public sendMessage(): void {
    let message: string = 'buzz';
    if (!message) {
      return;
    }

    this.socketService.send({
      username: this.username,
      content: message
    });
    this.messageContent = null;
  }

}
