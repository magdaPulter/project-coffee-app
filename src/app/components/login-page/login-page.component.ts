import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginButtonsComponent } from '../login-buttons/login-buttons.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    LoginButtonsComponent,
  ],
})
export class LoginPageComponent {
  readonly loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  readonly registerForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
  });

  readonly loginButtons: string[] = ['LogIn', 'Register'];

  private _loginButtonSelectedSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('LogIn');
  public loginButtonSelected$: Observable<string> =
    this._loginButtonSelectedSubject.asObservable();

  onButtonSelected(button: string) {
    this._loginButtonSelectedSubject.next(button);
  }

  onLoginFormSubmitted(loginForm: FormGroup): void {}
  onregisterFormSubmitted(loginForm: FormGroup): void {}
}
