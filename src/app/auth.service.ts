import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) { this.user = firebaseAuth.authState; }

  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(_ => {
        this.getUID().subscribe(res => {
          this.firestore
            .collection('User')
            .doc(res.uid)
            .set({email}).then(() => {});
        });
        this.router.navigate(['']).then(() => {});
      }).catch(err => {
        console.error('registration failed', err);
    });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(_ => {
        this.router.navigate(['']);
      }).catch(err => {
      console.error('registration failed', err);
    });
  }

  logout() {
    this.firebaseAuth.signOut().then(_ => {
      this.router.navigate(['/authenticate']);
    });
  }

  getUID() {
    return this.firebaseAuth.authState;
  }
}
