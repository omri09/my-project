import { Component, OnDestroy, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Subscription } from 'rxjs';
import { HttpRequestsService } from '../http-requests-service/http-requests.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit, OnDestroy {
  productList: any;
  filteredProductList: any;
  orders: any;
  test: any[] | undefined;
  productSubscription: Subscription ;
  orderSubscription: Subscription ;

  constructor (private HttpRequests: HttpRequestsService){
 
  this.productSubscription= HttpRequests.getProductsList().subscribe(response=> {this.productList= this.filteredProductList=response;});
  this.orderSubscription=HttpRequests.getOrdersList().subscribe(response=> {this.orders=response;});
  }

  filter(query: string)
  {
    this.filteredProductList= (query) ? 
    this.productList.filter((p: { productName: string; }) => p.productName.toLowerCase().includes(query.toLowerCase())):
    this.productList;

  }
  addToCart(item : any, quantity: any) {
    console.log(item);
    localStorage.setItem(item.productName, quantity);
    this.PrintLocal();

  }
  ngOnInit()
  {
    this.PrintLocal();
  }


   PrintLocal()
   {
    this.test=[];
    for (var i = 0; i < localStorage.length; i++){
      let obj={"name": localStorage.key(i), "qty": localStorage.getItem(localStorage.key(i) || "null")};
      this.test?.push(obj);
   } 
   }

   
  ngOnDestroy()
  {
    this.productSubscription.unsubscribe();
    this.orderSubscription.unsubscribe();

    console.log("unsubscribe");
  }
  title = 'project';
}