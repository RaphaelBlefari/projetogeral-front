import { Produto } from './../model/produto';
import { URL_API } from './../../URL_API';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mensagem } from '../../shared/model/Mensagem';

@Injectable()
export class CatalogoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {
  }

  retornaProdutos(search?: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${URL_API}/catalogo/produtos`, this.httpOptions);
  }

  inseriProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${URL_API}/catalogo/produto`, produto, this.httpOptions);
  }

  deletaProduto(produto: Produto): Observable<Mensagem> {
    return this.http.delete<Mensagem>(`${URL_API}/catalogo/produto/${produto.produtoId}`, this.httpOptions);
  }

  alteraProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${URL_API}/catalogo/produto`, produto, this.httpOptions);
  }
}
