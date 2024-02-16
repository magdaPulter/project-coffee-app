import { Injectable } from '@angular/core';
import { CoffeeHttpClientService } from './coffee-http-client.service';
import { Observable } from 'rxjs';
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
}
