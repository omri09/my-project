import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  test: any[] | undefined;

  constructor() { 
    
  }

  ngOnInit(): void {
     //let count :Number=0;
 this.test=[];
 for (var i = 0; i < localStorage.length; i++){
   let obj={"name": localStorage.key(i), "qty": localStorage.getItem(localStorage.key(i) || "null")};
   //count =+ Number(obj.qty);
   this.test?.push(obj);
  }

}
}





