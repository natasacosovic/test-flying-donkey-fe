import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FileMetadata } from './fileMetadata';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  getFiles(): Observable<FileMetadata[]> {
    return this.http.get<FileMetadata[]>(environment.backendUrl)
      .pipe(
        tap((data) => console.log('files = ', data)),
        catchError(this.handleError<FileMetadata[]>('get files'))
      );
  }

  getFileTypes(): Observable<string[]> {
    return this.http.get<string[]>(environment.backendUrl + "/types")
      .pipe(
        tap((data) => console.log('file types = ', data)),
        catchError(this.handleError<string[]>('get files type'))
      );
  }
  getFileSize(): Observable<number> {
    return this.http.get<number>(environment.backendUrl + "/size")
      .pipe(
        tap((data)=> console.log('file size = ', data)),
        catchError(this.handleError<number>('get file size'))
      );
  }

  uploadFile(data: FormData): Observable<FormData> {
    return this.http.post<any>(environment.backendUrl, data).pipe(
      tap(_ => console.log(`file uploaded`)),
      catchError(this.handleError<FormData>('file upload'))
    );
  }

 private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error.error); 
    return of(result as T);
  };
}
}

