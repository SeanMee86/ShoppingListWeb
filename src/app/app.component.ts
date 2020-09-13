import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {FirestoreService} from './firestore.service';
import {MatSelectionListChange} from '@angular/material/list';

interface GroceryItem {
  name: string;
  quantity: number;
  gotten: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  user = this.authService.user;
  uid: string;
  groceryList: GroceryItem[] = [];

  constructor(private authService: AuthService, private firestore: FirestoreService) {
  }

  ngOnInit(): void {
    this.authService.getUID().subscribe(res => {
      if (res !== null) {
        this.uid = res.uid;
        this.getGroceryList();
      }
    });
  }

  signOut() {
    this.authService.logout();
  }

  getUsers() {
    this.firestore.getUsers()
      .subscribe(res => {
        res.forEach(doc => {
          console.log(doc.payload.doc.data());
        });
      });
  }

  getGroceryList() {
    this.firestore.getGroceryList(this.uid).subscribe(res => {
      this.groceryList = res.map(doc => doc.payload.doc.data() as GroceryItem);
    });
  }

  onSelectionChange(e: MatSelectionListChange) {
    console.log(e.option.selected);
  }

  getUID() {
    console.log(this.uid);
  }
}
