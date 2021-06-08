import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Credenciais } from '../models/credenciais';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public authenticate(creds: Credenciais) {
    return this.http.post(`${this.BASE_URL}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  }
}
