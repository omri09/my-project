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
  productSubscription: Subscription = new Subscription;
  orderSubscription: Subscription = new Subscription;

  constructor (private HttpRequests: HttpRequestsService){
  }
  getProductList()
  {
    this.productSubscription= this.HttpRequests.getProductsList().subscribe(response=> {this.productList= this.filteredProductList=response;});

  }
  getOrderList()
  {
    this.orderSubscription=this.HttpRequests.getOrdersList().subscribe(response=> {this.orders=response;});

  }
  addProduct()
  {
    this.HttpRequests.addProduct().subscribe( ()=>{
      this.getProductList();
      this.getOrderList();
    });

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
    this.getProductList();
    this.getOrderList();
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