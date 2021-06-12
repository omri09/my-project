import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponentComponent,
    OrdersComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponentComponent},
      {path: 'cart', component: CartComponent},
     {path: 'orders', component: OrdersComponent}

    ]

    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 


}
