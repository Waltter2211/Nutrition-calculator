import { Routes } from '@angular/router';
import { LandingComponent } from './common/landing/landing.component';
import { RegisterComponent } from './common/register/register.component';
import { LoginComponent } from './common/login/login.component';
import { HomeComponent } from './common/home/home.component';
import { NotfoundComponent } from './common/notfound/notfound.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
