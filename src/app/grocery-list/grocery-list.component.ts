import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { GroceryItem } from '../models/GroceryItem.model';
import { FirestoreService } from '../firestore.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

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

  constructor(private firestore: FirestoreService, private authService: AuthService) { }

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
          this.groceryList = res.map(doc => doc.payload.doc.data() as GroceryItem);
        });
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
    this.groceryListSubscription.unsubscribe();
  }
}
