import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { NaviComponent } from './components/navi/navi.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './components/category/category.component';
import { CalculateDiscountPipe } from './pipes/calculate-discount.pipe';
import { SearchKeyPipe } from './pipes/search-key.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    NaviComponent,
    SidebarComponent,
    CategoryComponent,
    CalculateDiscountPipe,
    SearchKeyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
