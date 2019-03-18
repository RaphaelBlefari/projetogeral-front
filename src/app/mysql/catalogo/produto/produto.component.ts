import { Component, OnInit, Input } from '@angular/core';
import { Produto } from '../../model/produto';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  constructor() { }

  @Input()
  produto: Produto;

  ngOnInit() {
  }
}
