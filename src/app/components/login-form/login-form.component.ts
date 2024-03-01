import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Input() loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.email),
    password: new FormControl(null, [Validators.required]),
  });

  @Output() loginFormSubmit: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() registered: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _isvisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  public is_isvisible$: Observable<boolean> = this._isvisible.asObservable();

  private _isAuthentycatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  public isAuthentycated$: Observable<boolean> =
    this._isAuthentycatedSubject.asObservable();

  viewPassword() {
    this._isvisible.next(!this._isvisible.getValue());
  }

  onRegister(isRegistered: boolean) {
    this.registered.emit(isRegistered);
  }

  onLoginFormSubmitted(loginForm: FormGroup) {
    const loginEmail = loginForm.get('email')!.value;
    const loginPassword = loginForm.get('password')!.value;

    localStorage.setItem('email', loginEmail);
    localStorage.setItem('password', loginPassword);

    this._isAuthentycatedSubject.next(false);
    this.loginFormSubmit.emit();
  }
}
