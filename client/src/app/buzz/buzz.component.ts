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
  public type: string;
  buzzList: Array<Message> = null;
  ioConnection: any;

  constructor(
    private router: Router,
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.type = localStorage.getItem('type');

    if (!this.username || !this.type)
      this.router.navigate(['']);

      this.initIoConnection();
  }

  goHome() {
    localStorage.removeItem('username');
    this.router.navigate(['']);
  }

  private initIoConnection(): void {
    var thisC = this;
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onBuzz()
      .subscribe((buzzList: Array<Message>) => {
        thisC.buzzList = buzzList;
      });
  }

  public sendMessage(message: string): void {
    var thisC = this;
    
    this.socketService.send({
      username: thisC.username,
      content: message
    });
  }

}
