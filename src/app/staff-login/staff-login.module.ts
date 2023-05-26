import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffLoginPageRoutingModule } from './staff-login-routing.module';

import { StaffLoginPage } from './staff-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffLoginPageRoutingModule
  ],
  declarations: [StaffLoginPage]
})
export class StaffLoginPageModule {}
