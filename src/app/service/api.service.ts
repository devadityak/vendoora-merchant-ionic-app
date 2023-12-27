import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(data: any) {
    const url = environment.apiUrl;
    const headers = this.getHeaders();
    return this.http.post(url + 'user/login', data, { headers: headers });
  }

  getCategory() {
    const url = environment.apiUrl;
    const headers = this.getHeaders();
    return this.http.get(url + 'category', { headers: headers });
  }

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
