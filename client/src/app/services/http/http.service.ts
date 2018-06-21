import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/observable/from';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
public url:string = 'http://localhost:4000/';
  constructor(public http:HttpClient) { }

  checkClientToServer():Observable<any>{
    return this.http.get(this.url + 'ticket/buy');
  }

  getDestanations():Observable<any>{
    return this.http.get(this.url + 'dest/getAll');
  }

  orderFlight(order):Observable<any>{
    return this.http.post(this.url + 'ticket/order',order);
  }

  checkOrderNumber(num):Observable<any>{
    return this.http.post(this.url + 'order/number',num);
  }

  deleteOrder(order):Observable<any>{
    return this.http.post(this.url + 'order/delete',order[0]);
  }

  editOrder(order):Observable<any>{
    return this.http.post(this.url + 'order/edit',order);
  }
}
