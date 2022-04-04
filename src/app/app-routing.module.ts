import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { ContentComponent } from './components/content/content.component';
import { DetailsComponent } from './components/details/details.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NotFoundComponent } from './components/404/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { LoggedGuard } from './guards/logged.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [

  {path:"home",component:ContentComponent, canActivate:[LoginGuard]},
  {path:"product/:id",component:DetailsComponent, canActivate:[LoginGuard]},
  {path:"login",component:LoginPageComponent,canActivate:[LoggedGuard]},
  {path:"register",component:RegisterPageComponent,canActivate:[LoggedGuard]},
  {path:"cart",component:CartComponent, canActivate:[LoginGuard]},

  {path:"profile",component:ProfileComponent, canActivate:[LoginGuard]},
  {path:"admin",loadChildren:()=>import('./components/admin-panel/admin.module').then(m=>m.AdminModule), canActivate:[IsAdminGuard]},
  {path:'', component:ContentComponent, pathMatch:'full', canActivate:[LoginGuard]},
  {path:'**',component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
