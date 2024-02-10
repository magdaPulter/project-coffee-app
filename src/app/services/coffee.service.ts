import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CoffeeModel } from 'src/app/models/coffee.model';
import { CoffeeHttpClientService } from './coffee-http-client.service';
import { CoffeeWithUrlQueryModel } from '../querymodels/coffeeWithUrl.querymodel';

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

  displayUrl(image: string): string {
    return this._coffeeHttpClientService.displayUrl(`files/${image}`);
  }

  getAllWithUrl(): Observable<CoffeeWithUrlQueryModel[]> {
    return this.getAll().pipe(
      map((coffees) => {
        return coffees.map((coffee) => {
          const imageUrl = this.displayUrl(coffee.image);
          return { ...coffee, imageUrl };
        });
      })
    );
  }

  getOneWithUrl(id: number): Observable<CoffeeWithUrlQueryModel> {
    return this.getOne(id).pipe(
      map((coffee) => {
        const imageUrl = this.displayUrl(coffee.image);
        return { ...coffee, imageUrl };
      })
    );
  }
}
