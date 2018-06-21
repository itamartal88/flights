import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  goToOrdersPage(){
    this.router.navigate(['orders'])
  }

  goToBuyPage(){
    this.router.navigate(['buy'])
  }

  goToHomePage(){
    this.router.navigate(['home']) 
  }
}
