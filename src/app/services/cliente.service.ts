import { Cliente } from './../models/cliente';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  findById(id: any):Observable<Cliente> {
    return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(API_CONFIG.baseUrl + '/clientes');
  }

  create(tecnico: Cliente): Observable<any> {
    return this.http.post<any>(`${API_CONFIG.baseUrl}/clientes`, tecnico);
  }

  update(tecnico: Cliente):Observable<Cliente> {
    return this.http.put<Cliente>(`${API_CONFIG.baseUrl}/clientes/${tecnico.id}`, tecnico);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }

}
