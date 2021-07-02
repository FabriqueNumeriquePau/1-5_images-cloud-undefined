import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface UploadOutpout {

}

export interface Photos {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class S3ServiceService {

  constructor(private readonly httpClient: HttpClient) { }


  fetchPhotos$(): Observable<Photos[]> {
    return this.httpClient.get<Photos[]>('./assets/photos.json');
  }


  postPhotos$(photos: FormData): Observable<UploadOutpout> {
    const header = new HttpHeaders();
    // header.set('Content-Type', 'application/octet-stream');
    return this.httpClient.post<UploadOutpout>(`${environment.api_url}`, photos);
  }
}
