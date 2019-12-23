import { Component, OnInit } from "@angular/core";
import { SignService } from "../services/sign.service";
import * as $ from "jquery";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../validators/matchpass';

@Component({
  selector: "app-sign",
  templateUrl: "./sign.component.html",
  styleUrls: ["./sign.component.scss"]
})
export class SignComponent implements OnInit {

  signForm: FormGroup;
  submitted = false;
  preferenceMale = false;
  preferenceFemale = false;
  myGender = '';

  constructor(private FormBuilder: FormBuilder,
              private SignService: SignService,
              private Router: Router) {}

  ngOnInit() {
    this.initForm();
    $(document).ready(function() {
      $("#submit").click();
      $("#check-sam-1").click(function() {
        $("#getErr").hide();
      });
      $("#check-sam-2").click(function() {
        $("#getErr").hide();
      });
      $("#rad-sam-1").click(function() {
        $("#getErr2").hide();
      });
      $("#rad-sam-2").click(function() {
        $("#getErr2").hide();
      });
      $("#next-1").click(function() {
        if (($("input[name=getGenderMale]:checked").val() !== 'on' && $("input[name=getGenderFemale]:checked").val() !== 'on') || ($("input[name=myGender]:checked").val() === undefined)) {
          if ($("input[name=getGenderMale]:checked").val() !== 'on' && $("input[name=getGenderFemale]:checked").val() !== 'on') {
            $("#getErr").show();
          }
          if ($("input[name=myGender]:checked").val() === undefined) {
            $("#getErr2").show();
          }
          return false;
        }
        else {
          $("#second").fadeIn();
          $("#first").hide();
          $("#progressBar").css("width", "66%");
          $("#progressBar").removeClass("bg-danger");
          $("#progressBar").addClass("bg-warning");
          $("#progressText").html("Étape 2");
          return true;
        }
      });
      $("#prev-2").click(function() {
        $("#second").hide();
        $("#first").fadeIn();
        $("#progressBar").css("width", "33%");
        $("#progressBar").removeClass("bg-warning");
        $("#progressBar").addClass("bg-danger");
        $("#progressText").html("Étape 1");
        return true;
      });
      $("#next-2").click(function() {
        if (
          $("select[name=day]").val() == 0 ||
          $("select[name=month]").val() == 0 ||
          $("select[name=year]").val() == 0
        ) {
          return false;
        } else if (!($("input[name=loca]").val() || "")) {
          return false;
        } else if (!($("input[name=lastname]").val() || "")) {
          return false;
        } else if (!($("input[name=firstname]").val() || "")) {
          return false;
        } else {
          $("#second").hide();
          $("#third").fadeIn();
          $("#progressBar").css("width", "100%");
          $("#progressBar").removeClass("bg-warning");
          $("#progressBar").addClass("bg-success");
          $("#progressText").html("Étape 3");
          return true;
        }
      });
      $("#prev-3").click(function() {
        $("#second").fadeIn();
        $("#third").hide();
        $("#progressBar").css("width", "66%");
        $("#progressBar").removeClass("bg-success");
        $("#progressBar").addClass("bg-warning");
        $("#progressText").html("Étape 2");
        return true;
      });
    });
  }

  initForm() {
    this.signForm = this.FormBuilder.group({
      getGenderMale: false,
      getGenderFemale: false,
      myGender: '',
      dayBirth: ['', Validators.required],
      monthBirth: ['', Validators.required],
      yearBirth: ['', Validators.required],
      loca: ['', Validators.required],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$')]],
      confirmPass: ['', Validators.required]
    }, {
      validator: MustMatch('pass', 'confirmPass')
    });
  }

  get f() { return this.signForm.controls; }

  onSubmitForm() {
    const preference = { "male" : this.preferenceMale, "female" : this.preferenceFemale };

    this.submitted = true;

    if (this.signForm.invalid) {
      return;
    }    
    const formValue = this.signForm.value;
    this.SignService.getUserDetails(preference, this.myGender, formValue['dayBirth'], formValue['monthBirth'], formValue['yearBirth'], formValue['loca'], formValue['lastname'], formValue['firstname'], formValue['email'], formValue['pass']);
    this.Router.navigate(['/'])
  }

  checkValue(gender: string){
    if (gender === 'male') {
      if (this.preferenceMale === false) {
        this.preferenceMale = true;
      }
      else {
        this.preferenceMale = false;
      }
    }
    else {
      if (this.preferenceFemale === false) {
        this.preferenceFemale = true;
      }
      else {
        this.preferenceFemale = false;
      }
    }
  }

  radioValue(gender: string){
    if (gender === 'male') {
      this.myGender = 'male';
    }
    else {
      this.myGender = 'female';
    }
  }
}