import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { NotFoundComponent } from './components/404/not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DetailsComponent } from './components/details/details.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { SearchPipe } from './pipes/search.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplashComponent } from './components/splash/splash.component';
import { NgChartsModule } from 'ng2-charts';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ListViewCardComponent } from './components/list-view-card/list-view-card.component';
import { GridViewCardComponent } from './components/grid-view-card/grid-view-card.component';
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    ContentComponent,
    NotFoundComponent,
    CartComponent,
    ProfileComponent,
    DetailsComponent,
    LoginPageComponent,
    RegisterPageComponent,
    SearchPipe,
    SplashComponent,
    ListViewCardComponent,
    GridViewCardComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    NoopAnimationsModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    TranslocoRootModule,
    MatSelectModule
  ],
  providers: [],

  bootstrap: [AppComponent],
})
export class AppModule {}
