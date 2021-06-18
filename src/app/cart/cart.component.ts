import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from '../http-requests-service/http-requests.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent  {
  test: any =[];
  flagOrder :boolean = false;
  totalPrice : number = 0;
  totalQuantity : number = 0;
  ProductsDetails : any;
  constructor(private httpReq : HttpRequestsService) { 
   httpReq.getProductsList().subscribe(res=>  this.ProductsDetails= res, err=> console.log(err), ()=> this.gfg());
    
  }

  checkout(){

      this.httpReq.addOrder(this.test).subscribe(res=> this.flagOrder=true);
  
  }
  gfg(){
 this.test=[];
 let productPrice;
 for (var i = 0; i < localStorage.length; i++){

   let obj={"productName":this.ProductsDetails.find((element: { _id: string | null; }) => element._id == localStorage.key(i)).productName, 
   "qty": Number(localStorage.getItem(localStorage.key(i) || "null")), 
   "productPrice":this.ProductsDetails.find((element: { _id: string | null; }) => element._id == localStorage.key(i)).productPrice*Number(localStorage.getItem(localStorage.key(i) || "null"))};

   this.totalPrice += obj.productPrice * obj.qty;
   this.totalQuantity+= obj.qty;
   console.log("totalPrice "+this.totalPrice);
   this.test?.push(obj);
  }

}
}





