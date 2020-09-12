import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  user = this.authService.user;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signup() {
    this.authService.signup(this.email, this.password);
  }

  login() {
    this.authService.login(this.email, this.password);
  }
}
