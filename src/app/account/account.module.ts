import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AuthModule } from './auth/auth.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../shared/service/storage.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AuthModule,
    IonicModule,
    FormsModule,
  ],
})
export class AccountModule {}
