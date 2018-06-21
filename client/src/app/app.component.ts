import { AppService } from './services/app/app.service';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(public router:Router,public app:AppService){}

  ngOnInit(){
    this.router.navigate(['home']);
   /* this.app.changeFoodChecked(false);
    this.app.changeFoodChecked(false);
    this.app.changeDest('');
    this.app.changePersonNum('');*/
  }
}
