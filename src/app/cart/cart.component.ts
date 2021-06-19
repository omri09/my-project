import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from '../http-requests-service/http-requests.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent  {
  cart: any;
  flagOrder :boolean = false;
  flagPush :boolean = true;
  totalOrderPrice : number = 0;
  totalQuantity : number = 0;

  constructor(private httpReq : HttpRequestsService) { 
    this.searchCart();
    this.updateItems();
  }
 updateItems()
 {
  this.httpReq.refreshCart().subscribe(res => {
    this.totalQuantity=res;
    
  });
 }
   async searchCart()
  { 
  
    this.cart=[];
    this.totalOrderPrice =0;
    this.totalQuantity=0
    const sortedKeys = Object.keys(localStorage).sort();
     for (var i = 0; i < sortedKeys.length; i++){
    let key = sortedKeys[i];
    let qty =localStorage.getItem(key || "null");

   await this.httpReq.findProductByID(key).toPromise().then(res =>  {
     this.cart.push({res, qty});
      let calc :any= res;
      this.totalOrderPrice+= Number(calc.productPrice) * Number(qty);
 
     })
    }
  }
  

  updateQuantity(id : any ,qty : any)
  {
    localStorage.setItem(id, qty);
    this.searchCart();
    this.updateItems();

  }

checkout(){
  this.httpReq.addOrder(this.cart, this.totalOrderPrice).subscribe(res=> this.flagOrder=true);

}
}





