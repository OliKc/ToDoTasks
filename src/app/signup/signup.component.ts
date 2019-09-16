import { AuthService } from '../services/auth.service';
import { Component, OnInit, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { Credentials } from '../models/user';
import { Router } from '@angular/router';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';

import {ErrorStateMatcher} from '@angular/material/core';


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
export class SignupComponent implements OnInit, AfterViewInit {

  @ViewChildren('formField', {read: ElementRef}) formFields: QueryList<ElementRef>;

  signupForm: FormGroup;
  newUser = true;

  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  ngAfterViewInit() {
    // overriding material dynamic elements styles
    let wrapper: any;
    let infix: any;
    this.formFields.forEach(formField => {
      wrapper = formField.nativeElement.querySelector('.mat-form-field-wrapper');
      infix = formField.nativeElement.querySelector('.mat-form-field-infix');

      wrapper.style.padding = 0;
      infix.style.cssText = 'padding: 0.5em 0 0.5em 0; border-top: 0.3em solid transparent';
    });
  }

  onSubmit(form: FormGroup) {
    if (this.newUser) {
      this.signup(form.value as Credentials);
    } else {
      this.login(form.value as Credentials);
    }
  }

  login(userCredentials: Credentials): void {
    this.auth.login(userCredentials)
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

  signup(userCredentials: Credentials): void {
    this.auth.register(userCredentials)
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
