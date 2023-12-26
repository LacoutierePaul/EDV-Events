import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  registerForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group(
      {
        lastName: ['', Validators.required],
        firstName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        school: ['', Validators.required]
      }
    )
  }



}
