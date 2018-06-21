import { HttpService } from './../../services/http/http.service';
import { AppService } from './../../services/app/app.service';
import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { calculateModule } from './../../services/handler/calculate';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public searchOrder:boolean;
  public orderExcist:boolean;
  public allDestnations:any;
  public orderNumber:string;
  public orderDetails:string;
  public editOrderDetails:any;
  public bsRangeValue:Date;
  public totalPrice:number;
  public numOfPersonArray = ["1","2","3","4"];
  public datePickerConfig:Partial<BsDatepickerConfig>;
  constructor(public calHandler:calculateModule,public rout:Router,public http:HttpService,public appService:AppService) {
    this.datePickerConfig = Object.assign({},{
      containerClass:'theme-dark-blue',
      minDate: new Date,
      showWeekNumbers:false
    });
   }

  ngOnInit() {
    this.appService.allDestinations.subscribe(val => this.allDestnations = val);
    this.appService.totalPrice.subscribe(val => this.totalPrice = val);
    this.appService.searchOrder.subscribe(val => this.searchOrder = val);
    this.appService.orderecxist.subscribe(val => this.orderExcist = val);
    this.appService.costumerEditDateils.subscribe(val => this.editOrderDetails = val)
    this.appService.totalPrice.subscribe(val => this.totalPrice = val);
  }

  getUrl(){
    return this.appService.backGroundImg;
  }

  searchOrderFlight(){
    var obj = { num: this.orderNumber};
    this.http.checkOrderNumber(obj).subscribe((res) => {
      if(res.length > 0){
        this.orderDetails = JSON.stringify(res);
        this.editOrderDetails = res;
        this.totalPrice = this.editOrderDetails[0].price;
        this.appService.changeOrderEcxist(true);
        this.appService.changeSearchOrder(false);
        this.appService.changeCostumrDetails(res);
      }else{
     alert('order not excist');
      }
    })
  }

  deleteOrder(){
   var con = confirm("Are you sure you want to Delete this Order?");
   if(con){
    this.http.deleteOrder(JSON.parse(this.orderDetails)).subscribe((res) => {
     if(res.ok == 1){
       alert('order delete succsesfully');
       this.appService.changeOrderEcxist(false);
       this.appService.changeSearchOrder(true);
       this.rout.navigate(['home']);
     }
    })
   }
  }

  editOrder(){
  if(this.bsRangeValue != undefined){
    this.editOrderDetails[0].forthDate = this.bsRangeValue[0];
    this.editOrderDetails[0].backDate = this.bsRangeValue[1];
  }
  this.editOrderDetails[0].price = this.totalPrice;
  this.http.editOrder(this.editOrderDetails[0]).subscribe((res) => {
    if(res.ok == 1){
      alert('order update succsesfully');
      this.appService.changeOrderEcxist(false);
      this.appService.changeSearchOrder(true);
      this.rout.navigate(['home']);
    }
  })
  }

  changePersonNum(){
    this.calHandler.totalCalculate(this.editOrderDetails[0].numOfPersons,this.editOrderDetails[0].foodIncloud,this.editOrderDetails[0].baggageIncloud);
  }

  changeBaggege(event){
    this.appService.changeBaggeChecked(event.target.checked);
    this.calHandler.calculateFoodAndBaggege(event.target.checked,this.totalPrice);
  }

  changeFood(event){
    this.appService.changeFoodChecked(event.target.checked);
    this.calHandler.calculateFoodAndBaggege(event.target.checked,this.totalPrice);
  }
  
  }
