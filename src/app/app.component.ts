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
  subscription: Subscription ;

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
    this.subscription= http.get("http://localhost:3000/" || "/" ).subscribe(response=> {
    this.productList=response;
    console.log(response);
  });
  http.get("http://localhost:3000/my-orders" || "/my-orders").subscribe(response=> {
    this.orders=response;
    console.log(response);
  });
   
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
    console.log("unsub");
  }
  title = 'project';
}
