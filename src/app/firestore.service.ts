import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
    ) {
  }

  getUsers() {
    return this.firestore.collection('User').snapshotChanges();
  }

  getGroceryList(uid: string) {
    return this.firestore.collection('User').doc(uid).collection('GroceryList').snapshotChanges();
  }
}
