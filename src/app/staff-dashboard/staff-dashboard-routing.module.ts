import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffDashboardPage } from './staff-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: StaffDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffDashboardPageRoutingModule {}
