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
  buzzList: Array<Message> = null;
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

    this.ioConnection = this.socketService.onBuzz()
      .subscribe((buzzList: Array<Message>) => {
        this.buzzList = buzzList;
      });
  }

  public sendMessage(): void {
    let message: string = 'buzz';
    this.socketService.send({
      username: this.username,
      content: message
    });
  }

}
