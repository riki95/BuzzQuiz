import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


const DEFAULT = 'Player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public username: string;
  public usernameHelper: string;
  public typeHelper: string;
  public type: string = DEFAULT;

  constructor(private router: Router) { }

  selectPlayer() {
    this.type = 'Player';
  }
  selectHost() {
    this.type = 'Host';
  }

  submit() {
    this.usernameHelper = '';
    if (!this.username) {
      this.usernameHelper = 'An username is required';
      return;
    }

    localStorage.setItem('username', this.username);
    localStorage.setItem('type', this.type);
    this.router.navigate(['buzz']);
  }

  ngOnInit() {
    if (localStorage.getItem('username')) {
      this.router.navigate(['buzz']);
    }
  }

}
