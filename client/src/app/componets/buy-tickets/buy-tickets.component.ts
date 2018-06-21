import { HttpService } from './../../services/http/http.service';
import { Component, OnInit,HostListener } from '@angular/core';
import { AppService } from './../../services/app/app.service';
import { OrderDialogComponent } from './../order-dialog/order-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { calculateModule } from './../../services/handler/calculate';

@Component({
  selector: 'app-buy-tickets',
  templateUrl: './buy-tickets.component.html',
  styleUrls: ['./buy-tickets.component.css']
})
export class BuyTicketsComponent implements OnInit {
  public numOfPersonArray = ["1","2","3","4"];
  public stepOne:boolean = true;
  public stepTwo:boolean = false;
  public dateRange:Date;
  public costumerName:string;
  public costumerEmail:string;
  public foodChecked:boolean = false;
  public baggegeCheck:boolean = false;
  public numOfPersonChosen:string;
  public chosenDestination:string;
  public totalPrice:number;
  public totalChecked:number = 0;
  public destanations = [];
  public datePickerConfig:Partial<BsDatepickerConfig>;
  constructor(public calHandler:calculateModule,public http:HttpService,public appService:AppService,public dialog:MatDialog) {
    this.datePickerConfig = Object.assign({},{
      containerClass:'theme-dark-blue',
      minDate: new Date,
      showWeekNumbers:false
    });
   }

  
  ngOnInit() {
    this.http.getDestanations().subscribe((res) => {
      this.destanations = res;
    });
   this.appService.totalPrice.subscribe(val => this.totalPrice = val); 
   this.appService.checkFood.subscribe(val => this.foodChecked = val);
   this.appService.currentName.subscribe(val => this.costumerName = val);
   this.appService.currentMail.subscribe(val => this.costumerEmail = val);
   this.appService.checkBaggege.subscribe(val => this.baggegeCheck = val);
   this.appService.currentDest.subscribe(val => this.chosenDestination = val);
   this.appService.currentPersonNum.subscribe(val => this.numOfPersonChosen = val);
  }

  getUrl(){
    return this.appService.backGroundImg;
  }

  orderFligt(){
    if(this.costumerName != '' && this.costumerEmail != ''){
    var obj = {
      dates:this.dateRange,
      name:this.costumerName,
      mail:this.costumerEmail,
      price:this.totalPrice,
      food:this.foodChecked,
      baggege:this.baggegeCheck,
      dest:[this.chosenDestination,'Tel aviv'],
      numberOfPersons:this.numOfPersonChosen
    }
    this.http.orderFlight(obj).subscribe((res) => {
     this.appService.getOrderNumber(res[0]._id);
     this.appService.getOrderDetails(res);
     this.appService.getCostumerName(this.costumerName);
    });
    let dialogRef = this.dialog.open(OrderDialogComponent, {
      height: '300px',
      width: '500px'
    });
  }else{
    alert('please fill all inputs');
  }
  }

  backToStepOne(){
  this.stepTwo = false;
  this.stepOne = true;
  }

  goToStepTwo(){
    if(this.dateRange != undefined && this.chosenDestination != '' && this.numOfPersonChosen != ''){
      this.stepOne = false;
      this.stepTwo = true;
      console.log(this.dateRange,this.numOfPersonChosen,this.chosenDestination,this.foodChecked)
    }else{
   alert('please fill all inputs');
    }
  }

  changDest(){
   this.appService.changeDest(this.chosenDestination); 
   if(this.numOfPersonChosen != ''){
    this.calHandler.totalCalculate(this.numOfPersonChosen,this.foodChecked,this.baggegeCheck); 
   }
  }

  changePersonNum(){
    this.appService.changePersonNum(this.numOfPersonChosen);
    if(this.chosenDestination != ''){
      this.calHandler.totalCalculate(this.numOfPersonChosen,this.foodChecked,this.baggegeCheck);
    }
  }

  changeFood(event){ 
   this.appService.changeFoodChecked(event.target.checked);
   this.calHandler.calculateFoodAndBaggege(event.target.checked,this.totalPrice);
  }

  changeBaggege(event){
    this.appService.changeBaggeChecked(event.target.checked);
    this.calHandler.calculateFoodAndBaggege(event.target.checked,this.totalPrice);
  }

  changeName(){
    this.appService.changeName(this.costumerName)
  }

  changeMail(){
    this.appService.changeMail(this.costumerEmail)
  }

}
