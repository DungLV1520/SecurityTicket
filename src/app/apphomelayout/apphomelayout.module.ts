import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ApphomelayoutRoutingModule } from './apphome-routing.module';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { HeadermenuComponent } from './partials/headermenu/headermenu.component';
import { StaticfooterComponent } from './partials/staticfooter/staticfooter.component';
import { HomeComponent } from './home/home.component';
import { ApphomelayoutComponent } from './apphomelayout.component';

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    HeadermenuComponent,
    StaticfooterComponent,
    ApphomelayoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApphomelayoutRoutingModule,
    SwiperModule,
    NgCircleProgressModule.forRoot(),
  ],
})
export class AppHomeLayoutModule {}
