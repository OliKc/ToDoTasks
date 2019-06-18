import { AuthService } from '../services/auth.service';
import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { Credentials } from '../models/user';
import { Router } from '@angular/router';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
  animations: [
    trigger('slideInDown', [
      transition('void => *', [
        style({transform: 'translateY(-0.5em)', opacity: 0}),
        animate(400)
      ])
    ]),
    trigger('bounceInLeft', [
      transition('void => *', [
        style({transform: 'translateX(-5%)', opacity: 0}),
        animate('400ms 100ms cubic-bezier(0.215, 0.61, 0.355, 1)')
      ])
    ]),
    trigger('bounceInRight', [
      transition('void => *', [
        style({transform: 'translateX(5%)', opacity: 0}),
        animate('400ms 200ms cubic-bezier(0.215, 0.61, 0.355, 1)')
      ])
    ]),
    trigger('slideInUp', [
      transition('void => *', [
        style({transform: 'translateY(0.5em)', opacity: 0}),
        animate('400ms 300ms')
      ])
    ])
  ]
})
export class SignupComponent implements OnInit {

  user: Credentials;
  email: string;
  password: string;

  //labelPosition: string;

  newUser = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    //this.labelPosition = 'login';
  }

  toLoginTransition() {
  }

  login(): void {
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

  signup(): void {
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
