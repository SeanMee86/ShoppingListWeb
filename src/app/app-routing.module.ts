import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from './Auth/auth.component';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo
} from '@angular/fire/auth-guard';
import { GroceryListComponent } from './grocery-list/grocery-list.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['authenticate']);
const redirectLoggedInToMainPage = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: 'authenticate',
    component: AuthComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToMainPage }
  },
  {
    path: '',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    pathMatch: 'full',
    component: GroceryListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
