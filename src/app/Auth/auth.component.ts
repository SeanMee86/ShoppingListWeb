import { Component } from '@angular/core';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private router: Router, private firestore: AngularFirestore){}

  onSuccessfulLogin(e: FirebaseUISignInSuccessWithAuthResult) {
    this.firestore.collection('Users').doc(e.authResult.user.uid).snapshotChanges().subscribe(user => {
      if (!user.payload.exists) {
        this.firestore.collection('Users').doc(e.authResult.user.uid).set({email: e.authResult.user.email});
      }
    }).unsubscribe();
    this.router.navigate(['/']);
  }
}
