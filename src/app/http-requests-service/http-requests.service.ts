import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {
  //productSubscription: Subscription | undefined ;
  //orderSubscription: Subscription | undefined ;
  path: String;

  constructor (private http: HttpClient){ 
    console.log("Port " + window.location.port);
    if(window.location.port=='4200') this.path= 'http://localhost:3000';
    else this.path= '';
   
  }
  addProduct(){
    console.log("service works");
    const myNewStudentObj = { 
    productName: 'Tomatoes', 
    productPrice:'10', 
    productImage: 'https://images.pexels.com/photos/1367243/pexels-photo-1367243.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' };  
    return this.http.post(this.path+"/add", myNewStudentObj);

  }

  getProductsList()
  {
    return this.http.get(this.path+"/list" );
  }
  getOrdersList()
{
  return this.http.get(this.path+"/my-orders");

}
}
