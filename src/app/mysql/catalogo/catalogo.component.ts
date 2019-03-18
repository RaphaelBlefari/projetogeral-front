import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../service/catalogo.service';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
  providers: [CatalogoService]
})
export class CatalogoComponent implements OnInit {

  produtos: Produto[] = [];

  constructor(private catalogoService: CatalogoService) { }

  ngOnInit() {
    this.catalogoService.retornaProdutos('').subscribe(res => {
      this.produtos = res;
      console.log(this.produtos);
    });
  }
}
