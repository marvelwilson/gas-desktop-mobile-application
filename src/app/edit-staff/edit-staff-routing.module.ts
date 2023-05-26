import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditStaffPage } from './edit-staff.page';

const routes: Routes = [
  {
    path: '',
    component: EditStaffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditStaffPageRoutingModule {}
