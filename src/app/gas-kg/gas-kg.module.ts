import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GasKgPageRoutingModule } from './gas-kg-routing.module';

import { GasKgPage } from './gas-kg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GasKgPageRoutingModule
  ],
  declarations: [GasKgPage]
})
export class GasKgPageModule {}
