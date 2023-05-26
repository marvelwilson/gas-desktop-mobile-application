import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditInventoryPage } from './edit-inventory.page';

const routes: Routes = [
  {
    path: '',
    component: EditInventoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditInventoryPageRoutingModule {}
