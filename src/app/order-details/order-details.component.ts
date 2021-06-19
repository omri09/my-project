import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpRequestsService } from '../http-requests-service/http-requests.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order :any;
  
  constructor(  private route: ActivatedRoute, private httpreq: HttpRequestsService) {
    
   }

  ngOnInit(): void {
    let orderID= this.route.snapshot.url[1].path; 
    this.getOrderDetails(orderID);
  }
   getOrderDetails(orderID: string)
  {
    this.order=  this.httpreq.findOrderByID(orderID).subscribe(res=> {this.order= res;
      console.log(this.order);
      console.log("assa");
    });

  }

}
