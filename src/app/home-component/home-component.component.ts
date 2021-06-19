import { Component, OnDestroy, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Subscription } from 'rxjs';
import { HttpRequestsService } from '../http-requests-service/http-requests.service';
import { ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit, OnDestroy {
  productList: any;
  filteredProductList: any;
  orders: any;
  productSubscription: Subscription = new Subscription;
  categoryList= ["vegetables", "fruits"];
  flag=false;
  flag2= (this.flag) ? 3 : 1;
  

  constructor (private HttpRequests: HttpRequestsService, private route: ActivatedRoute){

  }
  filterCat(){
    this.route.queryParams.subscribe(params => {
      const currentCategory :string= params['category'];
      this.filteredProductList=(currentCategory)?
      this.productList.filter((p: { categoryName: string; })=>p.categoryName === currentCategory):
      this.productList;
    });
  }
  filter(query: string)
  {
    this.filteredProductList= (query) ? 
    this.productList.filter((p: { productName: string; }) => p.productName.toLowerCase().includes(query.toLowerCase())):
    this.productList;

  }

  getProductList()
  {
    this.productSubscription= this.HttpRequests.getProductsList().subscribe(response=> {
      this.productList= this.filteredProductList=response;
      this.filterCat();
      

    });

  }
 
  addProduct()
  {
    this.HttpRequests.addProduct().subscribe( ()=>{
      this.getProductList();
    });

  }


  addToCart(item : any, quantity: any) {
  this.HttpRequests.addToCart(item, quantity);
  this.HttpRequests.refreshCart();
  }
  ngOnInit()
  {
    this.getProductList();
  }




   
  ngOnDestroy()
  {
    this.productSubscription.unsubscribe();

    console.log("unsubscribe");
  }
  title = 'project';
}