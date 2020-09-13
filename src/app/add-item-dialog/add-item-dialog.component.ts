import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../firestore.service';
import {AuthService} from '../auth.service';
import {GroceryItem} from '../models/GroceryItem.model';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css']
})
export class AddItemDialogComponent implements OnInit{

  name: string;
  quantity: number;
  uid: string;
  item: GroceryItem = {gotten: false, name: '', quantity: 1};

  constructor(
    private firestore: FirestoreService,
    private fbAuth: AuthService,
    private dialogRef: MatDialogRef<AddItemDialogComponent>
  ) { }

  ngOnInit(): void {
    this.fbAuth.getUID().subscribe(user => {
      this.uid = user.uid;
    });
  }

  onAddItem() {
    this.item.gotten = false;
    this.item.name = this.name;
    if (this.quantity) {
      this.item.quantity = this.quantity;

    }
    if (this.item.name === '') {
      alert('Please enter a name');
      return;
    }
    this.firestore.addItem(this.uid, this.item, this.dialogRef);
  }
}
