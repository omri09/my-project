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
  productSubscription: Subscription = new Subscription;

  constructor (private HttpRequests: HttpRequestsService){
  }
  getProductList()
  {
    this.productSubscription= this.HttpRequests.getProductsList().subscribe(response=> {this.productList= this.filteredProductList=response;});

  }
 
  addProduct()
  {
    this.HttpRequests.addProduct().subscribe( ()=>{
      this.getProductList();
    });

  }

  filter(query: string)
  {
    this.filteredProductList= (query) ? 
    this.productList.filter((p: { productName: string; }) => p.productName.toLowerCase().includes(query.toLowerCase())):
    this.productList;

  }
  addToCart(item : any, quantity: any) {
  this.HttpRequests.addToCart(item, quantity);
  this.HttpRequests.refreshCart();
  }
  ngOnInit()
  {
    this.getProductList();
  }




   
  ngOnDestroy()
  {
    this.productSubscription.unsubscribe();

    console.log("unsubscribe");
  }
  title = 'project';
}