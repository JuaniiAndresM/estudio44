import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) { }

  getHomeCategories(): Observable<any> {
    return this.http.get('http://192.168.1.20:8080/information/homeCategories');
  }

  getActiveCategories(): Observable<any> {
    return this.http.get('http://192.168.1.20:8080/information/activeCategories');
  }

  getAllCategories(): Observable<any> {
    return this.http.get('http://192.168.1.20:8080/information/categories');
  }
}
