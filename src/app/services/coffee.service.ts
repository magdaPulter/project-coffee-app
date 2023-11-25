import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoffeeModel } from '../models/coffee.model';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {


  constructor(private _httpClient: HttpClient) { }

  getAll(): Observable<CoffeeModel[]> {
    return this._httpClient.get<CoffeeModel[]>('http://localhost:3000/coffee')
  }

  create(coffee: CoffeeModel): Observable<void> {
    return this._httpClient.post<void>('http://localhost:3000/coffee',coffee);
  }
}
