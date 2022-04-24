import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { ProductComponent } from './components/product/product.component';
import { UserComponent } from './components/user/user.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', component: ProductComponent , canActivate:[LoginGuard] },
  { path: 'products', component: ProductComponent , canActivate:[LoginGuard] },
  { path: 'products/category/:categoryId', component: ProductComponent , canActivate:[LoginGuard] },
  { path: 'products/add', component: ProductAddComponent , canActivate:[LoginGuard]},
  { path: 'products/update/:productId', component: ProductUpdateComponent , canActivate:[LoginGuard]},
  { path: 'orders/:statusId', component: OrderComponent , canActivate:[LoginGuard]},
  { path: 'orders', component: OrderComponent , canActivate:[LoginGuard]},
  { path: 'users', component: UserComponent , canActivate:[LoginGuard]},
  // { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
