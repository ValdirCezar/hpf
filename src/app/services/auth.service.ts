import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_CONFIG } from '../config/api.config';
import { Credenciais } from '../models/credenciais';
import { LocalUser } from '../models/local_user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = API_CONFIG.baseUrl;

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private storage: StorageService) { }

  public authenticate(creds: Credenciais) {
    return this.http.post(`${this.BASE_URL}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  }

  successfulLogin(authvalue: String) {
    let tok = authvalue.substring(7);
    let user : LocalUser = {
      token: tok,
      email: this.jwtService.decodeToken(tok).sub
    }
    this.storage.setLocalUser(user);
  }

  logout() {
    this.storage.setLocalUser(null)
  }

}
