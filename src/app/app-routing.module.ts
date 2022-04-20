import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductComponent } from './components/product/product.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', component: ProductComponent, pathMatch: 'full' , canActivate:[LoginGuard] },
  { path: 'products', component: ProductComponent , canActivate:[LoginGuard] },
  { path: 'products/category/:categoryId', component: ProductComponent , canActivate:[LoginGuard] },
  { path: 'products/add', component: ProductAddComponent , canActivate:[LoginGuard]},
  // { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
