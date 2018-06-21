

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MetirialModule } from './services/material/material';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

//components
import { AppComponent } from './app.component';
import { BuyTicketsComponent } from './componets/buy-tickets/buy-tickets.component';
import { TopBarComponent } from './componets/top-bar/top-bar.component';
import { OrdersComponent } from './componets/orders/orders.component';
import { OrderDialogComponent } from './componets/order-dialog/order-dialog.component';
import { HomeComponent } from './componets/home/home.component';

//services
import { AppService } from './services/app/app.service';
import { HttpService } from './services/http/http.service';
import { AppPipe } from './services/pipe/app.pipe';


@NgModule({
  declarations: [
    AppComponent,
    BuyTicketsComponent,
    TopBarComponent,
    OrdersComponent,
    OrderDialogComponent,
    HomeComponent,
    AppPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MetirialModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'orders', component: OrdersComponent },
      {path: 'buy', component: BuyTicketsComponent },
      {path: 'home', component: HomeComponent },
    ]),
    BsDatepickerModule.forRoot()
  ],
  entryComponents: [OrderDialogComponent/*DialogOrderComponent*/],
  exports:[],
  providers: [AppService,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
