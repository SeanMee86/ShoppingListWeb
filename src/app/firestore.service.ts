import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {GroceryItem} from './models/GroceryItem.model';
import {MatDialogRef} from '@angular/material/dialog';
import {AddItemDialogComponent} from './add-item-dialog/add-item-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  userRef = this.firestore.collection('Users');

  constructor(
    private firestore: AngularFirestore
    ) {
  }

  getGroceryList(uid: string) {
    return this.userRef
      .doc(uid)
      .collection('GroceryList')
      .snapshotChanges();
  }

  addItem(uid: string, item: GroceryItem, dialog: MatDialogRef<AddItemDialogComponent>) {
    this.userRef
      .doc(uid)
      .collection('GroceryList')
      .add(item)
      .then(() => {
        dialog.close();
      });
  }

  updateItem(uid: string, itemId: string, gotten: boolean) {
    this.userRef
      .doc(uid)
      .collection('GroceryList')
      .doc(itemId)
      .update({gotten})
      .then(() => {});
  }
}
