import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileModel } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  

  constructor(private _httpClient: HttpClient) { }


  upload(file: FormData): Observable<void> {
    return this._httpClient.post<void> ('http://localhost:3000/files', file)
  }
  
  getFile(): Observable<FileModel[]> {
    return this._httpClient.get<FileModel[]>('http://localhost:3000/files')
  } 

  getOneImage(imageId: string): Observable<FileModel> {
    return this._httpClient.get<FileModel>(`http://localhost:3000/files/${imageId}`)
  }
}
