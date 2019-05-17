import { Component, OnInit } from '@angular/core';
import { Credentials } from '../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  user: Credentials;

  constructor() { }

  ngOnInit() {
  }

  login() {
console.log(this.user);
  }

  signup() {

  }

}
