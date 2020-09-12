import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success', value);
      }).catch(err => {
        console.log('registration failed', err);
    });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success', value);
      }).catch(err => {
      console.log('registration failed', err);
    });
  }

  logout() {
    this.firebaseAuth.signOut().then(_ => console.log('Logged Out'));
  }

  getUID() {
    return this.firebaseAuth.authState;
  }
}
