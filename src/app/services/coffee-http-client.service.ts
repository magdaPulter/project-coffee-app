import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoffeeHttpClientService {
  constructor(private _httpClient: HttpClient) {}

  private readonly URL = 'http://localhost:3000/';

  public get<T>(url: string): Observable<T> {
    return this._httpClient.get<T>(`${this.URL}${url}`);
  }

  public post<T, U>(url: string, postData: U): Observable<T> {
    return this._httpClient.post<T>(`${this.URL}${url}`, postData);
  }

  public put<T>(url: string, id: number, putData: T) {
    return this._httpClient.put<T>(`${this.URL}${url}/${id}`, putData);
  }

  public delete<T>(url: string, id: number) {
    return this._httpClient.delete<T>(`${this.URL}${url}/${id}`);
  }

  public upload<T, U>(url: string, uploaded: U) {
    return this._httpClient.post<T>(`${this.URL}${url}`, uploaded);
  }

  public displayUrl<T>(url: string) {
    return `${this.URL}${url}`;
  }
}
