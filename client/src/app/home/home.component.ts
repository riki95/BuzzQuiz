import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public username: string;

  constructor(private router: Router) { }

  submit() {
    localStorage.setItem('username', this.username);
    this.router.navigate(['buzz']);
  }

  ngOnInit() {
    if (localStorage.getItem('username'))
      this.router.navigate(['buzz']);
  }

}
