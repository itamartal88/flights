import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AppService {
  public orderNumber = new BehaviorSubject<String>('');
  public orderName = new BehaviorSubject<String>('');
  public costumerOrderDateails = new BehaviorSubject<any>([]);
  public costumerEditDateils = new BehaviorSubject<any>([]);
  public allDestinations = new BehaviorSubject<any>([]);
  public checkFood = new BehaviorSubject<boolean>(false);
  public checkBaggege = new BehaviorSubject<boolean>(false);
  public currentDest = new BehaviorSubject<string>('');
  public currentPersonNum = new BehaviorSubject<string>('');
  public currentName = new BehaviorSubject<string>('');
  public currentMail = new BehaviorSubject<string>('');
  public totalPrice = new BehaviorSubject<number>(0);
  public searchOrder = new BehaviorSubject<boolean>(true);
  public orderecxist = new BehaviorSubject<boolean>(false);
  public backGroundImg:string = "url('./../../../assets/images/sky1.png')";
  constructor() { }

 changeCostumrDetails(val){
   this.costumerEditDateils.next(val);
 }

  changeSearchOrder(val:boolean){
    this.searchOrder.next(val);
  }

  changeOrderEcxist(val:boolean){
    this.orderecxist.next(val);
  }

  changeDest(val:string){
    this.currentDest.next(val);
  }

  changeTotalPrice(val:number){
    this.totalPrice.next(val);
  }

  changeName(val:string){
    this.currentName.next(val);
  }

  changeMail(val:string){
    this.currentMail.next(val);
  }

  changePersonNum(val:string){
    this.currentPersonNum.next(val);
  }

  getOrderNumber(val:string){
    this.orderNumber.next(val);
  }

  getOrderDetails(val){
  this.costumerOrderDateails.next(val);
  }

  getCostumerName(val:string){
    this.orderName.next(val);
  }

  getAllDestinations(val){
    this.allDestinations.next(val);
  }

  changeFoodChecked(val:boolean){
    this.checkFood.next(val);
  }

  changeBaggeChecked(val:boolean){
    this.checkBaggege.next(val);
  }
}

