import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffLoginPage } from './staff-login.page';

const routes: Routes = [
  {
    path: '',
    component: StaffLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffLoginPageRoutingModule {}
