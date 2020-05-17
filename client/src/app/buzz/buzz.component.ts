import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';

import { User, ListItem } from '../types';

import { SocketService } from '../shared/services/socket.service';


@Component({
  selector: 'app-buzz',
  templateUrl: './buzz.component.html',
  styleUrls: ['./buzz.component.scss']
})
export class BuzzComponent implements OnInit {

  public username: string;
  public type: string;

  public users: User[] = [];
  public bookingList: ListItem[] = [];

  private bookingListSubscription: Subscription;
  private usersSubscription: Subscription;

  constructor(
    private router: Router,
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.type = localStorage.getItem('type');

    if (!this.username || !this.type) return this.goHome();

    this.socketService.initConnection(this.username);

    this.bookingListSubscription = this.socketService.bookingList
      .subscribe((data) => this.bookingList = data);
    this.usersSubscription = this.socketService.users
      .subscribe((data) => this.users = data);
  }

  ngOnDestroy() {
    this.bookingListSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }

  public goHome() {
    localStorage.clear();
    this.socketService.closeConnection();
    this.router.navigate(['']);
  }

  public isBoooked() {
    return this.bookingList
      .filter(({ user }) => user === this.username)
      .length > 0;
  }

  public buzzClick() {
    this.socketService.userBooking();
  }

  public resetClick() {
    this.socketService.userResetting()
  }
}
