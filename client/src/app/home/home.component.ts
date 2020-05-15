import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public username: string;
  private type: string;

  constructor(private router: Router) { }

  selectPlayer() {
    this.type = 'Player';
  }
  selectHost() {
    this.type = 'Host';
  }

  submit() {
    if (!this.username || !this.type) {
      alert('Set username and type first');
      return;
    }

    localStorage.setItem('username', this.username);
    localStorage.setItem('type', this.type);
    this.router.navigate(['buzz']);
  }

  ngOnInit() {
    if (localStorage.getItem('username'))
      this.router.navigate(['buzz']);
  }

}
