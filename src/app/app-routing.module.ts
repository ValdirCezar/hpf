import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './login/login.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { NavComponent } from './components/template/nav/nav.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: 
    [
      { path: 'home', component: HomeComponent },
      { path: 'tecnicos/create', component: TecnicoCreateComponent }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
