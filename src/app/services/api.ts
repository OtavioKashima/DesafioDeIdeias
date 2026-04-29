import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {
  // Endereço do seu backend Node.js
  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) { }

  // 1. Busca operador pelo crachá
  buscarColaborador(cracha: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/colaborador/${cracha}`);
  }

  // 2. Busca máquina pelo código
  buscarEquipamento(codigo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/equipamento/${codigo}`);
  }

  // 3. Salva o relatório no banco
  salvarRelatorio(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/relatorio`, dados);
  }
}