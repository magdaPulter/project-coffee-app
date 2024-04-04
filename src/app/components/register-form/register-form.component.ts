import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { matchPassword } from 'src/app/utils/match-password';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignUpModel } from 'src/app/models/sign-up.model';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  @Input() registerForm: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    },
    {
      validators: [matchPassword],
    }
  );

  @Output() registerFormSubmitted: EventEmitter<SignUpModel> =
    new EventEmitter<SignUpModel>();
  @Output() registered: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _isvisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  public is_isvisible$: Observable<boolean> = this._isvisible.asObservable();

  viewPassword() {
    this._isvisible.next(!this._isvisible.getValue());
  }

  onRegister(isRegistered: boolean) {
    this.registered.emit(isRegistered);
  }

  onregisterFormSubmitted(registerForm: FormGroup) {
    if (registerForm.valid) {
      this.registerFormSubmitted.emit({
        email: registerForm.get('email')!.value,
        password: registerForm.get('password')!.value,
        confirmPassword: registerForm.get('confirmPassword')!.value,
      });
    }
  }
}
