import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { GroceryItem } from '../models/GroceryItem.model';
import { FirestoreService } from '../firestore.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AddItemDialogComponent} from '../add-item-dialog/add-item-dialog.component';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit, OnDestroy {

  groceryList: GroceryItem[];
  uid: string;
  authServiceSubscription: Subscription;
  groceryListSubscription: Subscription;

  constructor(
    private firestore: FirestoreService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.authServiceSubscription =
      this.authService
        .getUID()
        .subscribe(res => {
          if (res !== null) {
            this.uid = res.uid;
            this.getGroceryList();
          }
      });
  }

  getGroceryList() {
    this.groceryListSubscription =
      this.firestore
        .getGroceryList(this.uid)
        .subscribe(res => {
          this.groceryList = res.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            } as GroceryItem;
          });
        });
  }

  onChecked(e: MatCheckboxChange) {
    this.firestore
      .updateItem(this.uid, e.source.value, e.checked);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {panelClass: 'add-item-panel'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog Result: ${result}`);
    });
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
    this.groceryListSubscription.unsubscribe();
  }
}
