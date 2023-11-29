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

  getOne(id: number): Observable<CoffeeModel> {
    return this._httpClient.get<CoffeeModel>(`http://localhost:3000/coffee/${id}`)
  }

  update(id: number, coffee: CoffeeModel): Observable<CoffeeModel> {
    return this._httpClient.put<CoffeeModel>(`http://localhost:3000/coffee/${id}`,coffee)
  }

  delete(id: number): Observable<CoffeeModel> {
    return this._httpClient.delete<CoffeeModel>(`http://localhost:3000/coffee/${id}`)
  }
}
