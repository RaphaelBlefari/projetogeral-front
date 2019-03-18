import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto';
import { CatalogoService } from '../service/catalogo.service';
import { NgForm, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  providers: [CatalogoService]
})
export class CrudComponent implements OnInit {

  produto: Produto = new Produto();
  produtos: Produto[];
  produtoForm: FormGroup;
  constructor(private catalogoService: CatalogoService) { }

  ngOnInit() {
    this.produtoForm = this.createFormGroup();
    this.retornaProdutos();
  }

  createFormGroup() {
    return new FormGroup({
      produtoData: new FormGroup({
        produtoId: new FormControl(),
        nome: new FormControl(),
        marca: new FormControl(),
        preco: new FormControl()
      }),
      requestType: new FormControl(),
      text: new FormControl()
    });
  }

  retornaProdutos() {
    this.catalogoService.retornaProdutos().subscribe(res => {
      this.produtos = res;
    });
  }

  inseriProduto(produto: Produto) {
    this.catalogoService.inseriProduto(produto).subscribe(res => {
      this.produto = res;
      this.produtoForm.controls['produtoData'].setValue(res);
      this.catalogoService.retornaProdutos("").subscribe(res => {
        this.produtos = res;
      });
    });
  }

  alteraProdutoForm(produto: Produto) {
    console.log(produto);
    this.produto = produto;
    this.produtoForm.controls['produtoData'].setValue(produto);
  }

  alteraProduto(produto: Produto) {
    this.catalogoService.alteraProduto(produto).subscribe(res => {
      this.produtos = [];
      this.retornaProdutos();
    });
  }

  deletaProduto(produto: Produto, index: number) {
    this.catalogoService.deletaProduto(produto).subscribe(res => {
      this.produtos = [];
      this.retornaProdutos();
    });
  }

  novoProdutoForm() {
    this.produto = new Produto();
    this.produtoForm = this.createFormGroup();
    console.log(this.produtoForm.controls['produtoData']);
  }

  onSubmit() {
    this.produto = this.produtoForm.controls['produtoData'].value;
    this.produto.produtoId ?
      this.alteraProduto(this.produto)
      : this.inseriProduto(this.produto);
  }
}
