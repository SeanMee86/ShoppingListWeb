import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  userRef = this.firestore.collection('User');

  constructor(
    private firestore: AngularFirestore
    ) {
  }

  getUsers() {
    return this.userRef.snapshotChanges();
  }

  getGroceryList(uid: string) {
    return this.userRef
      .doc(uid)
      .collection('GroceryList')
      .snapshotChanges();
  }

  updateItem(uid: string, itemId: string, gotten: boolean) {
    this.userRef
      .doc(uid)
      .collection('GroceryList')
      .doc(itemId)
      .update({gotten})
      .then(res => {
        console.log(res);
      });
  }
}
