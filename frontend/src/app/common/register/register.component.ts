import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { REGISTER_USER } from '../../mutations/registerUserMutation';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private readonly apollo: Apollo,
    private router: Router,
  ) {}

  isError = false;
  errorText = '';

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  onRegisterUser() {
    if (this.registerForm.valid) {
      this.apollo
        .mutate({
          mutation: REGISTER_USER,
          variables: {
            input: {
              username: this.registerForm.value.username,
              email: this.registerForm.value.email,
              password: this.registerForm.value.password,
            },
          },
        })
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/');
          },
          error: (error) => {
            this.isError = true;
            this.errorText = error;
          },
        });
    }
  }
}
