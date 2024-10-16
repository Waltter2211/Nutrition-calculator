import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { LOGIN_USER } from '../../mutations/loginUserMutation';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private readonly apollo: Apollo, private router: Router) {}

  isError = false;
  errorText = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  onLoginUser() {
    if (this.loginForm.valid) {
      this.apollo
        .mutate({
          mutation: LOGIN_USER,
          variables: {
            input: {
              email: this.loginForm.value.email,
              password: this.loginForm.value.password,
            },
          },
        })
        .subscribe({
          next: ({ data }: any) => {
            localStorage.setItem('token', data.loginUser.token);
            this.router.navigateByUrl('/home');
          },
          error: (error) => {
            this.isError = true;
            this.errorText = error;
          },
        });
    }
  }
}
