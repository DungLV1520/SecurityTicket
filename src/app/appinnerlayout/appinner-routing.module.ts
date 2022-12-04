import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppinnerlayoutComponent } from './appinnerlayout.component';
import { TicketBookedComponent } from '../apphomelayout/ticket-booked/ticket-booked.component';
import { TicketBookingComponent } from './ticket-booking/ticket-booking.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AppinnerlayoutComponent,
    children: [
      {
        path: 'detail/:id',
        component: TicketDetailComponent,
      },
      {
        path: 'booking/:id',
        component: TicketBookingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppinnerlayoutRoutingModule {}
