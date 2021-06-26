import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path: '', component: HomeComponentComponent},
  {path: 'cart', component: CartComponent},
 {path: 'orders', component: OrdersComponent},
 {path: 'order-details/:id', component: OrderDetailsComponent},
 {path: 'card', component: CardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
