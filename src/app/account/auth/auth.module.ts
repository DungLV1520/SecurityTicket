import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing';
import { IonicModule } from '@ionic/angular';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { VerifyComponent } from './verify/verify.component';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    ThankyouComponent,
    VerifyComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
    FormsModule,
    IonicModule,
  ],
})
export class AuthModule {}
