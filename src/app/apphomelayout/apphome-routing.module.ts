import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApphomelayoutComponent } from './apphomelayout.component';
import { TicketBookedComponent } from './ticket-booked/ticket-booked.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ApphomelayoutComponent,

    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'booked',
        component: TicketBookedComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApphomelayoutRoutingModule {}
