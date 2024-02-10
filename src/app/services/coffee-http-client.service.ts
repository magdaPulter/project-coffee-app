import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoffeeModel } from '../models/coffee.model';

@Injectable({
  providedIn: 'root',
})
export class CoffeeHttpClientService {
  constructor(private _httpClient: HttpClient) {}

  private readonly URL = 'http://localhost:3000/';

  public get<T>(url: string): Observable<T> {
    return this._httpClient.get<T>(`${this.URL}${url}`);
  }

  public post<T>(url: string, coffee: CoffeeModel): Observable<T> {
    return this._httpClient.post<T>(`${this.URL}${url}`, coffee);
  }

  public getOne<T>(url: string, id: number) {
    return this._httpClient.get<T>(`${this.URL}${url}/${id}`);
  }

  public put<T>(url: string, id: number, coffee: CoffeeModel) {
    return this._httpClient.put<T>(`${this.URL}${url}/${id}`, coffee);
  }

  public delete<T>(url: string, id: number) {
    return this._httpClient.delete<T>(`${this.URL}${url}/${id}`);
  }

  public upload<T>(url: string, formData: FormData) {
    return this._httpClient.post<T>(`${this.URL}${url}`, formData);
  }

  public displayUrl<T>(url: string) {
    return `${this.URL}${url}`;
  }
}
