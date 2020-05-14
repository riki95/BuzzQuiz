import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-buzz',
  templateUrl: './buzz.component.html',
  styleUrls: ['./buzz.component.scss']
})
export class BuzzComponent implements OnInit {

  public username: string;

  constructor(private router: Router) { }

  reset() {
    
  }

  ngOnInit() {
    this.username = localStorage.getItem('username');

    if (!this.username)
      this.router.navigate(['']);
  }

}
