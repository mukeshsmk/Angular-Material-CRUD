import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  tableRefresh = new EventEmitter<any>();

  baseURL = "http://localhost:3000/student";
  data: any;

  students: any;
  getUser: any;
  constructor(private httpClient: HttpClient) {
  }


  getAllStudents() {
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const httpParams = new HttpParams();
    return this.httpClient.get<any>(this.baseURL, {
      headers: httpHeaders, params: httpParams,
      responseType: 'json',
    });
  }

  addStudentData(postBody: any) {
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.httpClient.post<any>(this.baseURL, postBody, { headers: httpHeaders, responseType: 'json' })
      .pipe(map(data => {
        return data;
      }));
  }

  // update alarm config
  deleteStudent(id: any) {
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.httpClient.delete<any>(this.baseURL + '/' + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  getByIdStudent(id: any) {
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.httpClient.get<any>(this.baseURL + '/' + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  updateStudentData(postBody: any, id: any) {
    console.log("postBody", postBody)
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.httpClient.put<any>(this.baseURL + '/' + id, postBody, { headers: httpHeaders, responseType: 'json' })
      .pipe(map(data => {
        return data;
      }));
  }




}