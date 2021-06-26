import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from '../service/http-requests.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: any = [];
  createOrder: boolean = true;
  totalOrderPrice: number = 0;
  totalQuantity: number = 0;
  amount = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  constructor(private httpReq: HttpRequestsService, private router: Router, private _snackBar: MatSnackBar) {
    this.getCart();
    
  }

  async getCart() {
    this.httpReq.refreshCart().subscribe(res => { this.totalQuantity = res; });
    this.cart = [];
    this.totalOrderPrice = 0;
    const sortedKeys = Object.keys(localStorage).sort();
    for (var i = 0; i < sortedKeys.length; i++) {
      let key = sortedKeys[i];
      let qty = localStorage.getItem(key || "null");
      await this.httpReq.findProductByID(key).toPromise().then(res => {
        this.cart.push({ res, qty });
        let calc: any = res;
        this.totalOrderPrice += Number(calc.productPrice) * Number(qty);

      })
    }
    if (this.totalQuantity == 0)
      this.createOrder = false;
  }

  openSnackBar() {
    this._snackBar.open('Order Added Successfully', 'Go to My Orders')
      .onAction().subscribe(() => this.router.navigateByUrl('orders'));
  }

  updateQuantity(id: any, qty: any) {
    localStorage.setItem(id, qty);
    this.getCart();
  }

  removeItem(id: string) {
    localStorage.removeItem(id);
    this.getCart();
  }

  checkout() {
    this.httpReq.addOrder(this.cart, this.totalOrderPrice).subscribe(() => this.openSnackBar());
    localStorage.clear();
    this.getCart();
  }
}


