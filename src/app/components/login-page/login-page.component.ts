import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BehaviorSubject, Observable, map, shareReplay, tap } from 'rxjs';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { SignUpModel } from 'src/app/models/sign-up.model';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FontAwesomeModule,
    LoginFormComponent,
    RegisterFormComponent,
  ],
})
export class LoginPageComponent {
  private _isRegisteredSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  public isRegistered$: Observable<boolean> =
    this._isRegisteredSubject.asObservable();

  constructor(
    private _registerService: RegisterService,
    private _router: Router
  ) {}

  onRegister(isRegistered: boolean) {
    this._isRegisteredSubject.next(isRegistered);
  }

  loginFormHandeled(): void {
    this._registerService
      .isAuthenticated()
      .pipe(
        map((isAuthenticated) => {
          if (isAuthenticated) {
            this._router.navigate(['/home']);
          }
        })
      )
      .subscribe();
  }

  registerFormHandled(formRegistered: SignUpModel) {
    this._registerService.create(formRegistered).subscribe();
    this._router.navigate(['/home']);
  }
}
