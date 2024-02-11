import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
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
  private _isRegisteredSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  public isRegistered$: Observable<boolean> =
    this._isRegisteredSubject.asObservable();

  onSignUp(isRegistered: boolean) {
    this._isRegisteredSubject.next(isRegistered);
  }

  onLoginFormSubmitted(loginForm: FormGroup): void {}
  onregisterFormSubmitted(loginForm: FormGroup): void {}
}
