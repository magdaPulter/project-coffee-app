import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoffeeModel } from 'src/app/models/coffee.model';
import { CoffeeHttpClientService } from './coffee-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class CoffeeService {
  constructor(private _coffeeHttpClientService: CoffeeHttpClientService) {}

  getAll(): Observable<CoffeeModel[]> {
    return this._coffeeHttpClientService.get<CoffeeModel[]>('coffee');
  }

  create(coffee: CoffeeModel): Observable<void> {
    return this._coffeeHttpClientService.post<void>('coffee', coffee);
  }

  getOne(id: number): Observable<CoffeeModel> {
    return this._coffeeHttpClientService.getOne<CoffeeModel>('coffee', id);
  }

  update(id: number, coffee: CoffeeModel): Observable<CoffeeModel> {
    return this._coffeeHttpClientService.put<CoffeeModel>('coffee', id, coffee);
  }

  delete(id: number): Observable<CoffeeModel> {
    return this._coffeeHttpClientService.delete<CoffeeModel>('coffee', id);
  }
}
