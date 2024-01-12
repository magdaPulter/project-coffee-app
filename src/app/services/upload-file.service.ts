import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileModel } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  
  constructor(private _httpClient: HttpClient) { }
  
  upload(event: Event): Observable<FileModel>{
      const files = (event.target as HTMLInputElement).files as FileList
      const file = files[0]
      const formData = new FormData()
      formData.append('file', file, file.name)
      
      return this._httpClient.post<FileModel> ('http://localhost:3000/files', formData)
  }
}
