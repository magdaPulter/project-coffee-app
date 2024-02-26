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
import { BehaviorSubject, Observable, map, shareReplay, tap } from 'rxjs';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
    FontAwesomeModule,
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

  private _isvisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  public is_isvisible$: Observable<boolean> = this._isvisible.asObservable();

  viewPassword() {
    this._isvisible.next(!this._isvisible.getValue());
  }

  private _isRegisteredSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  public isRegistered$: Observable<boolean> =
    this._isRegisteredSubject.asObservable();

  private _isAuthentycatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  public isAuthentycated$: Observable<boolean> =
    this._isAuthentycatedSubject.asObservable();

  constructor(
    private _registerService: RegisterService,
    private _router: Router
  ) {}

  onRegister(isRegistered: boolean) {
    this._isRegisteredSubject.next(isRegistered);
  }

  onLoginFormSubmitted(loginForm: FormGroup): void {
    const loginEmail = loginForm.get('email')!.value;
    const loginPassword = loginForm.get('password')!.value;

    localStorage.setItem('email', loginEmail);
    localStorage.setItem('password', loginPassword);

    this._registerService
      .isAuthenticated()
      .pipe(
        map((isAuthenticated) => {
          if (isAuthenticated) {
            this._router.navigate(['/']);
          } else {
            console.log('nottt');
            this._isAuthentycatedSubject.next(false);
          }
        })
      )
      .subscribe();
  }

  onregisterFormSubmitted(registerForm: FormGroup): void {
    if (registerForm.valid) {
      this._registerService
        .create({
          email: registerForm.get('email')!.value,
          password: registerForm.get('password')!.value,
          confirmPassword: registerForm.get('confirmPassword')!.value,
        })
        .subscribe();
      this._router.navigate(['/']);
    }
  }
}
