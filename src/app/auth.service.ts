import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
  ) { this.user = firebaseAuth.authState; }

  logout() {
    this.firebaseAuth.signOut().then(_ => {
      this.router.navigate(['/authenticate']);
    });
  }

  getUID() {
    return this.firebaseAuth.authState;
  }
}
