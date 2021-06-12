import { Component, Input, OnInit } from '@angular/core';
import { HttpRequestsService } from '../http-requests-service/http-requests.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  count :number = 0;

  constructor(private httpRequests: HttpRequestsService){

    httpRequests.refreshCart().subscribe(res => this.count = res);

  }



}


