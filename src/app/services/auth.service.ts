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
    private storageService: StorageService
    ) { }

  /**
   * Verifica se o usuário está autênticado
   * @returns boolean
   */
  isAuthenticated(): boolean {
    let user = this.storageService.getLocalUser();
    if (user != null) {
      return this.jwtService.isTokenExpired(user.token.toString()) ? false : true;
    }
    return false;
  }

  /**
   * Realiza a autênticação
   * @param creds : Credenciais
   * @returns Token JWT
   */
  public authenticate(creds: Credenciais) {
    return this.http.post(`${this.BASE_URL}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  }

  /**
   * Se o usuário estiver autênticado este método 
   * irá pegar o token e o email do token passado
   * como parâmetro e irá setar um localUser no 
   * localStorage
   * @param authvalue Token
   */
  successfulLogin(authvalue: String) {
    let user: LocalUser = {
      token: authvalue.substring(7),
      email: this.jwtService.decodeToken(authvalue.substring(7)).sub
    }
    this.storageService.setLocalUser(user);
  }

  /**
   * Realiza o logout do usuário removendo 
   * os valores do localStorage
   */
  logout() {
    this.storageService.setLocalUser(null)
  }

}
