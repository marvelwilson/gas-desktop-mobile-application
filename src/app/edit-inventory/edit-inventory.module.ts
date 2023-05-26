import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditInventoryPageRoutingModule } from './edit-inventory-routing.module';

import { EditInventoryPage } from './edit-inventory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditInventoryPageRoutingModule
  ],
  declarations: [EditInventoryPage]
})
export class EditInventoryPageModule {}
