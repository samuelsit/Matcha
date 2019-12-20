import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $(document).ready(function() {

          $("#next-1").click(function(e) {
              e.preventDefault();
              $("#GenderError").html('');
              $("#MyGenderError").html('');
              if (!($('input[name=getg]:checked').val() || '')) {
                  $("#GenderError").html('* Faites un choix.');
                  return false;
              }
              else if (!($('input[name=myg]:checked').val() || '')) {
                  $("#MyGenderError").html('* Faites un choix.');
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

          $("#next-2").click(function(e) {
              e.preventDefault();
              $("#BirthError").html('');
              $("#LocaError").html('');
              if ($('select[name=day]').val() == 0 || $('select[name=month]').val() == 0 || $('select[name=year]').val() == 0) {
                  $("#BirthError").html('* Faites un choix.');
                  return false;
              }
              else if ($('select[name=year]').val() >= 2002) {
                  $("#BirthError").html('* Il faut etre majeur.');
                  return false;
              }
              else if (!($('input[name=loca]').val() || '')) {
                  $("input[name=loca]").addClass("is-invalid");
                  $("#LocaError").html('* Faites un choix.');
                  return false;
              }
              else {
                  $("input[name=loca]").removeClass("is-invalid");
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

          $("#submit").click(function(e) {
            e.preventDefault();
            $("#lastnameError").html('');
            $("#firstnameError").html('');
            $("#emailError").html('');
            if ($("#lastname").val() == '') {
              $("#lastname").addClass("is-invalid");
              $("#lastnameError").html('* Le nom requis.');
              return false;
            }
            else if ($("#lastname").val().length < 2) {
              $("#lastname").addClass("is-invalid");
              $("#lastnameError").html('* Votre nom doit contenir plus de 1 characteres.');
              return false;
            }
            else if ($("#firstname").val() == '') {
              $("#firstname").addClass("is-invalid");
              $("#firstnameError").html('* Le prenom requis.');
              return false;
            }
            else if ($("#firstname").val().length < 2) {
              $("#firstname").addClass("is-invalid");
              $("#firstnameError").html('* Votre prenom doit contenir plus de 1 characteres.');
              return false;
            }
            else if (!isNaN($("#lastname").val())) {
              $("#lastname").addClass("is-invalid");
              $("#lastnameError").html('* Les nombres ne sont pas autorisés.');
              return false;
            }
            else if (!isNaN($("#firstname").val())) {
              $("#firstname").addClass("is-invalid");
              $("#firstnameError").html('* Les nombres ne sont pas autorisés.');
              return false;
            }
            else if ($("#email").val() == '') {
              $("#email").addClass("is-invalid");
              $("#emailError").html('* L\'email est requis.');
              return false;
            }
            else if (!validateEmail($("#email").val())) {
              $("#email").addClass("is-invalid");
              $("#emailError").html('* L\'email n\'est pas valide.');
              return false;
            }
            else if ($("#passwd").val() == '') {
              $("#passwd").addClass("is-invalid");
              $("#passwdError").html('* Le mot de passe est requis.');
              return false;
            }
            else if ($("#passwd").val().length < 8) {
              $("#passwd").addClass("is-invalid");
              $("#passwdError").html('* Le mot de passe doit faire au moins 8 caracteres.');
              return false;
            }
            else {
              var number = 0;
              var upper = 0;
              for (let i = 0; i < $("#passwd").val().length; i++) {
                  var letter = $("#passwd").val()[i];
                  if (!isNaN($("#passwd").val()[i]))
                      number = number + 1;
                  if ($("#passwd").val()[i] == letter.toUpperCase())
                      upper = upper + 1;
              }
              if (number >= 1 && upper >= 1) {
                  $("#passwd").removeClass("is-invalid");
                  $("#email").removeClass("is-invalid");
                  $("#firstname").removeClass("is-invalid");
                  $("#lastname").removeClass("is-invalid");
                  return true;
              }
              else if (upper < 1) {
                  $("#passwdError").html('* Le mot de passe doit contenir au moins 1 lettre majuscule.');
                  return false;
              }
              else if (number < 1) {
                  $("#passwdError").html('* Le mot de passe doit contenir au moins 1 chiffre.');
                  return false;
              }
            }
            function validateEmail($email) {
              var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
              return emailReg.test($email);
            };
          });

      });
  }

}
