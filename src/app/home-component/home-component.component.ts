import { Component, OnDestroy, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {
  productList: any | undefined;
  filteredProductList: any | undefined;
  hello: string | undefined;
  orders: any | undefined;
  test: any[] | undefined;
  productSubscription: Subscription ;
  orderSubscription: Subscription ;

  private currentPort = window.location.port;
  private path;

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


  constructor (private http: HttpClient){
    if(this.currentPort=='4200') this.path= 'http://localhost:3000';
    else this.path= '';

  this.productSubscription= http.get(this.path+"/list" ).subscribe(response=> {this.productList= this.filteredProductList=response;});
  this.orderSubscription=http.get(this.path+"/my-orders").subscribe(response=> {this.orders=response;});
  };
   
  ngOnDestroy()
  {
    this.productSubscription.unsubscribe();
    this.orderSubscription.unsubscribe();

    console.log("unsubscribe");
  }
  title = 'project';
}