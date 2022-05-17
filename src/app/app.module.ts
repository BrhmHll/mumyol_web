import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { NaviComponent } from './components/navi/navi.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoryComponent } from './components/category/category.component';
import { CalculateDiscountPipe } from './pipes/calculate-discount.pipe';
import { SearchKeyPipe } from './pipes/search-key.pipe';

import { ToastrModule } from "ngx-toastr";
import { InsufficientStockSummaryComponent } from './components/insufficient-stock-summary/insufficient-stock-summary.component';
import { CutStringPipe } from './pipes/cut-string.pipe';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { OrderComponent } from './components/order/order.component';
import { UserComponent } from './components/user/user.component';
import { UserSearchPipe } from './pipes/user-search.pipe';
import { AdsComponent } from './components/ads/ads.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    NaviComponent,
    SidebarComponent,
    CategoryComponent,
    CalculateDiscountPipe,
    SearchKeyPipe,
    InsufficientStockSummaryComponent,
    CutStringPipe,
    ProductAddComponent,
    LoginComponent,
    ProductUpdateComponent,
    OrderComponent,
    UserComponent,
    UserSearchPipe,
    AdsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
