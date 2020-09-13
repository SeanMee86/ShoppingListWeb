import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email: string;
  password: string;

  constructor(private authService: AuthService) { }

  signup() {
    this.authService.signup(this.email, this.password);
  }

  login() {
    this.authService.login(this.email, this.password);
  }
}
