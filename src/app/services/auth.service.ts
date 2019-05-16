import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  user(): any {
  }

  login(): any {

  }

  register(): any {

  }

  logout(): any {

  }

}
