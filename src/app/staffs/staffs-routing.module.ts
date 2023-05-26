import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffsPage } from './staffs.page';

const routes: Routes = [
  {
    path: '',
    component: StaffsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffsPageRoutingModule {}
