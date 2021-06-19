import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from '../http-requests-service/http-requests.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent  {
  cart: any =[];
  flagOrder :boolean = false;
  totalOrderPrice : number = 0;
  totalQuantity : number = 0;
  ProductsDetails : any;
  cartIDs: any =[];
  constructor(private httpReq : HttpRequestsService) { 
    this.searchCart();
    this.loadCartDetails();
  }

   searchCart()
  {  
    for (var i = 0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    let qty =localStorage.getItem(key || "null");
     this.httpReq.findProductByID(key).subscribe(res =>  {this.cart.push({res, qty});
     let calc :any= res;
     this.totalOrderPrice+= Number(calc.productPrice) * Number(qty);
     this.totalQuantity+=  Number(qty);
     this.cartIDs.push(calc._id, Number(qty));

    })
    
    }

  }
  loadCartDetails(){
    console.log(this.cart)
    //console.log(this.ProductsDetails);
 //this.cart=[];
 //for (var i = 0; i < localStorage.length; i++){

   //let obj={"productName":this.ProductsDetails.find((element: { _id: string | null; }) => element._id == localStorage.key(i)).productName, 
   //"qty": Number(localStorage.getItem(localStorage.key(i) || "null")),
   //"productPrice": this.ProductsDetails.find((element: { _id: string | null; }) => element._id == localStorage.key(i)).productPrice,
   //"totalPrice":this.ProductsDetails.find((element: { _id: string | null; }) => element._id == localStorage.key(i)).productPrice*Number(localStorage.getItem(localStorage.key(i) || "null"))};
 
  // this.totalOrderPrice += obj.totalPrice;
   //this.totalQuantity+= obj.qty;
  // console.log("totalOrderPrice "+this.totalOrderPrice);
  // this.cart?.push(obj);
 // }

}

checkout(){

  this.httpReq.addOrder(this.cart, this.totalOrderPrice).subscribe(res=> this.flagOrder=true);

}
}





