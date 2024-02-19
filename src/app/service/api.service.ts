import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  login(data: any) {
    const url = environment.apiUrl;
    data.loginRole = 'vendor';
    const headers = this.getHeaders();
    return this.http.post(url + 'user/login', data, { headers: headers });
  }

  getCategory() {
    const url = environment.apiUrl;
    const headers = this.getHeaders();
    return this.http.get(url + 'category', { headers: headers });
  }

  getProductsByVendor() {
    const url = environment.apiUrl;
    const headers = this.getHeadersWithJWT();
    return this.http.post(url + 'product/all-products-by-vendor-id', '', {
      headers: headers,
    });
  }

  getSubCatNBrandsByCatId(id: any) {
    const url = environment.apiUrl;
    const headers = this.getHeaders();
    const data = {
      catId: id,
    };
    return this.http.post(
      url + 'category/all-brands-and-sub-cat-by-cat-id',
      data,
      { headers: headers }
    );
  }

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  getHeadersWithJWT() {
    const token = this.storageService.getToken();

    return new HttpHeaders({
      Authorization: 'Bearer ' + String(token),
    });

    // return headers;
  }
}
