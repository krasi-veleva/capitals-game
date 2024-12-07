import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StatisticComponent } from './statistic/statistic.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'statistic',
    children: [
      { path: '', component: StatisticComponent },
      { path: 'details/:id', component: UserDetailsComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
