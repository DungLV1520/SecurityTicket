import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AppinnerlayoutComponent } from './appinnerlayout.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { FooterinfoComponent } from './partials/footerinfo/footerinfo.component';
import { HeaderbackComponent } from './partials/headerback/headerback.component';
import { AppinnerlayoutRoutingModule } from './appinner-routing.module';
import { TicketBookingComponent } from './ticket-booking/ticket-booking.component';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [
    AppinnerlayoutComponent,
    TicketDetailComponent,
    FooterinfoComponent,
    HeaderbackComponent,
    TicketBookingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppinnerlayoutRoutingModule,
    SwiperModule,
    NgCircleProgressModule.forRoot(),
    NgxPayPalModule,
  ],
})
export class AppInnerLayoutModule {}
