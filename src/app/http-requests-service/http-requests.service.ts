import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {
  //path: String;
  private refresh_Cart: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor (private http: HttpClient){ 
    console.log("Port " + window.location.port);
    //if(window.location.port=='4200') this.path= 'http://localhost:3000';
    //else this.path= '';
   
  }


  addToCart(item : any, quantity: any) {
    let sumOfItem :number = Number(localStorage.getItem(item.productName)) +Number(quantity);
    let result= sumOfItem.toString();
    console.log("result"+result);
    localStorage.setItem(item.productName, result);
    return sumOfItem;
    
  }


  refreshCart()
  {
    let count= 0;
    for (var i = 0; i < localStorage.length; i++){
      let obj=localStorage.getItem(localStorage.key(i) || "null") ;
      console.log("rr "+obj);
      count+=Number(obj);
      console.log("count "+count);
  }
  this.refresh_Cart.next(count);
  return this.refresh_Cart;
  }

  addProduct(){
    console.log("service works");
    const myNewStudentObj = { 
    productName: 'Tomatoes', 
    productPrice:'10', 
    productImage: 'https://images.pexels.com/photos/1367243/pexels-photo-1367243.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' };  
    return this.http.post("/add", myNewStudentObj);

  }

addOrder(obj :any)
{
  console.log("enter service");
  return this.http.post("/add-order", obj);

}

  getProductsList()
  {
    return this.http.get("/list" );
  }
  getOrdersList()
{
  return this.http.get("/my-orders");

}
}
