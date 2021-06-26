import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpRequestsService } from '../service/http-requests.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnDestroy {
  orders: any;
  orderSubscription: Subscription = new Subscription;
  orderPrice : any;

  constructor(private HttpRequests: HttpRequestsService) {
   
      this.orderSubscription=this.HttpRequests.getOrdersList().subscribe(response=> this.orders=response, ()=>"", ()=>console.log(this.orders));
    
    
   }

 ngOnDestroy(){
  this.orderSubscription.unsubscribe();

 }

}
