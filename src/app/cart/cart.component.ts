import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from '../http-requests-service/http-requests.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  test: any =[];

  constructor(private httpReq : HttpRequestsService) { 
    
  }

  checkout(){
    //for(let i= 0; i < this.test.length; i++)
    //{
     // console.log(this.test[i]);
      //this.httpReq.addOrder(this.test[i]);
      this.httpReq.addOrder(this.test).subscribe(res=> console.log(res));
    //}
  }
  ngOnInit(): void {
 this.test=[];
 for (var i = 0; i < localStorage.length; i++){
   let obj={"productName": localStorage.key(i), "qty": localStorage.getItem(localStorage.key(i) || "null")};
   //count =+ Number(obj.qty);
   this.test?.push(obj);
  }

}
}





