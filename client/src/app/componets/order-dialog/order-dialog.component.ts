import { AppService } from './../../services/app/app.service';
import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';

import jsPDF from 'jspdf';
require('jspdf-autotable');
@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {
 public orderNumber:String;
 public orderDetails:any;
 public name:String;
  constructor( 
    public router:Router,public appService:AppService,public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { dialogRef.disableClose = true; }
    
  ngOnInit() {
    this.appService.orderNumber.subscribe(val => this.orderNumber = val);
    this.appService.costumerOrderDateails.subscribe(val => this.orderDetails = val);
    this.appService.orderName.subscribe(val => this.name = val);
  }
  
  confirmOrder(){
    this.router.navigate(['home']);
    this.dialogRef.close();
  }

  downloadReciept(){
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; 
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var today = day + "/" + month + "/" + year;
     var doc = new jsPDF();
     doc.setFontSize(12);
     doc.setFont('courier')
     doc.setFontType('bolditalic')
     doc.text(today,10,10);
     doc.setFontSize(20);
     doc.text('hello ' + this.name,30,30); 
     doc.setFontSize(12);
     var columns = ["Name", "Amount", "Price", "Date", "Destantion"];
     var rows = [];
     for(var i = 0; i < this.orderDetails.length; i++){
         var insertToRows = [];
         insertToRows.push(this.name);
         insertToRows.push(this.orderDetails[i].numOfPersons);
         insertToRows.push(this.orderDetails[i].price);
         insertToRows.push(this.orderDetails[i].forthDate);
         insertToRows.push(this.orderDetails[i].destination);
         rows.push(insertToRows);
     } 
     doc.autoTable(columns, rows,{
         margin: {top: 45}
     }); 
     let finalY = doc.autoTable.previous.finalY; 
     doc.text(20, finalY + 5, "your Order Number: " + this.orderNumber);
     doc.setTextColor(255, 0, 0);
     doc.setFont('times');
     doc.setFontType('italic');
     doc.text(20,finalY + 10,'Enjoy At Your Vacation :)');
     doc.save('reciept.pdf');
  }

}


