import { HttpService } from './../../services/http/http.service';
import { AppService } from './../../services/app/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public Destinations = []
  constructor(public app:AppService,public http:HttpService) { }

  ngOnInit() {
    this.http.getDestanations().subscribe((res) =>{
      this.Destinations = res;
      this.app.getAllDestinations(this.Destinations);
    })
  }

  getUrl(){
    return this.app.backGroundImg;
  }

}
