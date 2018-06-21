import { AppService } from './../app/app.service';
import { NgModule,Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

@NgModule({
    imports:[],
    exports: []
    })
  
    export class calculateModule{
       constructor(public app:AppService){}

       calculateFoodAndBaggege(val:boolean,totalPrice:number){
        if(val == true){
            this.app.changeTotalPrice(totalPrice + 15);
          }else{
            this.app.changeTotalPrice(totalPrice - 15); 
          }
       }

       totalCalculate(persomNum:string,food:boolean,baggege:boolean){
        var cal = this.handler(food,baggege)
        this.app.changeTotalPrice(0);
        this.app.changeTotalPrice(cal + parseInt(persomNum) * 200);
       }

       handler(food:boolean,baggege:boolean){
        var a = 0;
        if(food == true){
          var a = a + 15;
        }
        if(baggege == true){
          var a = a + 15;
        }
        return a;
        }
  
    }