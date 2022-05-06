import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiRoot } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  public body: any = {
    taskId: '',
    file: '',
  };

  public httpOptions: any = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
  };

  public constructor(private http: HttpClient) {}

  public upload(id: string, file: File): Observable<any> {
    const formData: any = new FormData();
    formData.append('file', file, file.name);
    this.body.taskId = id;
    this.body.file = formData;
    console.log(this.body, file.name);
    return this.http.post(`${apiRoot}/file`, this.body, this.httpOptions);
  }
}
