import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileModel } from '../models/file.model';
import { CoffeeHttpClientService } from './coffee-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private _coffeeHttpClientService: CoffeeHttpClientService) {}

  upload(event: Event): Observable<FileModel> {
    const files = (event.target as HTMLInputElement).files as FileList;
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this._coffeeHttpClientService.upload('files', formData);
  }
}
