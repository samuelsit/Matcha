import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  submitted = false;

  constructor(private FormBuilder: FormBuilder,
    private AuthService: AuthService,
    private Router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.authForm = this.FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$')]]
    });
  }
  
  get f() { return this.authForm.controls; }

  onSubmitForm() {
    this.submitted = true;

    if (this.authForm.invalid) {
      return;
    }
    const formValue = this.authForm.value;
    this.AuthService.getUserDetails(formValue['email'], formValue['password']);
    this.Router.navigate(['accueil'])
  }

}
