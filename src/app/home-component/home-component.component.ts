import { Component, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpRequestsService } from '../service/http-requests.service';
import { ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnDestroy {
  productList: any;
  filteredProductList: any;
  productSubscription: Subscription = new Subscription;
  categoryList = ["vegetables", "fruits"];
  //flag = false;
  //flag2 = (this.flag) ? 3 : 1;

  constructor( private HttpRequests: HttpRequestsService, private route: ActivatedRoute) {
    this.getProductList();

  }

  filterByCategory() {
    this.route.queryParams.subscribe(params => {
      const currentCategory: string = params['category'];
      this.filteredProductList = (currentCategory) ?
        this.productList.filter((p: { categoryName: string; }) => p.categoryName === currentCategory) :
        this.productList;
    });
  }
  searchProduct(query: string) {
    this.filteredProductList = (query) ?
      this.productList.filter((p: { productName: string; }) => p.productName.toLowerCase().includes(query.toLowerCase())) :
      this.productList;

  }

  getProductList() {
    this.productSubscription = this.HttpRequests.getProductsList().subscribe(response => {
      this.productList = this.filteredProductList = response;
      this.filterByCategory();
    });

  }


  ngOnDestroy() {
    this.productSubscription.unsubscribe();

    console.log("unsubscribe");
  }
}