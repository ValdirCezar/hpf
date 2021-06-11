import { Chamado } from './../models/chamado';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(private http: HttpClient) { }

  public findAll():Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamados`);
  }

  create(chamado: Chamado):Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/chamados`, chamado);
  }
}
