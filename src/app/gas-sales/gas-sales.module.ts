import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GasSalesPageRoutingModule } from './gas-sales-routing.module';

import { GasSalesPage } from './gas-sales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GasSalesPageRoutingModule
  ],
  declarations: [GasSalesPage]
})
export class GasSalesPageModule {}
