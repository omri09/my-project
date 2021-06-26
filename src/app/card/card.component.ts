import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpRequestsService } from '../service/http-requests.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() item: any; 
  


  constructor(private HttpRequests: HttpRequestsService, private _snackBar: MatSnackBar, private router: Router) {
   }
   openSnackBar() {
    this._snackBar.open('Product Added Successfully', 'Go to Cart', {
      duration: 3000
    }).onAction().subscribe(()=> this.router.navigateByUrl('cart'));
  }

   addToCart() {
    this.HttpRequests.addToCart(this.item, 1);
    this.HttpRequests.refreshCart();
  }
  
  ngOnInit(): void {
  }

}