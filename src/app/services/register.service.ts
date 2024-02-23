import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoffeeHttpClientService } from './coffee-http-client.service';
import { SignUpModel } from '../models/sign-up.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private _coffeeHttpClientService: CoffeeHttpClientService) {}

  create(signUp: SignUpModel): Observable<void> {
    return this._coffeeHttpClientService.post<void, SignUpModel>(
      'register',
      signUp
    );
  }

  getAll(): Observable<SignUpModel[]> {
    return this._coffeeHttpClientService.get<SignUpModel[]>('register');
  }

  isAuthenticated(): Observable<boolean> {
    return this.getAll().pipe(
      map((registerValues) => {
        return registerValues.some((value) => {
          return (
            localStorage.getItem('email') === value.email &&
            localStorage.getItem('password') === value.password
          );
        });
      })
    );
  }
}
