import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppareilViewComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { SignComponent } from './sign/sign.component';


const routes: Routes = [
  {path: 'home', component: AppareilViewComponent },
  {path: 'auth', component: AuthComponent},
  {path: 'sign', component: SignComponent},
  {path: '', component: AppareilViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }