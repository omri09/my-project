import { Component, OnDestroy, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  productList: any | undefined;
  hello: string | undefined;
  orders: any | undefined;
  test: any[] | undefined;
  productSubscription: Subscription ;
  orderSubscription: Subscription ;

  private current_port = window.location.port;
  private mongo_url;

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
      console.log(localStorage.key(i));
   } 
   console.log(this.test);
   }


  constructor (private http: HttpClient){
    if(this.current_port=='4200') this.mongo_url= 'http://localhost:3000';
    else this.mongo_url= '';

  this.productSubscription= http.get(this.mongo_url+"/list" ).subscribe(response=> {this.productList=response;});
  this.orderSubscription=http.get(this.mongo_url+"/my-orders").subscribe(response=> {this.orders=response;});
  };
   
  ngOnDestroy()
  {
    this.productSubscription.unsubscribe();
    this.orderSubscription.unsubscribe();

    console.log("unsubscribe");
  }
  title = 'project';
}