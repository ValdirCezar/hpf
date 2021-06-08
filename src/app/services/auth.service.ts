import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { API_CONFIG } from '../config/api.config';
import { Credenciais } from '../models/credenciais';
import { LocalUser } from '../models/local_user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = API_CONFIG.baseUrl;

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
      token: tok
    }
    this.storage.setLocalUser(user);
  }

  logout() {
    this.storage.setLocalUser(null)
  }

}
