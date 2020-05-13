import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public username: string;

  constructor() { }

  submit() {
    console.log(this.username);
  }

  ngOnInit() {
  }

}
