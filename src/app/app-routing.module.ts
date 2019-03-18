import { CrudComponent } from './mysql/crud/crud.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogoComponent } from './mysql/catalogo/catalogo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mysql/catalogo', component: CatalogoComponent },
  { path: 'mysql/crud', component: CrudComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
