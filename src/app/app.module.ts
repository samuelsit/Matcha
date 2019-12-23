import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { SignComponent } from './sign/sign.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { SignService } from './services/sign.service';
import { LogguedComponent } from './loggued/loggued.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    SignComponent,
    FourOhFourComponent,
    LogguedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    SignService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
