import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {
  path: String;
  private refresh_Cart: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor (private http: HttpClient){ 
    console.log("Port " + window.location.port);
    if(window.location.port=='4200') this.path= 'http://localhost:3000';
    else this.path= '';
   
  }


  getProductsList()
  {
    return this.http.get(this.path+"/list" );
  }
  getOrdersList()
{
  return this.http.get(this.path+"/my-orders");

}
findOrderByID(ID :string){
  console.log(this.path+"/find-order/"+ID);
  return this.http.get(this.path+"/find-order/"+ID);

}

findProductByID(ID : any){
  return this.http.get(this.path+"/find-product/"+ID);

}

  addToCart(item : any, quantity: any) {
    let sumOfItem :number = Number(localStorage.getItem(item._id)) +Number(quantity);
    let result= sumOfItem.toString();
    console.log("result"+result);
    localStorage.setItem(item._id, result);
    return sumOfItem;
    
  }


  refreshCart()
  {
    let count= 0;
    for (var i = 0; i < localStorage.length; i++){
      let obj=localStorage.getItem(localStorage.key(i) || "null") ;
      count+=Number(obj);
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
    return this.http.post(this.path+"/add", myNewStudentObj);

  }

addOrder(items :any, totalOrderPrice : any)
{
  console.log("enter service");
  console.log(items);
  console.log(totalOrderPrice);
  const order= {items, totalOrderPrice}
  console.log(order);

  return this.http.post(this.path+"/add-order", order);

}


}
