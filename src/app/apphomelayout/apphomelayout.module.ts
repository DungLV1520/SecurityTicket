import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ApphomelayoutRoutingModule } from './apphome-routing.module';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { HeadermenuComponent } from './partials/headermenu/headermenu.component';
import { StaticfooterComponent } from './partials/staticfooter/staticfooter.component';
import { HomeComponent } from './home/home.component';
import { ApphomelayoutComponent } from './apphomelayout.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TicketBookedComponent } from './ticket-booked/ticket-booked.component';
import { ProfileComponent } from './profile/profile.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    HeadermenuComponent,
    StaticfooterComponent,
    ApphomelayoutComponent,
    TicketBookedComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ApphomelayoutRoutingModule,
    SwiperModule,
    NgCircleProgressModule.forRoot(),
    NgSelectModule,
    NgbDatepickerModule,
  ],
})
export class AppHomeLayoutModule {}
