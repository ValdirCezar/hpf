import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
}
