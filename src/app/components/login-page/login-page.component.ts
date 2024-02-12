import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterService } from '../../services/register.service';
import { matchPassword } from 'src/app/utils/match-password';

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
    email: new FormControl(null, Validators.email),
    password: new FormControl(null, [Validators.required]),
  });
  readonly registerForm: FormGroup = new FormGroup(
    {
      email: new FormControl(null, Validators.email),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    },
    {
      validators: [matchPassword],
    }
  );
  private _isRegisteredSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  public isRegistered$: Observable<boolean> =
    this._isRegisteredSubject.asObservable();

  constructor(private _registerService: RegisterService) {}

  onRegister(isRegistered: boolean) {
    this._isRegisteredSubject.next(isRegistered);
  }

  onLoginFormSubmitted(loginForm: FormGroup): void {}

  onregisterFormSubmitted(registerForm: FormGroup): void {
    if (registerForm.valid) {
      this._registerService.create({
        email: registerForm.get('email')!.value,
        password: registerForm.get('password')!.value,
        confirmPassword: registerForm.get('confirmPassword')!.value,
      });
    }
  }
}
