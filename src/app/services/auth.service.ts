import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Credentials } from '../models/user';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly authState$: Observable<User | null> = this.afAuth.authState;

  constructor(private afAuth: AngularFireAuth) { }

  async login({ email, password }: Credentials) {
    const userCredential =
    await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    sessionStorage.setItem('userUID', userCredential.user.uid);
  }

  async register({ email, password }: Credentials) {
    const userCredential =
    await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    sessionStorage.setItem('userUID', userCredential.user.uid);
  }

  logout() {
    sessionStorage.removeItem('userUID');
    return this.afAuth.auth.signOut();
  }

}
