import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
  key = environment.jwtKey;

  setToken(token: any) {
    try {
      localStorage.setItem(this.key, token);
    } catch (err: any) {
      // console.error('set jwt - ', err.message);
    }
  }

  getToken() {
    try {
      return localStorage.getItem(String(this.key));
    } catch (err: any) {
      return null;
    }
  }

  removeToken() {
    try {
      localStorage.removeItem(this.key);
    } catch (err: any) {
      console.error('remove jwt - ', err.message);
    }
  }
}
