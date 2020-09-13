import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  user = this.authService.user;

  constructor(
    private authService: AuthService,
  ){}

  signOut() {
    this.authService.logout();
  }
}
