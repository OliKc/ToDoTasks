import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Credentials } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  user: Credentials;
  email: string;
  password: string;

  labelPosition: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.labelPosition = 'login';
  }

  login() {
    this.user = ({ email: this.email, password: this.password });
    this.auth.login(this.user)
    .then(() => this.router.navigate(['/dashboard']))
    .catch(err => {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        alert('Wrong password or invalid user');

      } else if (err.code === 'auth/invalid-email') {
        alert(err.message);

      } else if (err.code === 'auth/user-disabled') {
        alert(err.message);

      } else {
        alert(err.message);
      }
    });
  }

  signup() {
    this.user = ({ email: this.email, password: this.password });
    this.auth.register(this.user)
      .then(() => this.router.navigate(['/dashboard']))
      .catch(err => {
        if (err.code === 'auth/invalid-email') {
          alert(err.message);

        } else if (err.code === 'auth/email-already-in-use') {
          alert(err.message);

        } else if (err.code === 'auth/weak-password') {
          alert(err.message);

        } else {
          alert(err.message);
        }
      });
  }

}
